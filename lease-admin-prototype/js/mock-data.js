const names = ["김민수","이서연","박준호","최하늘","정우진","한지민","오세훈","윤다은","강지훈","송유리","문태영","장소희"];
const plates = ["12가3456","38나0123","45다7888","67로2345","21하9088","58소1122","77부6600","19마4312","33구2480","90어7155"];
const models = ["현대 아반떼","현대 쏘나타","현대 그랜저","기아 K5","기아 쏘렌토","제네시스 G80","테슬라 Model 3","기아 카니발","현대 투싼","BMW 520i"];

const customers = names.map((name, i) => ({
  id: `CUS-${String(i + 1).padStart(4, "0")}`,
  name,
  phone: `010-${2300 + i}-${4500 + i}`,
  email: `customer${i + 1}@lease.ai`,
  contracts: i % 3 + 1,
  status: ["정상","관심 필요","연체","휴면"][i % 4],
  last: ["납부 문의","사고 접수","정비 요청","계약 만료 문의"][i % 4]
}));

const contracts = customers.slice(0, 10).map((c, i) => ({
  id: `LSE-2026-${String(i + 101).padStart(4, "0")}`,
  customer: c.name,
  plate: plates[i],
  model: models[i],
  start: `2024-${String((i % 9) + 1).padStart(2, "0")}-01`,
  end: `2026-${String((i % 9) + 3).padStart(2, "0")}-28`,
  monthly: 620000 + i * 35000,
  limitKm: 60000,
  currentKm: 18000 + i * 5200,
  status: ["정상","연체","사고 처리 중","정비 중","만료 예정","반납 완료","해지"][i % 7]
}));

const vehicles = contracts.map((c, i) => ({
  plate: c.plate,
  maker: c.model.split(" ")[0],
  model: c.model,
  year: 2021 + (i % 5),
  km: c.currentKm,
  status: ["운행 중","정비 중","사고 처리 중","반납 대기","반납 완료"][i % 5],
  insurance: ["현대해상","DB손해보험","삼성화재"][i % 3],
  insuranceEnd: `2026-${String((i % 9) + 3).padStart(2, "0")}-15`,
  customer: c.customer
}));

const payments = Array.from({ length: 15 }, (_, i) => ({
  bill: `BILL-2606-${String(i + 1).padStart(3, "0")}`,
  customer: customers[i % customers.length].name,
  contract: contracts[i % contracts.length].id,
  amount: 590000 + i * 21000,
  due: `2026-06-${String((i % 20) + 5).padStart(2, "0")}`,
  status: ["납부 완료","납부 예정","연체","결제 실패"][i % 4],
  overdue: i % 4 === 2 ? 5 + i : 0
}));

const tickets = Array.from({ length: 12 }, (_, i) => ({
  id: `TCK-${String(i + 1).padStart(4, "0")}`,
  category: ["계약 문의","납부 문의","연체 문의","정비 요청","사고 문의","보험 문의","반납 문의","해지 문의","기타"][i % 9],
  title: ["월 납입금 확인 요청","사고 후 보험 접수 문의","엔진 경고등 점등","계약 만료 반납 절차","연체 안내 재발송 요청"][i % 5],
  customer: customers[i % customers.length].name,
  priority: ["낮음","보통","높음","긴급"][i % 4],
  status: ["접수","AI 답변 완료","상담사 확인 필요","처리 중","고객 확인 대기","완료","보류"][i % 7],
  assignee: ["김관리","이상담","박운영"][i % 3],
  created: `2026-06-${String((i % 15) + 1).padStart(2, "0")}`,
  question: "계약과 차량 상태를 확인한 뒤 가장 빠른 처리 방법을 안내해 주세요.",
  aiAnswer: "고객 계약은 정상이며 관련 RAG 문서와 납부 이력을 확인했습니다. 상담사 검토 후 안내 문자를 발송하는 것이 적절합니다."
}));

const accidents = Array.from({ length: 8 }, (_, i) => ({
  id: `ACC-2606-${String(i + 1).padStart(3, "0")}`,
  time: `2026-06-${String((i % 12) + 3).padStart(2, "0")} ${String(9 + i).padStart(2, "0")}:2${i}`,
  plate: plates[i],
  customer: customers[i].name,
  location: ["서울 강남구 테헤란로","경기 성남시 분당구","인천 송도동","부산 해운대구"][i % 4],
  severity: ["LOW","MEDIUM","HIGH","CRITICAL"][i % 4],
  type: ["후방 추돌","측면 접촉","단독 파손","주차 중 충격"][i % 4],
  status: ["사고 감지","고객 확인 필요","보험 접수 필요","정비 접수 필요","견인 필요","처리 중","완료"][i % 7],
  ai: ["AI 분석 중","AI 분석 완료"][i % 2]
}));

const maintenance = Array.from({ length: 8 }, (_, i) => ({
  id: `MNT-${String(i + 1).padStart(4, "0")}`,
  customer: customers[(i + 2) % customers.length].name,
  plate: plates[(i + 2) % plates.length],
  symptom: ["엔진 경고등 점등","타이어 공기압 경고","브레이크 소음","정기 점검 요청"][i % 4],
  urgency: ["낮음","보통","높음","긴급"][i % 4],
  requested: `2026-06-${String(i + 6).padStart(2, "0")}`,
  status: ["접수","정비소 배정","입고 대기","처리 중","완료"][i % 5],
  assignee: ["정비팀 A","정비팀 B","외부 제휴"][i % 3]
}));

const chatLogs = Array.from({ length: 10 }, (_, i) => ({
  id: `CHAT-${String(i + 1).padStart(4, "0")}`,
  customer: customers[i].name,
  question: ["월 납입금이 얼마인가요?","사고가 났는데 무엇부터 해야 하나요?","반납 시 체크 항목을 알려주세요.","정비 예약을 잡고 싶습니다."][i % 4],
  intent: ["납부 문의","사고 문의","반납 문의","정비 요청"][i % 4],
  tools: ["getPaymentStatus","createAccidentCase","getReturnChecklist","createMaintenanceRequest"][i % 4],
  docs: ["납부/연체 안내","사고 처리 매뉴얼","반납 기준 문서","정비 접수 가이드"][i % 4],
  result: ["상담사 연결","자동 처리 완료","티켓 생성","추가 확인 필요"][i % 4],
  time: `14:${String(10 + i * 3).padStart(2, "0")}`
}));

const ragDocuments = Array.from({ length: 8 }, (_, i) => ({
  id: `DOC-${String(i + 1).padStart(4, "0")}`,
  name: ["계약 약관","사고 처리 절차","보험 접수 안내","정비 제휴 매뉴얼","반납 체크리스트","납부/연체 안내","FAQ","해지 정책"][i],
  category: ["계약 약관","사고 처리","보험","정비","반납","납부","FAQ","계약 약관"][i],
  chunks: 24 + i * 8,
  status: ["업로드 완료","청크 분할 완료","임베딩 완료","실패"][i % 4],
  uploaded: `2026-06-${String(i + 1).padStart(2, "0")}`
}));

const aiLogs = Array.from({ length: 15 }, (_, i) => ({
  time: `14:${String(20 + i).padStart(2, "0")}`,
  customer: customers[i % customers.length].name,
  event: ["의도 분석","RAG 검색","Tool Calling","AI 답변 생성","자동 티켓 생성"][i % 5],
  tool: ["getPaymentStatus","createMaintenanceRequest","createAccidentCase","searchRagDocument"][i % 4],
  result: i % 7 === 0 ? "실패" : "성공"
}));
