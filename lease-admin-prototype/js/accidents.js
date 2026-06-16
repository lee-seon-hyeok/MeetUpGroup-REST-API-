if (location.pathname.includes("accident-detail")) {
  const x = savedAccidents()[0];
  setContent(`
    <section class="split-layout">
      <article class="panel danger-panel">
        <h2>사고 기본 정보</h2>
        ${detailGrid([["사고 ID",x.id],["발생 시간",x.time],["차량 번호",x.plate],["고객명",x.customer],["연락처","010-2300-4500"],["위치",x.location],["심각도",severityBadge(x.severity)],["처리 상태",badge(x.status)]])}
        <h3>고객/계약/차량 정보</h3>
        ${detailGrid([["계약 번호","LSE-2026-0101"],["계약 상태","정상"],["차량 모델","현대 아반떼"],["보험사","현대해상"],["월 납입금","620,000원"],["보험 만료일","2026-08-15"]])}
        <h3>AI 사고 분석</h3>
        <p class="hero-note">차량 ${x.plate}에서 ${x.type} 이벤트가 발생했습니다. 고객 ${x.customer}의 계약 상태는 정상이며 사고 위치는 ${x.location}입니다. 심각도는 ${x.severity}로 분류되었고 고객 안전 확인, 보험 접수, 견인 필요 여부 확인을 우선 조치로 권장합니다.</p>
        <p>추천 조치: 고객 안전 확인, 사고 사진 요청, 보험 접수 안내, 정비소 배정</p>
      </article>
      <aside class="panel">
        <h2>처리 체크리스트</h2>
        <div class="progress"><span id="progressBar" style="width:0%"></span></div>
        <div class="check-list" id="checks">${["고객 안전 여부 확인","고객 연락 완료","사고 사진 요청","보험 접수 안내","견인 필요 여부 확인","정비소 배정","대차 필요 여부 확인","사고 처리 결과 등록"].map(t => `<label><input type="checkbox">${t}</label>`).join("")}</div>
        <h3>상태 변경</h3><div class="status-buttons">${["고객 확인 필요","보험 접수 필요","정비 접수 필요","처리 중","완료"].map(s => `<button class="btn soft" data-toast="사고 상태가 ${s}(으)로 변경되었습니다.">${s}</button>`).join("")}</div>
        <h3>관리자 메모</h3><textarea>보험 접수 전 고객 안전 확인 완료 여부 확인</textarea>
      </aside>
    </section>`);
  document.querySelectorAll("#checks input").forEach(cb => cb.addEventListener("change", () => {
    const all = document.querySelectorAll("#checks input").length;
    const done = document.querySelectorAll("#checks input:checked").length;
    document.querySelector("#progressBar").style.width = `${Math.round(done / all * 100)}%`;
  }));
} else {
  setContent(`${kpis([{label:"오늘 사고 이벤트",value:"5건"},{label:"긴급 사고",value:"2건"},{label:"처리 중 사고",value:"4건"},{label:"보험 접수 필요",value:"3건"},{label:"정비소 배정 필요",value:"2건"},{label:"완료 사고",value:"11건"}])}
  <section class="panel"><div class="accident-actions"><button class="btn primary" id="addAccident">시승 사고 테스트 이벤트 생성</button><input id="q" placeholder="차량번호, 고객명 검색"></div><div id="table"></div></section>`);
  function draw() {
    const data = savedAccidents();
    document.querySelector("#table").innerHTML = table(["사고 ID","발생 시간","차량 번호","고객명","위치","심각도","사고 유형","처리 상태","AI 분석","상세"], data.map(x => `<tr><td>${x.id}</td><td>${x.time}</td><td>${x.plate}</td><td>${x.customer}</td><td>${x.location}</td><td>${severityBadge(x.severity)}</td><td>${x.type}</td><td>${badge(x.status)}</td><td>${badge(x.ai)}</td><td><a class="btn soft" href="accident-detail.html">상세</a></td></tr>`));
    bindSearch("#q", "tbody tr");
  }
  draw();
  document.querySelector("#addAccident").onclick = () => {
    document.querySelector("#simulateAccident").click();
    setTimeout(draw, 100);
    setTimeout(draw, 1800);
  };
}
