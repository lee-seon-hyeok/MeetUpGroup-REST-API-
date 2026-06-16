setContent(`<section class="panel"><div class="filter-row"><input id="q" placeholder="고객명 또는 계약 번호 검색"><select><option>납부 상태 전체</option><option>납부 완료</option><option>연체</option><option>결제 실패</option></select></div>${table(["청구 번호","고객명","계약 번호","월 납입금","납부 예정일","납부 상태","연체 일수","조치"], payments.map((x,i) => `<tr><td>${x.bill}</td><td>${x.customer}</td><td>${x.contract}</td><td>${money(x.amount)}</td><td>${x.due}</td><td>${badge(x.status)}</td><td>${x.overdue}</td><td><button class="btn soft" data-payment="${i}">조치</button></td></tr>`))}</section>`);
document.querySelectorAll("[data-payment]").forEach(btn => btn.onclick = () => {
  const x = payments[btn.dataset.payment];
  openModal(`${x.bill} 납부 조치`, `${detailGrid([["고객",x.customer],["계약",x.contract],["금액",money(x.amount)],["상태",badge(x.status)]])}<h3>연체 안내 메시지 초안</h3><textarea>${x.customer} 고객님, 차량 리스 월 납입금 확인이 필요합니다. 납부 예정일과 결제 수단을 확인해 주세요.</textarea><h3>AI 추천 조치</h3><p>${x.overdue}일 연체 상태입니다. 고객에게 납부 안내를 발송하고, 7일 이상 연체 시 상담사 확인 티켓 생성을 권장합니다.</p><button class="btn primary" data-toast="상담 티켓이 생성되었습니다.">상담 티켓 생성</button>`);
});
bindSearch("#q", "tbody tr");
