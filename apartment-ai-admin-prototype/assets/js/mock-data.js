const complaints = [
  { id: "C-2026-001", category: "주차", title: "지하주차장 B2 이중주차 반복", unit: "101동 1203호", priority: "긴급", status: "접수", date: "2026-06-17 09:12", assignee: "생활지원팀", text: "B2 구역에 같은 차량이 반복적으로 통로를 막고 있어 출근 시간마다 불편합니다." },
  { id: "C-2026-002", category: "소음", title: "야간 층간소음", unit: "102동 804호", priority: "보통", status: "처리중", date: "2026-06-17 08:40", assignee: "민원팀", text: "밤 11시 이후 발걸음과 가구 끄는 소리가 계속 들립니다." },
  { id: "C-2026-003", category: "시설 고장", title: "엘리베이터 문 닫힘 지연", unit: "103동 1501호", priority: "긴급", status: "처리중", date: "2026-06-16 18:20", assignee: "시설팀", text: "103동 2호기 문이 닫히지 않고 경고음이 자주 발생합니다." },
  { id: "C-2026-004", category: "쓰레기", title: "분리수거장 악취", unit: "104동 603호", priority: "보통", status: "완료", date: "2026-06-16 13:04", assignee: "환경팀", text: "분리수거장 주변 악취가 심해 추가 청소가 필요합니다." },
  { id: "C-2026-005", category: "방문차량", title: "방문차량 승인 지연", unit: "105동 2102호", priority: "낮음", status: "접수", date: "2026-06-16 10:11", assignee: "보안팀", text: "방문차량 등록 요청 후 경비실 확인이 늦습니다." },
  { id: "C-2026-006", category: "누수", title: "욕실 천장 누수 의심", unit: "101동 707호", priority: "긴급", status: "접수", date: "2026-06-15 16:42", assignee: "시설팀", text: "욕실 천장에 물자국이 생기고 있습니다." },
  { id: "C-2026-007", category: "관리비", title: "수도요금 증가 문의", unit: "102동 1105호", priority: "보통", status: "완료", date: "2026-06-15 11:18", assignee: "관리비팀", text: "지난달보다 수도요금이 크게 올라 상세 내역 확인을 요청합니다." },
  { id: "C-2026-008", category: "흡연", title: "비상계단 흡연", unit: "103동 302호", priority: "보통", status: "처리중", date: "2026-06-14 21:35", assignee: "보안팀", text: "비상계단에서 담배 냄새가 계속 납니다." },
  { id: "C-2026-009", category: "조경", title: "단지 산책로 조명 고장", unit: "104동 1502호", priority: "보통", status: "접수", date: "2026-06-14 19:08", assignee: "시설팀", text: "산책로 조명 2개가 꺼져 야간 보행이 불편합니다." },
  { id: "C-2026-010", category: "커뮤니티", title: "독서실 냉방 약함", unit: "105동 901호", priority: "낮음", status: "완료", date: "2026-06-13 14:00", assignee: "커뮤니티팀", text: "독서실 냉방이 약해 장시간 이용이 어렵습니다." }
];

const reservations = [
  { id: "R-1001", facility: "이사 엘리베이터", user: "김민준", unit: "101동 1203호", time: "2026-06-18 09:00", purpose: "입주 이사", status: "승인대기", requested: "2026-06-17" },
  { id: "R-1002", facility: "커뮤니티룸", user: "이지아", unit: "102동 804호", time: "2026-06-19 19:00", purpose: "입주민 모임", status: "승인완료", requested: "2026-06-16" },
  { id: "R-1003", facility: "독서실 스터디룸", user: "박서준", unit: "103동 1501호", time: "2026-06-18 14:00", purpose: "학습", status: "승인대기", requested: "2026-06-16" },
  { id: "R-1004", facility: "방문 차량 등록", user: "최유진", unit: "104동 603호", time: "2026-06-17 13:00", purpose: "가족 방문", status: "승인완료", requested: "2026-06-15" },
  { id: "R-1005", facility: "커뮤니티룸", user: "정도윤", unit: "105동 2102호", time: "2026-06-20 10:00", purpose: "소모임", status: "반려", requested: "2026-06-15" },
  { id: "R-1006", facility: "이사 엘리베이터", user: "한지후", unit: "101동 707호", time: "2026-06-21 08:30", purpose: "가구 반입", status: "취소", requested: "2026-06-14" },
  { id: "R-1007", facility: "독서실 스터디룸", user: "오하린", unit: "102동 1105호", time: "2026-06-18 20:00", purpose: "그룹 스터디", status: "승인대기", requested: "2026-06-17" },
  { id: "R-1008", facility: "방문 차량 등록", user: "문태오", unit: "103동 302호", time: "2026-06-18 11:00", purpose: "방문 진료", status: "승인완료", requested: "2026-06-17" },
  { id: "R-1009", facility: "커뮤니티룸", user: "서은채", unit: "104동 1502호", time: "2026-06-22 16:00", purpose: "회의", status: "승인대기", requested: "2026-06-16" },
  { id: "R-1010", facility: "독서실 스터디룸", user: "강시우", unit: "105동 901호", time: "2026-06-19 09:00", purpose: "시험 준비", status: "승인완료", requested: "2026-06-15" }
];

const residents = [
  { name: "김민준", dong: "101동", unit: "1203호", phone: "010-1234-2103", account: "정상", complaints: 4, reservations: 2, fee: "미납" },
  { name: "이지아", dong: "102동", unit: "804호", phone: "010-2345-0804", account: "정상", complaints: 2, reservations: 3, fee: "완납" },
  { name: "박서준", dong: "103동", unit: "1501호", phone: "010-3456-1501", account: "정상", complaints: 3, reservations: 1, fee: "완납" },
  { name: "최유진", dong: "104동", unit: "603호", phone: "010-4567-0603", account: "정상", complaints: 1, reservations: 4, fee: "완납" },
  { name: "정도윤", dong: "105동", unit: "2102호", phone: "010-5678-2102", account: "확인필요", complaints: 2, reservations: 1, fee: "연체" },
  { name: "한지후", dong: "101동", unit: "707호", phone: "010-6789-0707", account: "정상", complaints: 1, reservations: 1, fee: "완납" },
  { name: "오하린", dong: "102동", unit: "1105호", phone: "010-7890-1105", account: "정상", complaints: 1, reservations: 2, fee: "미납" },
  { name: "문태오", dong: "103동", unit: "302호", phone: "010-8901-0302", account: "정상", complaints: 2, reservations: 1, fee: "완납" },
  { name: "서은채", dong: "104동", unit: "1502호", phone: "010-9012-1502", account: "정상", complaints: 1, reservations: 1, fee: "완납" },
  { name: "강시우", dong: "105동", unit: "901호", phone: "010-0123-0901", account: "정상", complaints: 1, reservations: 3, fee: "완납" }
];

const units = residents.map((r, i) => ({ dong: r.dong, unit: r.unit, resident: r.name, vehicles: (i % 3) + 1, unpaid: r.fee !== "완납" ? "있음" : "없음", complaints: r.complaints, reservations: r.reservations }));

const vehicles = [
  { no: "12가 3456", type: "입주민", unit: "101동 1203호", owner: "김민준", status: "등록", date: "2025-02-11", note: "지하 B2" },
  { no: "34나 7890", type: "방문", unit: "104동 603호", owner: "방문객", status: "방문", date: "2026-06-17", note: "18:00 만료" },
  { no: "56다 1122", type: "입주민", unit: "103동 1501호", owner: "박서준", status: "등록", date: "2024-11-08", note: "전기차" },
  { no: "78라 3344", type: "방문", unit: "105동 2102호", owner: "방문객", status: "승인대기", date: "2026-06-17", note: "경비실 확인" },
  { no: "90마 5566", type: "미등록", unit: "-", owner: "미확인", status: "차단", date: "2026-06-17", note: "CCTV 감지" },
  { no: "11바 7788", type: "입주민", unit: "102동 804호", owner: "이지아", status: "등록", date: "2023-07-23", note: "정상" },
  { no: "22사 9900", type: "방문", unit: "103동 302호", owner: "방문객", status: "만료", date: "2026-06-16", note: "출차 확인 필요" },
  { no: "33아 1010", type: "입주민", unit: "104동 1502호", owner: "서은채", status: "등록", date: "2025-09-01", note: "정상" },
  { no: "44자 2020", type: "입주민", unit: "105동 901호", owner: "강시우", status: "등록", date: "2025-12-15", note: "정상" },
  { no: "55차 3030", type: "방문", unit: "101동 707호", owner: "방문객", status: "방문", date: "2026-06-17", note: "배송" }
];

const maintenanceFees = residents.map((r, i) => ({ unit: `${r.dong} ${r.unit}`, resident: r.name, month: "2026-06", total: 238000 + i * 17000, status: r.fee, due: "2026-06-30", diff: i % 2 ? "+18,000원" : "+48,000원" }));

const documents = [
  "생활 규정집", "주차장 운영 규정", "커뮤니티 시설 예약 안내", "이사 및 공사 안내", "관리비 산정 기준",
  "분리수거 배출 기준", "공지사항 작성 가이드", "FAQ 모음", "방문차량 등록 규정", "CCTV 운영 방침"
].map((name, i) => ({ name, category: ["생활 규정", "주차 규정", "시설 예약", "이사/공사", "관리비", "쓰레기 처리", "공지사항", "FAQ"][i % 8], type: i % 2 ? "PDF" : "DOCX", chunks: 18 + i * 4, embedding: i === 3 ? "처리중" : "완료", date: `2026-06-${String(7 + i).padStart(2, "0")}`, active: i === 6 ? "미사용" : "사용" }));

const aiLogs = [
  "RAG_QA", "COMPLAINT_CLASSIFICATION", "RESERVATION_TOOL_CALL", "VEHICLE_REGISTER", "MAINTENANCE_FEE_QUERY",
  "CCTV_IMAGE_SUMMARY", "RAG_QA", "COMPLAINT_CLASSIFICATION", "RESERVATION_TOOL_CALL", "CCTV_IMAGE_SUMMARY"
].map((type, i) => ({ time: `2026-06-17 ${String(9 + i).padStart(2, "0")}:2${i}`, user: residents[i].name, type, model: i % 3 ? "OpenAI GPT" : "KURE-v1 + GPT", fallback: i === 4 ? "발생" : "없음", latency: `${0.8 + i / 10}s`, result: i === 4 ? "부분 처리" : "정상 처리", question: `${type} 요청을 처리해 주세요.`, intent: `${type} intent 감지`, docs: "생활 규정집, 주차장 운영 규정", tool: i % 2 ? "예약 승인 API mock" : "문서 검색 mock", answer: "요청 내용을 분석하여 관리자 검토가 필요한 항목을 표시했습니다.", error: i === 4 ? "외부 모델 응답 지연" : "-" }));

const cctvEvents = [
  { id: "E-001", zone: "지하주차장 입구", type: "주정차 금지 구역 차량 감지", time: "14:22", status: "미확인", risk: "긴급" },
  { id: "E-002", zone: "출입 제한 구역", type: "사람 감지", time: "13:55", status: "처리중", risk: "긴급" },
  { id: "E-003", zone: "지하주차장 B2", type: "장기 체류 감지", time: "12:40", status: "확인", risk: "보통" },
  { id: "E-004", zone: "정문", type: "미등록 차량 의심", time: "11:18", status: "미확인", risk: "보통" },
  { id: "E-005", zone: "분리수거장", type: "심야 이동 감지", time: "00:42", status: "처리완료", risk: "낮음" },
  { id: "E-006", zone: "놀이터", type: "야간 출입 감지", time: "23:11", status: "확인", risk: "보통" },
  { id: "E-007", zone: "B1 램프", type: "역주행 의심", time: "18:03", status: "처리중", risk: "긴급" },
  { id: "E-008", zone: "후문", type: "차량 정차 감지", time: "17:28", status: "확인", risk: "낮음" },
  { id: "E-009", zone: "커뮤니티센터", type: "출입 제한 시간 감지", time: "22:07", status: "미확인", risk: "보통" },
  { id: "E-010", zone: "지하주차장 B3", type: "미등록 차량 의심", time: "15:12", status: "확인", risk: "보통" }
];

const complaintKeywords = [
  { word: "주차", weight: 5 }, { word: "소음", weight: 4 }, { word: "엘리베이터", weight: 3 }, { word: "누수", weight: 3 },
  { word: "분리수거", weight: 3 }, { word: "방문차량", weight: 2 }, { word: "흡연", weight: 2 }, { word: "악취", weight: 2 },
  { word: "고장", weight: 4 }, { word: "야간", weight: 2 }, { word: "지하주차장", weight: 5 }, { word: "관리비", weight: 3 }
];

const complaintStats = [
  { label: "주차 민원", value: 42 }, { label: "소음 민원", value: 31 }, { label: "시설 고장", value: 24 }, { label: "쓰레기 처리", value: 18 }, { label: "누수/하자", value: 9 }
];
