let charts = {};
let selectedHospital = "all";
const hospitalData = {
all: {
name: "All Hospitals Network",
patients: 3200000,
hospitals: 1850,
billing: "$14,850M",
male: 1480000,
female: 1650000,
other: 70000
},
general: {
name: "City General Hospital",
patients: 380000,
hospitals: 145,
billing: "$1,680M",
male: 175000,
female: 200000,
other: 5000
},
memorial: {
name: "Memorial Medical Center",
patients: 420000,
hospitals: 168,
billing: "$1,950M",
male: 195000,
female: 220000,
other: 5000
},
university: {
name: "University Health System",
patients: 360000,
hospitals: 132,
billing: "$1,580M",
male: 165000,
female: 190000,
other: 5000
},
regional: {
name: "Regional Healthcare Network",
patients: 290000,
hospitals: 118,
billing: "$1,280M",
male: 135000,
female: 150000,
other: 5000
},
central: {
name: "Central Medical Complex",
patients: 340000,
hospitals: 156,
billing: "$1,520M",
male: 155000,
female: 180000,
other: 5000
},
metro: {
name: "Metro Health Services",
patients: 310000,
hospitals: 124,
billing: "$1,420M",
male: 145000,
female: 160000,
other: 5000
},
community: {
name: "Community Care Hospital",
patients: 260000,
hospitals: 98,
billing: "$1,150M",
male: 120000,
female: 135000,
other: 5000
},
specialty: {
name: "Specialty Medical Institute",
patients: 280000,
hospitals: 108,
billing: "$1,280M",
male: 130000,
female: 145000,
other: 5000
},
advanced: {
name: "Advanced Healthcare Center",
patients: 320000,
hospitals: 142,
billing: "$1,480M",
male: 148000,
female: 167000,
other: 5000
},
integrated: {
name: "Integrated Health Network",
patients: 240000,
hospitals: 89,
billing: "$1,080M",
male: 112000,
female: 123000,
other: 5000
}
};
const allPatients = [
{
id: "NHO-2025-001",
name: "John Anderson",
age: 45,
gender: "Male",
blood: "O+",
hospital: "City General Hospital",
condition: "Type 2 Diabetes",
date: "Jan 15, 2025",
status: "active"
},
{
id: "NHO-2025-002",
name: "Sarah Mitchell",
age: 32,
gender: "Female",
blood: "A+",
hospital: "Memorial Medical Center",
condition: "Hypertension",
date: "Jan 18, 2025",
status: "active"
},
{
id: "NHO-2025-003",
name: "Michael Thompson",
age: 58,
gender: "Male",
blood: "B+",
hospital: "University Health System",
condition: "Coronary Heart Disease",
date: "Jan 12, 2025",
status: "critical"
},
{
id: "NHO-2025-004",
name: "Emily Davis",
age: 28,
gender: "Female",
blood: "AB+",
hospital: "Regional Healthcare Network",
condition: "Bronchial Asthma",
date: "Jan 20, 2025",
status: "active"
},
{
id: "NHO-2025-005",
name: "Robert Wilson",
age: 41,
gender: "Male",
blood: "O-",
hospital: "Central Medical Complex",
condition: "Chronic Back Pain",
date: "Jan 08, 2025",
status: "recovered"
},
{
id: "NHO-2025-006",
name: "Jennifer Brown",
age: 35,
gender: "Female",
blood: "A-",
hospital: "Metro Health Services",
condition: "Hypothyroidism",
date: "Jan 22, 2025",
status: "active"
},
{
id: "NHO-2025-007",
name: "David Martinez",
age: 52,
gender: "Male",
blood: "B-",
hospital: "Community Care Hospital",
condition: "Chronic Kidney Disease",
date: "Jan 10, 2025",
status: "critical"
},
{
id: "NHO-2025-008",
name: "Lisa Garcia",
age: 29,
gender: "Female",
blood: "O+",
hospital: "Specialty Medical Institute",
condition: "Chronic Migraine",
date: "Jan 25, 2025",
status: "active"
},
{
id: "NHO-2025-009",
name: "James Rodriguez",
age: 47,
gender: "Male",
blood: "AB-",
hospital: "Advanced Healthcare Center",
condition: "COPD",
date: "Jan 14, 2025",
status: "active"
},
{
id: "NHO-2025-010",
name: "Patricia Lee",
age: 39,
gender: "Female",
blood: "A+",
hospital: "Integrated Health Network",
condition: "Rheumatoid Arthritis",
date: "Jan 19, 2025",
status: "recovered"
},
{
id: "NHO-2025-011",
name: "William Taylor",
age: 55,
gender: "Male",
blood: "O+",
hospital: "City General Hospital",
condition: "Hypertension",
date: "Jan 11, 2025",
status: "active"
},
{
id: "NHO-2025-012",
name: "Mary Johnson",
age: 43,
gender: "Female",
blood: "B+",
hospital: "Memorial Medical Center",
condition: "Thyroid Disorder",
date: "Jan 13, 2025",
status: "active"
},
{
id: "NHO-2025-013",
name: "Christopher White",
age: 36,
gender: "Male",
blood: "A+",
hospital: "University Health System",
condition: "Diabetes Type 1",
date: "Jan 16, 2025",
status: "active"
},
{
id: "NHO-2025-014",
name: "Jessica Harris",
age: 27,
gender: "Female",
blood: "AB-",
hospital: "Regional Healthcare Network",
condition: "Asthma",
date: "Jan 17, 2025",
status: "recovered"
},
{
id: "NHO-2025-015",
name: "Daniel Clark",
age: 62,
gender: "Male",
blood: "O-",
hospital: "Central Medical Complex",
condition: "Heart Disease",
date: "Jan 09, 2025",
status: "critical"
},
{
id: "NHO-2025-016",
name: "Karen Lewis",
age: 38,
gender: "Female",
blood: "B-",
hospital: "Metro Health Services",
condition: "Anemia",
date: "Jan 21, 2025",
status: "active"
},
{
id: "NHO-2025-017",
name: "Matthew Walker",
age: 49,
gender: "Male",
blood: "A-",
hospital: "Community Care Hospital",
condition: "Gastritis",
date: "Jan 23, 2025",
status: "active"
},
{
id: "NHO-2025-018",
name: "Nancy Hall",
age: 31,
gender: "Female",
blood: "O+",
hospital: "Specialty Medical Institute",
condition: "Migraine",
date: "Jan 24, 2025",
status: "recovered"
},
{
id: "NHO-2025-019",
name: "Anthony Allen",
age: 44,
gender: "Male",
blood: "AB+",
hospital: "Advanced Healthcare Center",
condition: "Pneumonia",
date: "Jan 26, 2025",
status: "active"
},
{
id: "NHO-2025-020",
name: "Betty Young",
age: 33,
gender: "Female",
blood: "B+",
hospital: "Integrated Health Network",
condition: "Arthritis",
date: "Jan 27, 2025",
status: "active"
},
{
id: "NHO-2025-021",
name: "Steven King",
age: 51,
gender: "Male",
blood: "O+",
hospital: "City General Hospital",
condition: "Diabetes",
date: "Jan 05, 2025",
status: "active"
},
{
id: "NHO-2025-022",
name: "Dorothy Wright",
age: 26,
gender: "Female",
blood: "A+",
hospital: "Memorial Medical Center",
condition: "Allergy",
date: "Jan 07, 2025",
status: "recovered"
},
{
id: "NHO-2025-023",
name: "Paul Lopez",
age: 48,
gender: "Male",
blood: "B+",
hospital: "University Health System",
condition: "High BP",
date: "Jan 28, 2025",
status: "active"
},
{
id: "NHO-2025-024",
name: "Sandra Hill",
age: 37,
gender: "Female",
blood: "AB+",
hospital: "Regional Healthcare Network",
condition: "Thyroid",
date: "Jan 29, 2025",
status: "active"
},
{
id: "NHO-2025-025",
name: "Mark Scott",
age: 42,
gender: "Male",
blood: "O-",
hospital: "Central Medical Complex",
condition: "Back Pain",
date: "Jan 30, 2025",
status: "active"
}
];
const navItems = document.querySelectorAll(".nav-item");
const refreshBtn = document.getElementById("refreshBtn");
const hospitalSelect = document.getElementById("hospitalSelect");
navItems.forEach((item) => {
item.addEventListener("click", (e) => {
e.preventDefault();
const section = item.getAttribute("data-section");
navItems.forEach((ni) => ni.classList.remove("active"));
item.classList.add("active");
document.querySelectorAll(".section-content").forEach((sec) => {
sec.classList.remove("active");
});
document.getElementById(`${section}-section`).classList.add("active");
});
});
refreshBtn.addEventListener("click", () => {
addUpdatingClass();
setTimeout(() => {
loadAllData();
filterPatients();
updateKPIs();
removeUpdatingClass();
}, 300);
});
hospitalSelect.addEventListener("change", (e) => {
selectedHospital = e.target.value;
addUpdatingClass();
setTimeout(() => {
updateKPIs();
filterPatients();
loadAllData();
removeUpdatingClass();
}, 300);
});
function addUpdatingClass() {
document.querySelector('.content').classList.add('updating');
document.querySelectorAll('.kpi-card').forEach(card => card.classList.add('updating'));
document.querySelectorAll('.chart-box').forEach(box => box.classList.add('updating'));
}
function removeUpdatingClass() {
document.querySelector('.content').classList.remove('updating');
document.querySelectorAll('.kpi-card').forEach(card => card.classList.remove('updating'));
document.querySelectorAll('.chart-box').forEach(box => box.classList.remove('updating'));
}
function getHospitalFilter(hospital) {
const filters = {
all: null,
general: "City General",
memorial: "Memorial",
university: "University",
regional: "Regional",
central: "Central",
metro: "Metro",
community: "Community",
specialty: "Specialty",
advanced: "Advanced",
integrated: "Integrated"
};
return filters[hospital];
}
function updateKPIs() {
const data = hospitalData[selectedHospital];
const kpiValues = document.querySelectorAll('.kpi-value');
if (kpiValues.length >= 6) {
kpiValues[0].textContent = data.billing;
kpiValues[1].textContent = formatNumber(data.female);
kpiValues[2].textContent = formatNumber(data.patients);
kpiValues[3].textContent = formatNumber(data.male);
kpiValues[4].textContent = "2025";
kpiValues[5].textContent = data.hospitals.toLocaleString();
}
}
function formatNumber(num) {
if (num >= 1000000) {
return (num / 1000000).toFixed(2) + 'M';
} else if (num >= 1000) {
return (num / 1000).toFixed(0) + 'K';
}
return num.toString();
}
function filterPatients() {
const filter = getHospitalFilter(selectedHospital);
let filtered = allPatients;
if (filter) {
filtered = allPatients.filter(p => p.hospital.includes(filter));
}
const tbody = document.querySelector("#patients-section tbody");
if (tbody) {
tbody.innerHTML = filtered.map(p => `
<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.age}</td>
<td>${p.gender}</td>
<td>${p.blood}</td>
<td>${p.hospital}</td>
<td>${p.condition}</td>
<td>${p.date}</td>
<td><span class="status-badge ${p.status}">${p.status.charAt(0).toUpperCase() + p.status.slice(1)}</span></td>
</tr>
`).join('');
}
const sectionHeader = document.querySelector("#patients-section .section-header p");
if (sectionHeader) {
const data = hospitalData[selectedHospital];
if (filter) {
sectionHeader.textContent = `Managing ${formatNumber(data.patients)} patients across ${data.hospitals} ${data.name}`;
} else {
sectionHeader.textContent = `Managing ${formatNumber(filtered.length)} patients in table view (Total: 3.2M patients across 1,850 hospitals nationwide)`;
}
}
}
const commonChartOptions = {
responsive: true,
maintainAspectRatio: false,
animation: {
duration: 800,
easing: 'easeInOutQuart'
},
interaction: {
intersect: false,
mode: "index",
},
plugins: {
legend: {
display: false,
labels: {
font: { size: 10 },
padding: 4,
boxWidth: 12,
},
},
tooltip: {
enabled: true,
backgroundColor: "rgba(0, 0, 0, 0.8)",
padding: 8,
titleFont: { size: 11 },
bodyFont: { size: 10 },
},
},
scales: {
y: {
beginAtZero: true,
ticks: {
font: { size: 10 },
maxTicksLimit: 5,
callback: function (value) {
if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
if (value >= 1000) return (value / 1000).toFixed(0) + "K";
return value;
},
},
grid: {
color: "rgba(0,0,0,0.05)",
drawBorder: false,
},
},
x: {
ticks: {
font: { size: 10 },
maxTicksLimit: 8,
maxRotation: 0,
minRotation: 0,
},
grid: {
display: false,
drawBorder: false,
},
},
},
};
async function loadAllData() {
const data = hospitalData[selectedHospital];
const ratio = data.patients / hospitalData.all.patients;
renderBloodTypeChart(
["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
[960000, 360000, 810000, 315000, 735000, 250000, 465000, 170000].map(v => Math.round(v * ratio))
);
renderGenderChart(
["Male", "Female", "Other"],
[data.male, data.female, data.other]
);
renderAgeGroupChart(
["0-18", "18-35", "35-50", "50-65", "65+"],
[480000, 880000, 1040000, 620000, 180000].map(v => Math.round(v * ratio))
);
renderYearChart(
["2020", "2021", "2022", "2023", "2024", "2025"],
[2420000, 2570000, 2730000, 2920000, 3060000, 3200000].map(v => Math.round(v * ratio))
);
renderMedicationChart(
["Aspirin", "Paracetamol", "Metformin", "Ibuprofen", "Amoxicillin"],
[935000, 1140000, 625000, 780000, 670000].map(v => Math.round(v * ratio))
);
renderDiseaseChart(
["Diabetes", "Hypertension", "Heart Disease", "Asthma", "Thyroid"],
[720000, 670000, 440000, 335000, 280000].map(v => Math.round(v * ratio))
);
renderAdmissionTrendChart(
["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
[265000, 280000, 295000, 288000, 305000, 298000, 318000, 312000, 328000, 322000].map(v => Math.round(v * ratio))
);
renderDepartmentChart(
["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Oncology", "General"],
[545000, 475000, 395000, 430000, 325000, 1030000].map(v => Math.round(v * ratio))
);
}
function renderBloodTypeChart(labels, data) {
const ctx = document.getElementById("bloodTypeChart");
if (!ctx) return;
if (charts.bloodType) {
charts.bloodType.data.labels = labels;
charts.bloodType.data.datasets[0].data = data;
charts.bloodType.update('active');
return;
}
charts.bloodType = new Chart(ctx.getContext("2d"), {
type: "bar",
data: {
labels,
datasets: [{
label: "Patients",
data,
backgroundColor: "#0ea5e9",
borderRadius: 4,
barPercentage: 0.7,
}],
},
options: commonChartOptions,
});
}
function renderGenderChart(labels, data) {
const ctx = document.getElementById("genderChart");
if (!ctx) return;
if (charts.gender) {
charts.gender.data.labels = labels;
charts.gender.data.datasets[0].data = data;
charts.gender.update('active');
return;
}
charts.gender = new Chart(ctx.getContext("2d"), {
type: "doughnut",
data: {
labels,
datasets: [{
data,
backgroundColor: ["#0ea5e9", "#06b6d4", "#ec4899"],
borderWidth: 2,
borderColor: "#fff",
}],
},
options: {
responsive: true,
maintainAspectRatio: false,
animation: {
duration: 800,
easing: 'easeInOutQuart'
},
plugins: {
legend: {
position: "bottom",
labels: {
font: { size: 10 },
padding: 6,
boxWidth: 12,
},
},
tooltip: {
callbacks: {
label: function (context) {
const val = context.parsed;
if (val >= 1000000) {
return context.label + ": " + (val / 1000000).toFixed(2) + "M";
} else if (val >= 1000) {
return context.label + ": " + (val / 1000).toFixed(1) + "K";
}
return context.label + ": " + val;
},
},
},
},
},
});
}
function renderAgeGroupChart(labels, data) {
const ctx = document.getElementById("ageGroupChart");
if (!ctx) return;
if (charts.ageGroup) {
charts.ageGroup.data.labels = labels;
charts.ageGroup.data.datasets[0].data = data;
charts.ageGroup.update('active');
return;
}
charts.ageGroup = new Chart(ctx.getContext("2d"), {
type: "bar",
data: {
labels,
datasets: [{
label: "Patients",
data,
backgroundColor: "#06b6d4",
borderRadius: 4,
barPercentage: 0.7,
}],
},
options: commonChartOptions,
});
}
function renderYearChart(labels, data) {
const ctx = document.getElementById("yearChart");
if (!ctx) return;
if (charts.year) {
charts.year.data.labels = labels;
charts.year.data.datasets[0].data = data;
charts.year.update('active');
return;
}
charts.year = new Chart(ctx.getContext("2d"), {
type: "line",
data: {
labels,
datasets: [{
label: "Total Patients",
data,
fill: true,
backgroundColor: "rgba(14, 165, 233, 0.1)",
borderColor: "#0ea5e9",
borderWidth: 2,
tension: 0.4,
pointRadius: 4,
pointBackgroundColor: "#0ea5e9",
pointBorderColor: "#fff",
pointBorderWidth: 2,
}],
},
options: commonChartOptions,
});
}
function renderMedicationChart(labels, data) {
const ctx = document.getElementById("medicationChart");
if (!ctx) return;
if (charts.medication) {
charts.medication.data.labels = labels;
charts.medication.data.datasets[0].data = data;
charts.medication.update('active');
return;
}
charts.medication = new Chart(ctx.getContext("2d"), {
type: "bar",
data: {
labels,
datasets: [{
label: "Prescriptions",
data,
backgroundColor: "#10b981",
borderRadius: 4,
barPercentage: 0.7,
}],
},
options: {
...commonChartOptions,
indexAxis: "y",
},
});
}
function renderDiseaseChart(labels, data) {
const ctx = document.getElementById("diseaseChart");
if (!ctx) return;
if (charts.disease) {
charts.disease.data.labels = labels;
charts.disease.data.datasets[0].data = data;
charts.disease.update('active');
return;
}
charts.disease = new Chart(ctx.getContext("2d"), {
type: "doughnut",
data: {
labels,
datasets: [{
data,
backgroundColor: ["#0ea5e9", "#06b6d4", "#10b981", "#f59e0b", "#ec4899"],
borderWidth: 2,
borderColor: "#fff",
}],
},
options: {
responsive: true,
maintainAspectRatio: false,
animation: {
duration: 800,
easing: 'easeInOutQuart'
},
plugins: {
legend: {
position: "bottom",
labels: {
font: { size: 10 },
padding: 6,
boxWidth: 12,
},
},
},
},
});
}
function renderAdmissionTrendChart(labels, data) {
const ctx = document.getElementById("admissionTrendChart");
if (!ctx) return;
if (charts.admissionTrend) {
charts.admissionTrend.data.labels = labels;
charts.admissionTrend.data.datasets[0].data = data;
charts.admissionTrend.update('active');
return;
}
charts.admissionTrend = new Chart(ctx.getContext("2d"), {
type: "line",
data: {
labels,
datasets: [{
label: "Monthly Admissions",
data,
fill: true,
backgroundColor: "rgba(16, 185, 129, 0.1)",
borderColor: "#10b981",
borderWidth: 2,
tension: 0.4,
pointRadius: 4,
pointBackgroundColor: "#10b981",
pointBorderColor: "#fff",
pointBorderWidth: 2,
}],
},
options: commonChartOptions,
});
}
function renderDepartmentChart(labels, data) {
const ctx = document.getElementById("departmentChart");
if (!ctx) return;
if (charts.department) {
charts.department.data.labels = labels;
charts.department.data.datasets[0].data = data;
charts.department.update('active');
return;
}
charts.department = new Chart(ctx.getContext("2d"), {
type: "bar",
data: {
labels,
datasets: [{
label: "Patients",
data,
backgroundColor: "#8b5cf6",
borderRadius: 4,
barPercentage: 0.7,
}],
},
options: {
...commonChartOptions,
indexAxis: "y",
},
});
}
document.addEventListener('DOMContentLoaded', () => {
updateKPIs();
loadAllData();
filterPatients();
});