setContent(`${kpis([{label:"오늘 AI 상담",value:"148건"},{label:"RAG 검색 횟수",value:"64회"},{label:"Tool Calling 횟수",value:"53회"},{label:"자동 처리 완료",value:"105건"},{label:"상담사 이관",value:"29건"},{label:"실패 건수",value:"3건"}])}
<section class="grid-3">
  <article class="panel ai-panel"><h2>AI 처리 이벤트 타임라인</h2><div class="timeline">${aiLogs.slice(0,6).map(x => `<div class="timeline-item"><strong>${x.time}</strong><span>${x.customer} ${x.event} ${badge(x.result)}</span></div>`).join("")}</div></article>
  <article class="panel"><h2>Tool Calling 실행 로그</h2>${table(["시간","고객","Tool","결과"], aiLogs.slice(0,7).map(x => `<tr><td>${x.time}</td><td>${x.customer}</td><td>${x.tool}</td><td>${badge(x.result)}</td></tr>`))}</article>
  <article class="panel"><h2>AI 처리 성공률</h2><div class="metric-card"><span>성공률</span><strong>97.9%</strong></div><div class="metric-card"><span>평균 응답 시간</span><strong>1.8초</strong></div><div class="metric-card"><span>RAG 평균 유사도</span><strong>0.86</strong></div></article>
  <article class="panel wide"><h2>RAG / 실패 로그</h2>${table(["시간","고객","이벤트","Tool","결과"], aiLogs.map(x => `<tr><td>${x.time}</td><td>${x.customer}</td><td>${x.event}</td><td>${x.tool}</td><td>${badge(x.result)}</td></tr>`))}</article>
</section>`);
