setContent(`<section class="panel"><div class="filter-row"><input id="q" placeholder="고객명, 차량번호 검색"><select><option>처리 상태 전체</option><option>접수</option><option>정비소 배정</option><option>완료</option></select></div>${table(["요청 ID","고객명","차량 번호","증상","AI 긴급도","요청일","처리 상태","담당자","상세"], maintenance.map((x,i) => `<tr><td>${x.id}</td><td>${x.customer}</td><td>${x.plate}</td><td>${x.symptom}</td><td>${badge(x.urgency)}</td><td>${x.requested}</td><td>${badge(x.status)}</td><td>${x.assignee}</td><td><button class="btn soft" data-mnt="${i}">상세</button></td></tr>`))}</section>`);
document.querySelectorAll("[data-mnt]").forEach(btn => btn.onclick = () => {
  const x = maintenance[btn.dataset.mnt];
  openModal(`${x.id} 정비 요청`, `${detailGrid([["고객",x.customer],["차량",x.plate],["증상",x.symptom],["긴급도",badge(x.urgency)]])}<h3>AI 진단 요약</h3><p>엔진 경고등 점등은 주행 지속 시 위험 가능성이 있으므로 빠른 정비 입고가 필요합니다. 고객에게 운행 최소화 안내 후 제휴 정비소 배정을 권장합니다.</p><h3>상태 변경</h3><div class="status-buttons">${["접수","정비소 배정","입고 대기","처리 중","완료"].map(s => `<button class="btn soft" data-toast="정비 요청 상태가 ${s}(으)로 변경되었습니다.">${s}</button>`).join("")}</div>`);
});
bindSearch("#q", "tbody tr");
