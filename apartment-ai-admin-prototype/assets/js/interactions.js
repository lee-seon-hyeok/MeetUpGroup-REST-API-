function showToast(message) {
  const old = document.querySelector(".toast");
  if (old) old.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 20);
  setTimeout(() => toast.remove(), 2200);
}

function bindCommonInteractions() {
  document.querySelectorAll("[data-toast]").forEach(btn => btn.addEventListener("click", () => showToast(btn.dataset.toast)));
  document.querySelectorAll("[data-status-target]").forEach(btn => btn.addEventListener("click", () => {
    const badge = document.querySelector(btn.dataset.statusTarget);
    if (badge) {
      badge.textContent = btn.dataset.nextStatus;
      badge.className = `status-badge ${statusClass(btn.dataset.nextStatus)}`;
    }
    showToast("상태가 변경되었습니다.");
  }));
  document.querySelectorAll("[data-copy]").forEach(btn => btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.copy);
    navigator.clipboard?.writeText(target?.value || target?.textContent || "");
    showToast("AI 답변 초안이 복사되었습니다.");
  }));
  document.querySelectorAll("[data-rag-search]").forEach(btn => btn.addEventListener("click", () => {
    const box = document.querySelector("#rag-result");
    if (box) box.innerHTML = `<div class="result-item"><b>주차장 운영 규정</b><span>유사도 0.92</span><p>방문차량은 입주민 앱 승인 후 지정 시간 내 출입할 수 있습니다.</p></div><div class="result-item"><b>생활 규정집</b><span>유사도 0.87</span><p>반복 민원은 관리사무소 현장 확인 후 공지 대상이 됩니다.</p></div>`;
    showToast("mock 검색 결과를 표시했습니다.");
  }));
}

function statusClass(status) {
  if (["긴급", "반려", "연체", "차단", "미확인", "실패"].includes(status)) return "danger";
  if (["접수", "처리중", "승인대기", "미납", "처리중"].includes(status)) return "warning";
  if (["완료", "승인완료", "완납", "등록", "확인", "처리완료", "사용", "정상 처리"].includes(status)) return "success";
  return "neutral";
}
