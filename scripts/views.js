// views.js - 各層級渲染函式

// DOM 相關
const container = document.getElementById('view-container');
const breadcrumb = document.getElementById('breadcrumb');
const backBtn = document.getElementById('backBtn');

function renderBreadcrumb() {
  breadcrumb.innerHTML = stack
    .map(
      (it, i) =>
        `<li class="breadcrumb-item ${i === stack.length - 1 ? 'active fw-semibold' : ''}">` +
        (i === stack.length - 1
          ? it.label
          : `<a href="#" class="link-secondary link-underline-opacity-0" onclick="jump(${i})">${it.label}</a>`) +
        '</li>',
    )
    .join('');
}

function renderView() {
  const cur = stack.at(-1);
  backBtn.classList.toggle('d-none', stack.length <= 1);
  renderBreadcrumb();
  container.classList.remove('view-fade');
  setTimeout(() => {
    container.classList.add('view-fade');
    cur.render();
    if (cur.label === '首頁') {
      setTimeout(() => {
        renderOverviewChart();
        initPerformanceChart();
      }, 100);
    }
  }, 0);
}

// 首頁
function viewHome() {
  // 統計資訊
  const totalMachines = data.plants.reduce(
    (sum, p) => sum + p.areas.reduce((s, id) => s + data.areas[id].machines.length, 0),
    0,
  );
  const totalAreas = Object.keys(data.areas).length;
  const totalPlants = data.plants.length;
  let greenCount = 0;
  data.plants.forEach((p) =>
    p.areas.forEach((aid) => data.areas[aid].machines.forEach(() => randState() === 'green' && greenCount++)),
  );
  const redCount = totalMachines - greenCount;
  const healthRate = Math.round((greenCount / totalMachines) * 100);
  container.innerHTML = `
    <div class="stats-bar animate__animated animate__fadeIn" data-aos="fade-up">
      <div class="row">
        <div class="col-4 stats-item">
          <p class="stats-value">${totalPlants}</p>
          <p class="stats-label">工廠</p>
        </div>
        <div class="col-4 stats-item">
          <p class="stats-value">${totalAreas}</p>
          <p class="stats-label">區域</p>
        </div>
        <div class="col-4 stats-item">
          <p class="stats-value">${totalMachines}</p>
          <p class="stats-label">機台</p>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12 col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="100">
        <div class="kpi-card">
          <div class="kpi-title"><i class="bi bi-activity me-2"></i>系統健康度</div>
          <div class="kpi-value">
            ${healthRate}%
            <span class="kpi-trend ${healthRate >= 70 ? 'up' : 'down'}">
              <i class="bi ${healthRate >= 70 ? 'bi-arrow-up' : 'bi-arrow-down'}"></i>
            </span>
          </div>
          <div class="progress progress-thin">
            <div class="progress-bar bg-${healthRate >= 70 ? 'success' : 'danger'}" style="width: ${healthRate}%"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="200">
        <div class="kpi-card">
          <div class="kpi-title"><i class="bi bi-speedometer2 me-2"></i>產品合格率</div>
          <div class="kpi-value">
            ${Math.round(85 + Math.random() * 10)}% <span class="kpi-trend up"><i class="bi bi-arrow-up"></i></span>
          </div>
          <div class="progress progress-thin">
            <div class="progress-bar bg-success" style="width: 92%"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="300">
        <div class="kpi-card">
          <div class="kpi-title"><i class="bi bi-gear-fill me-2"></i>整體設備效率</div>
          <div class="kpi-value">
            ${Math.round(75 + Math.random() * 15)}% <span class="kpi-trend up"><i class="bi bi-arrow-up"></i></span>
          </div>
          <div class="progress progress-thin">
            <div class="progress-bar bg-info" style="width: 81%"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3 mb-4" data-aos="fade-up" data-aos-delay="400">
        <div class="kpi-card">
          <div class="kpi-title"><i class="bi bi-exclamation-triangle-fill me-2"></i>警報數</div>
          <div class="kpi-value">
            ${redCount} <span class="kpi-trend ${redCount > 10 ? 'down' : 'up'}"><i class="bi ${
    redCount > 10 ? 'bi-arrow-up' : 'bi-arrow-down'
  }"></i></span>
          </div>
          <div class="progress progress-thin">
            <div class="progress-bar bg-${redCount > 10 ? 'danger' : 'warning'}" style="width: ${Math.min(
    100,
    redCount * 5,
  )}%"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert-panel mb-4" data-aos="fade-up" data-aos-delay="100">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0"><i class="bi bi-heart-pulse-fill me-2"></i>系統健康與維運狀態</h5>
        <span class="badge bg-info">即時監控</span>
      </div>
      <div class="row g-3">
        <div class="col-12 col-md-4">
          <div class="d-flex align-items-center gap-2">
            <span class="dot green" id="server-dot"></span>
            <span>伺服器狀態</span>
            <span class="ms-auto small text-success" id="server-status">執行中</span>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="d-flex align-items-center gap-2">
            <span class="dot green" id="network-dot"></span>
            <span>網路狀態</span>
            <span class="ms-auto small text-success" id="network-status">正常</span>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="d-flex align-items-center gap-2">
            <span class="dot green" id="db-dot"></span>
            <span>資料庫狀態</span>
            <span class="ms-auto small text-success" id="db-status">連線中</span>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="alert alert-warning d-flex align-items-center gap-2 animate__animated animate__pulse animate__infinite" style="animation-duration:1.5s">
          <i class="bi bi-tools"></i>
          <span>下次系統維護排程：2025/04/20 02:00-04:00（預計 2 小時）</span>
        </div>
      </div>
    </div>
    <div class="alert-panel mb-4" data-aos="fade-up" data-aos-delay="450">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0"><i class="bi bi-bell-fill me-2"></i>最新系統警報</h5>
        <span class="badge bg-danger">${redCount} 個未處理</span>
      </div>
      <div class="alert-item critical">
        <div class="d-flex justify-content-between">
          <div><span class="alert-badge critical">嚴重</span>ASEKH A1A2 K1 機台 3 溫度過高</div>
          <small>10 分鐘前</small>
        </div>
      </div>
      <div class="alert-item warning">
        <div class="d-flex justify-content-between">
          <div><span class="alert-badge warning">警告</span>ASEKH A3 K21 機台 5 效能下降</div>
          <small>35 分鐘前</small>
        </div>
      </div>
      <div class="alert-item info">
        <div class="d-flex justify-content-between">
          <div><span class="alert-badge info">資訊</span>系統維護將於 2025/04/20 進行</div>
          <small>今天 11:05</small>
        </div>
      </div>
    </div>
    <h4 class="mb-3" data-aos="fade-up" data-aos-delay="500">
      <i class="bi bi-building-fill me-2"></i>工廠概覽
    </h4>
    <div class="row g-4">
      ${data.plants
        .map(
          (p, index) => `
        <div class="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${500 + index * 100}">
          <div class="click-card shadow" onclick="openPlant('${p.id}')">
            <img src="${p.img}" class="cartoon-img" alt="${p.label}" loading="lazy">
            <div class="card-overlay-label">
              <i class="bi bi-geo-alt-fill me-2"></i>${p.label}
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2 px-1">
            <span class="indicator">${dot(randState())}<span class="ms-1">產品狀態</span></span>
            <span class="indicator">${dot(randState())}<span class="ms-1">機台健康</span></span>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
    <div class="chart-container mt-4">
      <div class="chart-title">機台健康分布</div>
      <canvas id="overviewChart" height="120"></canvas>
    </div>
    <div class="chart-container mt-4">
      <div class="chart-title">設備效能趨勢</div>
      <div id="performanceChart"></div>
    </div>
  `;
}

// 工廠層
function openPlant(pid) {
  const p = data.plants.find((x) => x.id === pid);
  if (p) show(() => viewPlant(p), p.label);
}

function viewPlant(p) {
  container.innerHTML =
    '<div class="row g-4">' +
    p.areas
      .map((aid) => {
        const a = data.areas[aid];
        return `
  <div class="col-6 col-md-4 col-lg-3">
    <div class="click-card shadow-sm" onclick="openArea('${p.id}','${aid}')">
      <img src="${a.img}" class="cartoon-img" alt="${a.label}">
      <div class="card-overlay-label small">${a.label}</div>
    </div>
    <div class="d-flex gap-2 mt-1 small">
      <span class="indicator">${dot(randState())}產品</span>
      <span class="indicator">${dot(randState())}機台</span>
    </div>
  </div>`;
      })
      .join('') +
    '</div>';
}

// 廠區層
function openArea(pid, aid) {
  const p = data.plants.find((x) => x.id === pid);
  const a = data.areas[aid];
  if (p && a) show(() => viewArea(p, a), a.label);
}

function viewArea(p, a) {
  container.innerHTML =
    '<div class="row g-3">' +
    a.machines
      .map(
        (m) => `
  <div class="col-4 col-md-3 col-lg-2">
    <div class="click-card" onclick="openMachine('${p.id}','${a.label}',${m})">
      <img src="${data.machineImg}" class="cartoon-img" alt="Machine ${m}">
      <div class="card-overlay-label small">機台 ${m}</div>
    </div>
    <div class="d-flex justify-content-center gap-2 small mt-1">
      ${dot(randState())}
      ${dot(randState())}
    </div>
  </div>`,
      )
      .join('') +
    '</div>';
}

// 機台層
function openMachine(pid, alabel, mno) {
  const p = data.plants.find((x) => x.id === pid);
  if (p) show(() => viewMachine(alabel, mno), `機台 ${mno}`);
}

function viewMachine(alabel, mno) {
  const productH = Math.round(Math.random() * 100);
  const machineH = Math.round(Math.random() * 100);
  container.innerHTML = `
    <div class="row g-4 align-items-center">
      <div class="col-12 col-lg-6"><img src="${
        data.machineImg
      }" class="cartoon-img shadow-sm" alt="Machine ${mno}"></div>
      <div class="col-12 col-lg-6">
        <div class="p-4 bg-white rounded-4 shadow-sm">
          <h4 class="mb-4">${alabel}｜機台 ${mno}</h4>
          <p class="fs-5 d-flex align-items-center gap-2">${dot(
            productH > 50 ? 'green' : 'red',
          )} 產品健康度 <span class="ms-auto fw-semibold">${productH}%</span></p>
          <p class="fs-5 d-flex align-items-center gap-2">${dot(
            machineH > 50 ? 'green' : 'red',
          )} 機台健康度 <span class="ms-auto fw-semibold">${machineH}%</span></p>
        </div>
      </div>
    </div>`;
}
