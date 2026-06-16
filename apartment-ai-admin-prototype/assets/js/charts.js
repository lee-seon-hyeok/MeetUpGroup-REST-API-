function makeChart(id, type, labels, data, label) {
  const canvas = document.getElementById(id);
  if (!canvas || !window.Chart) return;
  new Chart(canvas, {
    type,
    data: {
      labels,
      datasets: [{ label, data, borderColor: "#2563eb", backgroundColor: ["#dbeafe", "#ccfbf1", "#fee2e2", "#fef3c7", "#e0e7ff", "#dcfce7"], borderWidth: 2, tension: 0.35 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: type !== "bar" } }, scales: type === "doughnut" ? {} : { y: { beginAtZero: true } } }
  });
}

function renderCharts(page) {
  if (page === "dashboard") {
    makeChart("chart1", "bar", ["주차", "소음", "시설", "쓰레기", "누수"], [42, 31, 24, 18, 9], "민원 수");
    makeChart("chart2", "line", ["1월", "2월", "3월", "4월", "5월", "6월"], [88, 94, 103, 97, 121, 132], "월별 민원");
    makeChart("chart3", "doughnut", ["완납", "미납", "연체"], [73, 18, 9], "관리비");
  }
  if (page === "complaint-analytics") makeChart("chart1", "bar", complaintStats.map(x => x.label), complaintStats.map(x => x.value), "TOP 5");
  if (page === "statistics") {
    makeChart("chart1", "line", ["1월", "2월", "3월", "4월", "5월", "6월"], [88, 94, 103, 97, 121, 132], "민원 추이");
    makeChart("chart2", "doughnut", ["주차", "소음", "시설", "쓰레기", "누수"], [42, 31, 24, 18, 9], "민원 비율");
    makeChart("chart3", "bar", ["엘리베이터", "커뮤니티룸", "스터디룸", "방문차량"], [16, 24, 19, 38], "예약 건수");
    makeChart("chart4", "doughnut", ["OpenAI", "KURE-v1", "Fallback"], [61, 28, 11], "AI 모델");
  }
}
