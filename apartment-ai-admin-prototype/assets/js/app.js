const pages = {
  "dashboard": ["대시보드", "오늘의 민원, 예약, CCTV, AI 처리 현황을 한눈에 확인합니다."],
  "ai-monitor": ["AI 관제", "AI Agent 요청 처리 로그와 모델 사용 상태를 모니터링합니다."],
  "complaints": ["민원 관리", "입주민 민원 접수 현황과 처리 상태를 관리합니다."],
  "complaint-detail": ["민원 상세", "민원 내용, AI 분석 결과, 관리자 처리 내용을 확인합니다."],
  "complaint-analytics": ["민원 분석", "민원 유형, 키워드, 발생 구역을 분석합니다."],
  "reservations": ["예약 관리", "시설 예약 신청과 승인 상태를 관리합니다."],
  "residents-units": ["입주민·세대 관리", "입주민, 세대, 차량, 민원 이력을 통합 관리합니다."],
  "vehicles": ["차량 관리", "입주민 차량과 방문 차량, 미등록 차량 이벤트를 확인합니다."],
  "maintenance-fees": ["관리비 관리", "월별 관리비 부과와 납부 상태를 관리합니다."],
  "knowledge-base": ["지식베이스 관리", "RAG 문서와 Vector DB 상태를 관리합니다."],
  "cctv": ["CCTV 관제", "mock CCTV 화면과 위험 이벤트를 확인합니다."],
  "statistics": ["통계", "전체 시스템 운영 지표를 차트로 확인합니다."]
};

const nav = [
  ["dashboard", "대시보드"], ["ai-monitor", "AI 관제"], ["complaints", "민원 관리"], ["complaint-analytics", "민원 분석"],
  ["reservations", "예약 관리"], ["residents-units", "입주민·세대 관리"], ["vehicles", "차량 관리"], ["maintenance-fees", "관리비 관리"],
  ["knowledge-base", "지식베이스 관리"], ["cctv", "CCTV 관제"], ["statistics", "통계"]
];

function badge(value, type = "status-badge") {
  return `<span class="${type} ${statusClass(value)}">${value}</span>`;
}

function table(headers, rows, attrs = "") {
  return `<div class="table-wrap"><table class="table" ${attrs}><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
}

function kpis(items) {
  return `<section class="kpi-grid">${items.map(x => `<article class="kpi-card"><span>${x.label}</span><strong>${x.value}</strong><small>${x.note || ""}</small></article>`).join("")}</section>`;
}

function shell(page, content) {
  const [title, desc] = pages[page];
  document.querySelector("#app").innerHTML = `
    <aside class="sidebar"><div class="brand"><b>관리자 관제 시스템</b><span>Apartment AI Admin</span></div><nav>${nav.map(([key, label]) => `<a class="${key === page ? "active" : ""}" href="${key}.html"><span>${label}</span></a>`).join("")}</nav></aside>
    <main class="main"><header class="header"><div class="page-title"><h1>${title}</h1><p>${desc}</p></div><div class="header-actions"><button class="btn btn-outline" data-toast="새로고침되었습니다.">새로고침</button><button class="btn btn-primary" data-toast="mock 보고서를 생성했습니다.">보고서 생성</button></div></header>${content}</main>`;
  bindCommonInteractions();
  renderCharts(page);
}

function renderDashboard() {
  shell("dashboard", `
    ${kpis([{label:"오늘 접수 민원",value:"18건",note:"전일 대비 +4"},{label:"미처리 민원",value:"9건"},{label:"긴급 민원",value:"2건"},{label:"예약 승인 대기",value:"5건"},{label:"미납 관리비 세대",value:"27세대"},{label:"CCTV 위험 이벤트",value:"6건"},{label:"AI 자동 처리",value:"43건"}])}
    <section class="content-grid three">
      <article class="panel ai-summary-card"><h2>오늘의 AI 운영 요약</h2><p>오늘 접수된 민원은 총 18건입니다. 주차 민원이 7건으로 가장 많고, 시설 고장 민원은 5건입니다. 긴급 민원은 2건이며 모두 필수 관리 민원입니다. 지하주차장 B2 구역에서 주차 관련 이벤트가 반복 발생하고 있어 안내 공지와 현장 점검이 필요합니다.</p></article>
      <article class="panel"><h2>최근 민원</h2>${miniList(complaints.slice(0,4), "title", "status")}</article>
      <article class="panel"><h2>CCTV 위험 이벤트</h2>${miniList(cctvEvents.slice(0,4), "type", "status")}</article>
    </section>
    <section class="content-grid three"><article class="chart-card"><h2>카테고리별 민원</h2><canvas id="chart1"></canvas></article><article class="chart-card"><h2>월별 민원 추이</h2><canvas id="chart2"></canvas></article><article class="chart-card"><h2>관리비 납부 상태</h2><canvas id="chart3"></canvas></article></section>`);
}

function miniList(data, textKey, statusKey) {
  return `<div class="mini-list">${data.map(x => `<button class="mini-row" data-toast="상세 정보가 선택되었습니다."><span>${x[textKey]}</span>${badge(x[statusKey])}</button>`).join("")}</div>`;
}

function renderAiMonitor() {
  shell("ai-monitor", `${kpis([{label:"오늘 AI 응답",value:"148회"},{label:"RAG 검색",value:"64회"},{label:"민원 자동 분류",value:"38회"},{label:"예약 Tool Calling",value:"21회"},{label:"OpenAI 호출",value:"112회"},{label:"Hugging Face 호출",value:"57회"},{label:"fallback 발생",value:"3회"}])}
  <section class="content-grid wide-detail"><article class="panel"><h2>AI 처리 로그</h2>${table(["시간","사용자","요청 유형","사용 모델","Fallback","응답 시간","처리 결과"], aiLogs.map((x,i)=>`<tr data-detail="ai-${i}"><td>${x.time}</td><td>${x.user}</td><td>${x.type}</td><td>${x.model}</td><td>${badge(x.fallback)}</td><td>${x.latency}</td><td>${badge(x.result)}</td></tr>`))}</article><aside class="detail-panel" id="detail">${aiDetail(aiLogs[0])}</aside></section>`);
  bindDetails(aiLogs, aiDetail, "ai");
}

function aiDetail(x) {
  return `<h2>AI 상세 정보</h2><dl><dt>사용자 질문</dt><dd>${x.question}</dd><dt>Intent 분석 결과</dt><dd>${x.intent}</dd><dt>사용 모델</dt><dd>${x.model}</dd><dt>검색 문서</dt><dd>${x.docs}</dd><dt>Tool Calling 결과</dt><dd>${x.tool}</dd><dt>최종 답변</dt><dd>${x.answer}</dd><dt>오류 메시지</dt><dd>${x.error}</dd></dl>`;
}

function renderComplaints() {
  shell("complaints", `<section class="filter-bar"><select id="statusFilter"><option value="">전체 상태</option><option>접수</option><option>처리중</option><option>완료</option></select><select><option>전체 카테고리</option><option>주차</option><option>소음</option><option>시설 고장</option></select><input placeholder="검색어"><button class="btn btn-primary" data-toast="필터가 적용되었습니다.">검색</button></section><article class="panel"><h2>민원 목록</h2><div id="complaintTable"></div></article>`);
  const draw = () => {
    const v = document.querySelector("#statusFilter").value;
    const data = v ? complaints.filter(x => x.status === v) : complaints;
    document.querySelector("#complaintTable").innerHTML = table(["민원번호","카테고리","제목","세대","AI 긴급도","상태","접수일","담당"], data.map(x=>`<tr onclick="location.href='complaint-detail.html'"><td>${x.id}</td><td>${x.category}</td><td>${x.title}</td><td>${x.unit}</td><td>${badge(x.priority,"priority-badge")}</td><td>${badge(x.status)}</td><td>${x.date}</td><td>${x.assignee}</td></tr>`));
  };
  draw();
  document.querySelector("#statusFilter").addEventListener("change", draw);
}

function renderComplaintDetail() {
  const x = complaints[0];
  shell("complaint-detail", `<section class="content-grid detail-layout"><article class="panel"><h2>기본 정보</h2><div class="info-grid">${["민원번호:"+x.id,"카테고리:"+x.category,"세대:"+x.unit,"접수일:"+x.date,"현재 상태:"+x.status,"담당자:"+x.assignee].map(v=>`<span>${v}</span>`).join("")}</div><h2>입주민 원문</h2><p class="quote">${x.text}</p><h2>AI 분석 결과</h2><div class="analysis-grid"><span>AI 요약: 지하주차장 B2 반복 주차 불편</span><span>분류: 주차 민원</span><span>긴급도: 긴급</span><span>추천 부서: 보안팀, 생활지원팀</span><span>키워드: 지하주차장, 반복, 통행 방해</span><span>관련 문서: 주차장 운영 규정</span></div></article><aside class="detail-panel"><h2>AI 답변 초안</h2><textarea id="replyDraft">접수하신 지하주차장 B2 주차 불편 사항을 확인했습니다. 관리사무소에서 현장 확인 후 해당 구역 안내와 차량 계도를 진행하겠습니다.</textarea><button class="btn btn-outline" data-copy="#replyDraft">초안 복사</button><h2>관리자 처리</h2><label>상태 변경</label><select><option>접수</option><option>처리중</option><option>완료</option><option>반려</option></select><label>처리 메모</label><textarea>보안팀 현장 확인 요청</textarea><label>입주민 답변</label><textarea>처리 예정 안내</textarea><button class="btn btn-primary" data-toast="처리 내용이 저장되었습니다.">저장</button></aside></section>`);
}

function renderComplaintAnalytics() {
  shell("complaint-analytics", `<section class="content-grid two"><article class="chart-card"><h2>이번 달 민원 TOP 5</h2><canvas id="chart1"></canvas></article><article class="panel"><h2>민원 키워드 클라우드</h2><div class="keyword-cloud">${complaintKeywords.map(x=>`<span style="font-size:${14+x.weight*4}px">${x.word}</span>`).join("")}</div></article></section><section class="content-grid two"><article class="panel"><h2>동·구역별 민원 히트맵</h2><div class="heatmap-grid">${["101동 28건","102동 15건","103동 36건","104동 9건","지하주차장 42건","분리수거장 21건","놀이터 12건","커뮤니티센터 8건"].map((x,i)=>`<div class="heatmap-cell level-${Math.min(5, i%6)}">${x}</div>`).join("")}</div></article><article class="panel ai-summary-card"><h2>AI 민원 분석 리포트</h2><p>이번 달 가장 많이 발생한 민원은 주차 민원입니다. 전체 민원 132건 중 42건으로 31.8%를 차지합니다. 특히 지하주차장 B2 구역에 민원이 집중되어 주차 구역 안내 공지와 CCTV 이벤트 확인을 우선 진행하는 것이 좋습니다.</p></article></section>`);
}

function renderReservations() {
  shell("reservations", `${kpis([{label:"오늘 예약",value:"12건"},{label:"승인 대기",value:"5건"},{label:"승인 완료",value:"23건"},{label:"반려",value:"2건"},{label:"취소",value:"1건"}])}<section class="content-grid wide-detail"><article class="panel"><h2>예약 목록</h2>${table(["예약번호","시설명","신청자","세대","예약일시","목적","상태","신청일"], reservations.map((x,i)=>`<tr data-detail="res-${i}"><td>${x.id}</td><td>${x.facility}</td><td>${x.user}</td><td>${x.unit}</td><td>${x.time}</td><td>${x.purpose}</td><td>${badge(x.status)}</td><td>${x.requested}</td></tr>`))}</article><aside class="detail-panel" id="detail">${reservationDetail(reservations[0])}</aside></section><section class="content-grid four">${["이사 엘리베이터","커뮤니티룸","독서실 스터디룸","방문 차량 등록"].map(x=>`<article class="panel facility"><h2>${x}</h2><p>예약 가능</p></article>`).join("")}</section>`);
  bindDetails(reservations, reservationDetail, "res");
}

function reservationDetail(x) {
  return `<h2>예약 상세</h2><p>${x.user} / ${x.unit}</p><p>${x.facility} ${x.time}</p><p>중복 예약 여부: 없음</p><p>AI 승인 추천: 승인 가능</p><button class="btn btn-primary" data-status-target="#resStatus" data-next-status="승인완료">승인</button><button class="btn btn-danger" data-status-target="#resStatus" data-next-status="반려">반려</button><p>${badge(x.status)} <span id="resStatus" class="status-badge warning">${x.status}</span></p><textarea placeholder="관리자 메모"></textarea>`;
}

function renderResidentsUnits() {
  shell("residents-units", `<section class="content-grid two"><article class="panel"><h2>입주민 목록</h2>${table(["이름","동","호수","연락처","계정 상태","민원 수","예약 수","관리비 상태"], residents.map(x=>`<tr><td>${x.name}</td><td>${x.dong}</td><td>${x.unit}</td><td>${x.phone}</td><td>${badge(x.account)}</td><td>${x.complaints}</td><td>${x.reservations}</td><td>${badge(x.fee)}</td></tr>`))}</article><article class="panel"><h2>세대 목록</h2>${table(["동","호수","입주민","등록 차량 수","미납 여부","민원 수","예약 수"], units.map(x=>`<tr><td>${x.dong}</td><td>${x.unit}</td><td>${x.resident}</td><td>${x.vehicles}</td><td>${badge(x.unpaid)}</td><td>${x.complaints}</td><td>${x.reservations}</td></tr>`))}</article></section><article class="panel"><h2>세대 상세 카드</h2><div class="detail-cards">${["기본 정보","민원 이력","예약 이력","등록 차량","관리비 내역"].map(x=>`<div>${x}<strong>최근 데이터 표시</strong></div>`).join("")}</div></article>`);
}

function renderVehicles() {
  shell("vehicles", `${kpis([{label:"등록 차량 수",value:"286대"},{label:"방문 차량 수",value:"42대"},{label:"승인 대기 차량",value:"8대"},{label:"만료 방문 차량",value:"4대"},{label:"미등록 이벤트",value:"3건"}])}<section class="content-grid wide-detail"><article class="panel"><h2>차량 목록</h2>${table(["차량번호","구분","세대","소유자","상태","등록일","비고"], vehicles.map(x=>`<tr><td>${x.no}</td><td>${x.type}</td><td>${x.unit}</td><td>${x.owner}</td><td>${badge(x.status)}</td><td>${x.date}</td><td>${x.note}</td></tr>`))}</article><aside class="detail-panel"><h2>CCTV 이벤트 연결</h2><p>지하주차장 입구에서 미등록 차량 의심 이벤트 발생</p><p>감지 시간: 14:22</p><p>처리 상태: ${badge("미확인")}</p><button class="btn btn-primary" data-toast="차량 이벤트를 확인 처리했습니다.">확인</button></aside></section>`);
}

function renderMaintenanceFees() {
  shell("maintenance-fees", `${kpis([{label:"이번 달 고지 총액",value:"72,480,000원"},{label:"납부 완료 세대",value:"384세대"},{label:"미납 세대",value:"27세대"},{label:"연체 세대",value:"9세대"},{label:"평균 관리비",value:"248,000원"}])}<section class="content-grid wide-detail"><article class="panel"><h2>관리비 목록</h2>${table(["동·호수","입주민","청구월","총 관리비","납부 상태","납부 기한","전월 대비"], maintenanceFees.map(x=>`<tr><td>${x.unit}</td><td>${x.resident}</td><td>${x.month}</td><td>${x.total.toLocaleString()}원</td><td>${badge(x.status)}</td><td>${x.due}</td><td>${x.diff}</td></tr>`))}</article><aside class="detail-panel"><h2>관리비 상세</h2><p>일반관리비 86,000원</p><p>청소비 18,000원</p><p>경비비 42,000원</p><p>장기수선충당금 31,000원</p><p>공용 전기료 26,000원</p><p>수도료 35,000원</p><p>주차비 48,000원</p><h2>AI 분석</h2><p>101동 1203호의 이번 달 관리비는 전월 대비 48,000원 증가했습니다. 주요 원인은 차량 1대 추가 등록으로 인한 주차비 증가와 수도료 증가입니다.</p><button class="btn btn-primary" data-toast="월별 관리비를 생성했습니다.">월별 관리비 생성</button><button class="btn btn-outline" data-toast="납부 상태가 변경되었습니다.">납부 상태 변경</button></aside></section>`);
}

function renderKnowledgeBase() {
  shell("knowledge-base", `${kpis([{label:"전체 문서 수",value:"128개"},{label:"임베딩 완료 문서",value:"119개"},{label:"처리중 문서",value:"6개"},{label:"실패 문서",value:"3개"},{label:"Vector Chunk 수",value:"4,820개"}])}<section class="content-grid two"><article class="panel"><h2>문서 업로드</h2><input placeholder="문서 제목"><select><option>생활 규정</option><option>주차 규정</option><option>시설 예약</option><option>관리비</option><option>FAQ</option></select><div class="upload-box">파일 업로드 UI</div><button class="btn btn-primary" data-toast="문서 업로드가 mock 처리되었습니다.">업로드</button></article><article class="panel ai-summary-card"><h2>Hugging Face KURE-v1 사용 사인</h2><p>본 시스템은 한국어 아파트 규정집 검색 정확도를 높이기 위해 Hugging Face의 한국어 Retrieval Embedding 모델인 KURE-v1을 사용할 수 있도록 설계했습니다. 문서 Chunk를 KURE-v1로 벡터화하고 PGVector에 저장해 입주민 질문과 의미적으로 가까운 규정 조항을 검색합니다.</p></article></section><section class="content-grid wide-detail"><article class="panel"><h2>문서 목록</h2>${table(["문서명","카테고리","파일 형식","Chunk 수","Embedding 상태","등록일","챗봇 사용"], documents.map(x=>`<tr><td>${x.name}</td><td>${x.category}</td><td>${x.type}</td><td>${x.chunks}</td><td>${badge(x.embedding)}</td><td>${x.date}</td><td>${badge(x.active)}</td></tr>`))}<h2>RAG 검색 테스트</h2><input placeholder="테스트 질문"><button class="btn btn-primary" data-rag-search>검색</button><div id="rag-result"></div></article><aside class="detail-panel"><h2>문서 상세</h2><p>원본 파일 정보, 텍스트 추출 요약, Chunk 목록, Embedding 상태, Vector DB 저장 상태를 확인합니다.</p><button class="btn btn-outline" data-toast="재임베딩을 시작했습니다.">재임베딩</button><button class="btn btn-danger" data-toast="문서를 비활성화했습니다.">문서 비활성화</button></aside></section>`);
}

function renderCctv() {
  shell("cctv", `<section class="content-grid wide-detail"><article class="panel"><h2>실시간 CCTV mock 화면</h2><div class="cctv-screen"><div class="scan-line"></div><div class="detection-box car">차량</div><div class="detection-box person">사람</div><span class="zone-label">지하주차장 입구 CAM-03</span></div><h2>이벤트 목록</h2>${table(["이벤트ID","구역","유형","시간","상태","위험도"], cctvEvents.map((x,i)=>`<tr data-detail="cam-${i}"><td>${x.id}</td><td>${x.zone}</td><td>${x.type}</td><td>${x.time}</td><td>${badge(x.status)}</td><td>${badge(x.risk)}</td></tr>`))}</article><aside class="detail-panel" id="detail">${cctvDetail(cctvEvents[0])}</aside></section>`);
  bindDetails(cctvEvents, cctvDetail, "cam");
}

function cctvDetail(x) {
  return `<h2>이벤트 상세</h2><p>${x.zone}</p><p>${x.type}</p><p>감지 시간: ${x.time}</p><h2>AI 이미지 분석</h2><p>지하주차장 입구 주정차 금지 구역에서 차량이 15초 이상 감지되었습니다. 차량 통행 방해 가능성이 있으므로 현장 확인 또는 안내 방송이 필요합니다.</p><button class="btn btn-outline" data-toast="확인 처리되었습니다.">확인</button><button class="btn btn-primary" data-toast="처리중으로 변경되었습니다.">처리중</button><button class="btn btn-primary" data-toast="처리 완료되었습니다.">처리 완료</button><button class="btn btn-danger" data-toast="오탐 처리되었습니다.">오탐 처리</button>`;
}

function renderStatistics() {
  shell("statistics", `${kpis([{label:"민원 통계",value:"132건"},{label:"예약 통계",value:"97건"},{label:"관리비 통계",value:"72.4M"},{label:"차량/주차 통계",value:"328대"},{label:"AI 사용 통계",value:"1,482회"},{label:"CCTV 이벤트",value:"64건"}])}<section class="content-grid two"><article class="chart-card"><h2>월별 민원 추이</h2><canvas id="chart1"></canvas></article><article class="chart-card"><h2>카테고리별 민원 비율</h2><canvas id="chart2"></canvas></article><article class="chart-card"><h2>시설별 예약 건수</h2><canvas id="chart3"></canvas></article><article class="chart-card"><h2>AI 모델 사용 비율</h2><canvas id="chart4"></canvas></article></section>`);
}

function bindDetails(data, renderer, prefix) {
  document.querySelectorAll(`[data-detail^="${prefix}-"]`).forEach(row => row.addEventListener("click", () => {
    const idx = Number(row.dataset.detail.split("-").pop());
    document.querySelector("#detail").innerHTML = renderer(data[idx]);
    bindCommonInteractions();
  }));
}

const renderers = { "dashboard": renderDashboard, "ai-monitor": renderAiMonitor, "complaints": renderComplaints, "complaint-detail": renderComplaintDetail, "complaint-analytics": renderComplaintAnalytics, "reservations": renderReservations, "residents-units": renderResidentsUnits, "vehicles": renderVehicles, "maintenance-fees": renderMaintenanceFees, "knowledge-base": renderKnowledgeBase, "cctv": renderCctv, "statistics": renderStatistics };
renderers[document.body.dataset.page]?.();
