setContent(`<section class="panel"><div class="filter-row"><input id="q" placeholder="차량번호, 모델 검색"><select><option>차량 상태 전체</option><option>운행 중</option><option>정비 중</option><option>사고 처리 중</option><option>반납 대기</option></select></div>${table(["차량 번호","제조사","모델명","연식","주행거리","차량 상태","보험사","보험 만료일","배정 고객","상세"], vehicles.map((x,i) => `<tr><td>${x.plate}</td><td>${x.maker}</td><td>${x.model}</td><td>${x.year}</td><td>${x.km.toLocaleString()}km</td><td>${badge(x.status)}</td><td>${x.insurance}</td><td>${x.insuranceEnd}</td><td>${x.customer}</td><td><button class="btn soft" data-vehicle="${i}">상세</button></td></tr>`))}</section>`);
document.querySelectorAll("[data-vehicle]").forEach(btn => btn.onclick = () => {
  const x = vehicles[btn.dataset.vehicle];
  openModal(`${x.plate} 차량 상세`, `${detailGrid([["모델",x.model],["주행거리",`${x.km.toLocaleString()}km`],["보험",x.insurance],["상태",badge(x.status)]])}<h3>연결 계약 정보</h3><p>${contracts.find(c => c.plate === x.plate)?.id}</p><h3>최근 정비 이력</h3><p>타이어 점검, 엔진오일 교체</p><h3>최근 사고 이력</h3><p>${accidents.find(a => a.plate === x.plate)?.type || "사고 이력 없음"}</p>`);
});
bindSearch("#q", "tbody tr");
