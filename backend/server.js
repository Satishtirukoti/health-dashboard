// backend/server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock fallback data
const mockData = {
  who: {
    Indicator: "Life expectancy at birth (years)",
    Country: "Global",
    Year: 2022,
    Value: 71.8,
  },
  healthdata: [
    { state: "CA", date: "2024-01-15", total_patients: 1200 },
    { state: "TX", date: "2024-01-15", total_patients: 900 },
    { state: "NY", date: "2024-01-15", total_patients: 700 },
    { state: "FL", date: "2024-01-15", total_patients: 650 },
    { state: "IL", date: "2024-01-15", total_patients: 540 },
  ],
  openfda: {
    count: 4,
    results: [
      { drug: "aspirin", adverse_events: 12 },
      { drug: "ibuprofen", adverse_events: 8 },
      { drug: "amoxicillin", adverse_events: 5 },
      { drug: "atorvastatin", adverse_events: 3 },
    ],
  },
};

// Safe fetch with timeout
const safeFetch = (url, opts = {}, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timeout")),
      timeout
    );
    fetch(url, opts)
      .then((res) => {
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => resolve(json))
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

/**
 * WHO GHO Indicator endpoint
 * GET /api/who/indicator/:code
 */
app.get("/api/who/indicator/:code", async (req, res) => {
  const { code } = req.params;
  const url = `https://ghoapi.azureedge.net/api/${encodeURIComponent(code)}`;

  try {
    const data = await safeFetch(url, {}, 12000);
    const items = data.value ? data.value : [data];
    const filtered = Array.isArray(items) ? items.slice(-10) : [items];
    res.json({ ok: true, source: "who", code, items: filtered });
  } catch (err) {
    console.error("WHO fetch error:", err.message);
    res.json({
      ok: false,
      source: "who",
      code,
      fallback: mockData.who,
      items: [],
    });
  }
});

/**
 * HealthData.gov query endpoint
 * GET /api/healthdata/query?dataset=g62h-syeh&limit=50
 */
app.get("/api/healthdata/query", async (req, res) => {
  const { dataset = "g62h-syeh", limit = 50 } = req.query;
  const resourceUrl = `https://healthdata.gov/resource/${dataset}.json?$limit=${limit}`;

  try {
    const data = await safeFetch(resourceUrl, {}, 12000);
    res.json({
      ok: true,
      source: "healthdata",
      dataset,
      data: Array.isArray(data) ? data : [data],
    });
  } catch (err) {
    console.error("HealthData.gov fetch error:", err.message);
    res.json({
      ok: false,
      source: "healthdata",
      dataset,
      fallback: mockData.healthdata,
      data: mockData.healthdata,
    });
  }
});

/**
 * openFDA drug events endpoint
 * GET /api/openfda/drug/events?search=&limit=10
 */
app.get("/api/openfda/drug/events", async (req, res) => {
  const { search = "", limit = 10 } = req.query;
  const q = search
    ? `?search=${encodeURIComponent(search)}&limit=${encodeURIComponent(limit)}`
    : `?limit=${encodeURIComponent(limit)}`;
  const url = `https://api.fda.gov/drug/event.json${q}`;

  try {
    const json = await safeFetch(url, {}, 12000);
    const results = json.results || [];

    // Count adverse events by drug
    const counts = {};
    results.forEach((r) => {
      if (r.patient && r.patient.drug) {
        r.patient.drug.forEach((d) => {
          const name = (d.medicinalproduct || "UNKNOWN").toLowerCase();
          counts[name] = (counts[name] || 0) + 1;
        });
      }
    });

    const summary = Object.entries(counts)
      .map(([drug, count]) => ({ drug, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    res.json({
      ok: true,
      source: "openfda",
      total_hits: json.meta ? json.meta.results.total : results.length,
      summary,
    });
  } catch (err) {
    console.error("openFDA fetch error:", err.message);
    res.json({
      ok: false,
      source: "openfda",
      fallback: mockData.openfda,
      summary: mockData.openfda.results.map((r) => ({
        drug: r.drug,
        count: r.adverse_events,
      })),
    });
  }
});

/**
 * Combined KPIs endpoint
 * GET /api/kpis
 */
app.get("/api/kpis", async (req, res) => {
  try {
    // Fetch WHO life expectancy
    const whoRaw = await safeFetch(
      "https://ghoapi.azureedge.net/api/WHOSIS_000001",
      {},
      12000
    ).catch(() => null);
    let lifeExpectancy = mockData.who.Value;
    if (
      whoRaw &&
      whoRaw.value &&
      Array.isArray(whoRaw.value) &&
      whoRaw.value.length > 0
    ) {
      const latest = whoRaw.value[whoRaw.value.length - 1];
      lifeExpectancy = parseFloat(
        latest.NumericValue ||
          latest.Value ||
          latest.ValueNumeric ||
          mockData.who.Value
      );
    }

    // Fetch HealthData sample
    const healthRaw = await safeFetch(
      "https://healthdata.gov/resource/g62h-syeh.json?$limit=20",
      {},
      12000
    ).catch(() => null);
    let totalPatients = 55500;
    if (healthRaw && Array.isArray(healthRaw) && healthRaw.length > 0) {
      totalPatients = healthRaw.reduce((sum, r) => {
        const val =
          parseInt(r.total_patients || r.total_patients_count || 0) || 0;
        return sum + val;
      }, 0);
    }

    // Fetch openFDA sample
    const openRaw = await safeFetch(
      "https://api.fda.gov/drug/event.json?limit=5",
      {},
      12000
    ).catch(() => null);
    let openFdaEventsSample = mockData.openfda.count;
    if (openRaw && openRaw.results && Array.isArray(openRaw.results)) {
      openFdaEventsSample = openRaw.results.length;
    }

    res.json({
      ok: true,
      kpis: {
        totalPatients: totalPatients || 55500,
        lifeExpectancy: lifeExpectancy || 71.8,
        openFdaEventsSample: openFdaEventsSample || 4,
      },
    });
  } catch (err) {
    console.error("KPIs error:", err);
    res.json({
      ok: false,
      kpis: {
        totalPatients: 55500,
        lifeExpectancy: 71.8,
        openFdaEventsSample: 4,
      },
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.listen(PORT, () => {
  console.log(
    `\n🏥 Healthcare Dashboard Backend running on http://localhost:${PORT}`
  );
  console.log(`\n📡 API Endpoints:`);
  console.log(`   GET /api/health`);
  console.log(`   GET /api/who/indicator/:code`);
  console.log(`   GET /api/healthdata/query?dataset=g62h-syeh&limit=50`);
  console.log(`   GET /api/openfda/drug/events?limit=10`);
  console.log(`   GET /api/kpis\n`);
});
