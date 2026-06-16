setContent(`
  <section class="panel">
    <div class="filter-row"><input id="q" placeholder="고객명 검색"><select id="status"><option value="">고객 상태 전체</option><option>정상</option><option>관심 필요</option><option>연체</option><option>휴면</option></select><select><option>계약 상태 전체</option><option>정상</option><option>만료 예정</option><option>해지</option></select></div>
    <div id="table"></div>
  </section>`);

function renderCustomers() {
  const status = document.querySelector("#status").value;
  const data = status ? customers.filter(x => x.status === status) : customers;
  document.querySelector("#table").innerHTML = table(["고객 ID","고객명","연락처","이메일","계약 수","고객 상태","최근 문의","상세"], data.map((x,i) => `
    <tr><td>${x.id}</td><td>${x.name}</td><td>${x.phone}</td><td>${x.email}</td><td>${x.contracts}</td><td>${badge(x.status)}</td><td>${x.last}</td><td><button class="btn soft" data-customer="${i}">상세</button></td></tr>`));
  document.querySelectorAll("[data-customer]").forEach(btn => btn.onclick = () => {
    const x = data[btn.dataset.customer];
    openModal(`${x.name} 고객 상세`, `${detailGrid([["고객 ID",x.id],["연락처",x.phone],["이메일",x.email],["상태",badge(x.status)]])}<h3>연결된 계약</h3><p>${contracts.filter(c => c.customer === x.name).map(c => c.id).join(", ") || "없음"}</p><h3>최근 상담 로그</h3><p>${x.last}</p><h3>최근 민원 티켓</h3><p>${tickets.find(t => t.customer === x.name)?.title || "최근 티켓 없음"}</p>`);
  });
  bindSearch("#q", "#table tbody tr");
}
renderCustomers();
document.querySelector("#status").addEventListener("change", renderCustomers);
