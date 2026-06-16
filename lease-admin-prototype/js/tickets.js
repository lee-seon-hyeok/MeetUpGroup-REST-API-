if (location.pathname.includes("ticket-detail")) {
  const x = tickets[0];
  setContent(`
    <section class="split-layout">
      <article class="panel">
        <h2>${x.id} 상세</h2>
        ${detailGrid([["고객",x.customer],["카테고리",x.category],["긴급도",badge(x.priority)],["상태",badge(x.status)]])}
        <h3>고객 질문 원문</h3><p class="hero-note">${x.question}</p>
        <h3>AI 답변</h3><p>${x.aiAnswer}</p>
        <h3>AI 상담 요약</h3><p>계약, 납부, 차량 상태를 함께 조회했으며 상담사 확인 후 고객 답변을 발송하는 흐름입니다.</p>
        <h3>감정 / 분류 / 호출 Tool</h3><p>감정: 중립, 분류: ${x.category}, 긴급도: ${x.priority}, Tool: getPaymentStatus, 참조 RAG: 납부/연체 안내</p>
      </article>
      <aside class="panel">
        <h2>상담사 처리</h2>
        <label>상태 변경</label><div class="status-buttons">${["접수","처리 중","고객 확인 대기","완료","보류"].map(s => `<button class="btn soft" data-toast="티켓 상태가 ${s}(으)로 변경되었습니다.">${s}</button>`).join("")}</div>
        <h3>고객 답변 초안</h3><textarea>${x.customer} 고객님, 문의하신 내용을 확인했습니다. 계약 정보와 차량 상태 확인 후 필요한 조치를 안내드리겠습니다.</textarea>
        <h3>상담사 메모</h3><textarea>후속 확인 필요</textarea>
      </aside>
    </section>`);
} else {
  setContent(`<section class="panel"><div class="filter-row"><input id="q" placeholder="제목, 고객명 검색"><select><option>상태 전체</option><option>접수</option><option>상담사 확인 필요</option><option>완료</option></select></div>${table(["티켓 번호","카테고리","제목","고객명","긴급도","상태","담당자","생성일","상세"], tickets.map(x => `<tr><td>${x.id}</td><td>${x.category}</td><td>${x.title}</td><td>${x.customer}</td><td>${badge(x.priority)}</td><td>${badge(x.status)}</td><td>${x.assignee}</td><td>${x.created}</td><td><a class="btn soft" href="ticket-detail.html">상세</a></td></tr>`))}</section>`);
  bindSearch("#q", "tbody tr");
}
