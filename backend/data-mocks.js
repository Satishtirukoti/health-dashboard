// backend/data-mocks.js
module.exports = {
  whoIndicatorMock: {
    Indicator: "Life expectancy at birth (years)",
    Country: "Global",
    Year: 2022,
    Value: 72.8
  },
  healthdataMock: [
    { state: "CA", date: "2023-10-01", inpatient_beds_used_covid: 100, total_patients: 1200 },
    { state: "TX", date: "2023-10-01", inpatient_beds_used_covid: 80, total_patients: 900 },
    { state: "NY", date: "2023-10-01", inpatient_beds_used_covid: 50, total_patients: 700 }
  ],
  openFdaMock: {
    count: 3,
    results: [
      { drug: "aspirin", adverse_events: 12 },
      { drug: "ibuprofen", adverse_events: 8 },
      { drug: "amoxicillin", adverse_events: 5 }
    ]
  }
};
