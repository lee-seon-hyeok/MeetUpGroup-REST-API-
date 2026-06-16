setContent(`<section class="panel"><div class="filter-row"><input id="q" placeholder="계약 번호 또는 고객명 검색"><select id="status"><option value="">계약 상태 전체</option><option>정상</option><option>연체</option><option>사고 처리 중</option><option>정비 중</option><option>만료 예정</option><option>반납 완료</option><option>해지</option></select><button class="btn soft" data-toast="만료 예정 계약만 표시하는 필터입니다.">만료 예정</button></div><div id="table"></div></section>`);
function drawContracts() {
  const s = document.querySelector("#status").value;
  const data = s ? contracts.filter(x => x.status === s) : contracts;
  document.querySelector("#table").innerHTML = table(["계약 번호","고객명","차량 번호","차량 모델","시작일","종료일","월 납입금","약정 km","현재 km","상태"], data.map((x,i) => `<tr class="clickable" data-contract="${i}"><td>${x.id}</td><td>${x.customer}</td><td>${x.plate}</td><td>${x.model}</td><td>${x.start}</td><td>${x.end}</td><td>${money(x.monthly)}</td><td>${x.limitKm.toLocaleString()}</td><td>${x.currentKm.toLocaleString()}</td><td>${badge(x.status)}</td></tr>`));
  document.querySelectorAll("[data-contract]").forEach(row => row.onclick = () => {
    const x = data[row.dataset.contract];
    openModal(`${x.id} 계약 상세`, `${detailGrid([["고객",x.customer],["차량",`${x.plate} ${x.model}`],["월 납입금",money(x.monthly)],["계약 상태",badge(x.status)]])}<h3>납부 현황</h3><p>최근 6개월 납부 이력 정상, 연체 알림 1회</p><h3>주행거리 현황</h3><div class="progress"><span style="width:${Math.min(100, Math.round(x.currentKm / x.limitKm * 100))}%"></span></div><h3>AI 계약 요약</h3><p>${x.customer} 고객은 계약 만료까지 42일 남았으며 현재 약정 주행거리 대비 ${Math.round(x.currentKm / x.limitKm * 100)}%를 사용했습니다. 만료 전 반납 안내가 필요한 상태입니다.</p>`);
  });
  bindSearch("#q", "#table tbody tr");
}
drawContracts();
document.querySelector("#status").addEventListener("change", drawContracts);
