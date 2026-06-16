const navItems = [
  ["dashboard","대시보드","DB"], ["customers","고객 관리","CU"], ["contracts","계약 관리","CT"],
  ["vehicles","차량 관리","VH"], ["payments","납부/연체 관리","PM"], ["tickets","민원 티켓 관리","TK"],
  ["accidents","사고 관리","AC"], ["maintenance","정비 요청 관리","MT"], ["chat-logs","AI 상담 로그","AI"],
  ["rag-documents","RAG 문서 관리","RG"], ["ai-monitor","AI 처리 모니터","MN"]
];

function pageFile(key) { return `${key}.html`; }

function initShell() {
  const page = document.body.dataset.page;
  const title = document.body.dataset.title;
  document.querySelector("#shell").innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">LA</div><div><strong>Lease AI Admin</strong><span>차량 리스 CS 관제</span></div></div>
        <nav class="menu">${navItems.map(([key,label,icon]) => `<a class="${key === page ? "active" : ""}" href="${pageFile(key)}"><span class="icon">${icon}</span>${label}</a>`).join("")}</nav>
      </aside>
      <div class="workspace">
        <header class="topbar">
          <div><p class="eyebrow">AI 기반 차량 리스 관리 시스템</p><h1>${title}</h1></div>
          <div class="topbar-tools">
            <label class="global-search"><span>검색</span><input id="globalSearch" type="search" placeholder="고객, 차량번호, 티켓 검색"></label>
            <button class="icon-btn" data-toast="긴급 사고 알림 2건이 있습니다." title="긴급 알림">!</button>
            <button class="btn primary" id="simulateAccident">시승 사고 특수 시나리오</button>
            <div class="profile"><div class="avatar">관</div><div><strong>관리자</strong><span>2026-06-17</span></div></div>
          </div>
        </header>
        <main id="app" class="content"></main>
      </div>
    </div>
    <div id="modalRoot" class="modal-backdrop"></div>
    <div id="toast" class="toast"></div>`;

  document.querySelector("#simulateAccident").addEventListener("click", () => {
    const item = {
      id: `ACC-LOCAL-${Date.now().toString().slice(-4)}`,
      time: "2026-06-17 15:40",
      plate: "12가3456",
      customer: "김민수",
      location: "서울 강남구 시승센터",
      severity: "HIGH",
      type: "시승 중 접촉",
      status: "고객 확인 필요",
      ai: "AI 분석 중"
    };
    const saved = JSON.parse(localStorage.getItem("leaseAccidents") || "[]");
    saved.unshift(item);
    localStorage.setItem("leaseAccidents", JSON.stringify(saved));
    toast("mock 사고 이벤트가 생성되었습니다. 사고 관리 화면에서 확인할 수 있습니다.");
    setTimeout(() => { item.ai = "AI 분석 완료"; localStorage.setItem("leaseAccidents", JSON.stringify([item, ...saved.slice(1)])); }, 1600);
  });

  document.addEventListener("click", (e) => {
    const toastBtn = e.target.closest("[data-toast]");
    if (toastBtn) toast(toastBtn.dataset.toast);
    if (e.target.matches("[data-modal-close]")) closeModal();
  });
}

function setContent(html) {
  document.querySelector("#app").innerHTML = html;
}

function badge(value) {
  const text = String(value);
  let cls = "info";
  if (/완료|정상|성공|납부 완료|운행/.test(text)) cls = "ok";
  if (/대기|예정|접수|필요|보류|중|보통/.test(text)) cls = "wait";
  if (/긴급|HIGH|CRITICAL|실패|연체|사고|위험/.test(text)) cls = "danger-badge";
  if (/AI|RAG|임베딩/.test(text)) cls = "ai";
  return `<span class="badge ${cls}">${text}</span>`;
}

function severityBadge(value) {
  return `<span class="badge severity-${String(value).toLowerCase()}">${value}</span>`;
}

function money(v) { return `${Number(v).toLocaleString()}원`; }

function table(headers, rows) {
  return `<div class="table-wrap"><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
}

function kpis(items) {
  return `<section class="kpi-grid">${items.map(x => `<article class="kpi-card"><span>${x.label}</span><strong>${x.value}</strong><small>${x.note || ""}</small></article>`).join("")}</section>`;
}

function barChart(items) {
  const max = Math.max(...items.map(x => x.value));
  return `<div class="bar-chart">${items.map(x => `<div class="bar-row"><span>${x.label}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.round(x.value / max * 100)}%"></div></div><b>${x.value}</b></div>`).join("")}</div>`;
}

function openModal(title, body) {
  const root = document.querySelector("#modalRoot");
  root.innerHTML = `<section class="modal"><header class="modal-header"><h2>${title}</h2><button class="icon-btn" data-modal-close>×</button></header><div class="modal-body">${body}</div></section>`;
  root.classList.add("show");
}

function closeModal() {
  document.querySelector("#modalRoot").classList.remove("show");
}

function toast(message) {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function detailGrid(items) {
  return `<div class="info-grid">${items.map(([k,v]) => `<div class="info-card"><span>${k}</span><strong>${v}</strong></div>`).join("")}</div>`;
}

function bindSearch(inputId, rowsSelector) {
  const input = document.querySelector(inputId);
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll(rowsSelector).forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

function savedAccidents() {
  return [...JSON.parse(localStorage.getItem("leaseAccidents") || "[]"), ...accidents];
}

initShell();
