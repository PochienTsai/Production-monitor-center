// charts.js - 圖表初始化與更新
function renderOverviewChart() {
  const ctx = document.getElementById('overviewChart')?.getContext('2d');
  if (!ctx) return;
  const totalMachines = data.plants.reduce(
    (sum, p) => sum + p.areas.reduce((s, id) => s + data.areas[id].machines.length, 0),
    0,
  );
  let greenCount = 0;
  data.plants.forEach((p) =>
    p.areas.forEach((aid) => data.areas[aid].machines.forEach(() => randState() === 'green' && greenCount++)),
  );
  const redCount = totalMachines - greenCount;
  if (window.overviewChart) window.overviewChart.destroy();
  window.overviewChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['運作正常', '異常'],
      datasets: [
        {
          data: [greenCount, redCount],
          backgroundColor: ['#28c76f', '#ea5455'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
    },
  });
}
function initPerformanceChart() {
  const el = document.querySelector('#performanceChart');
  if (!el) return;
  const options = {
    chart: {
      type: 'line',
      height: 220,
      toolbar: { show: false },
    },
    series: [
      {
        name: '效能',
        data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
      },
    ],
    xaxis: {
      categories: Array.from({ length: 10 }, (_, i) => `T${i + 1}`),
    },
    colors: ['#00cfe8'],
  };
  const chart = new ApexCharts(el, options);
  chart.render();
}
