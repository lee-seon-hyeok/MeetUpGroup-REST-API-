setContent(`
  ${kpis([
    {label:"오늘 접수 민원", value:"18건", note:"+4"},
    {label:"처리 대기 민원", value:"9건"},
    {label:"사고 접수 건수", value:"6건"},
    {label:"정비 요청 건수", value:"8건"},
    {label:"연체 고객", value:"7명"},
    {label:"AI 자동 처리율", value:"71%"},
    {label:"상담사 이관", value:"11건"},
    {label:"긴급 사고 알림", value:"2건"}
  ])}
  <section class="grid-3">
    <article class="panel"><div class="panel-head"><h2>민원 카테고리별 건수</h2></div>${barChart([{label:"납부",value:32},{label:"사고",value:18},{label:"정비",value:25},{label:"반납",value:14}])}</article>
    <article class="panel"><h2>사고 심각도별 건수</h2>${barChart([{label:"LOW",value:12},{label:"MEDIUM",value:9},{label:"HIGH",value:5},{label:"CRITICAL",value:2}])}</article>
    <article class="panel ai-panel"><h2>AI 처리 / 상담사 이관</h2>${barChart([{label:"AI 처리",value:71},{label:"상담사 이관",value:29}])}</article>
    <article class="panel wide"><h2>월별 민원 추이</h2>${barChart([{label:"1월",value:84},{label:"2월",value:96},{label:"3월",value:110},{label:"4월",value:104},{label:"5월",value:128},{label:"6월",value:132}])}</article>
  </section>
  <section class="grid-2" style="margin-top:14px">
    <article class="panel"><h2>최근 사고 이벤트</h2><div class="mini-list">${savedAccidents().slice(0,4).map(x => `<a class="mini-row" href="accident-detail.html">${x.id} ${x.plate} ${severityBadge(x.severity)}</a>`).join("")}</div></article>
    <article class="panel"><h2>최근 민원 티켓</h2><div class="mini-list">${tickets.slice(0,4).map(x => `<a class="mini-row" href="ticket-detail.html">${x.title} ${badge(x.status)}</a>`).join("")}</div></article>
    <article class="panel"><h2>최근 AI 상담 로그</h2><div class="mini-list">${chatLogs.slice(0,4).map(x => `<span class="mini-row">${x.question} ${badge(x.result)}</span>`).join("")}</div></article>
    <article class="panel"><h2>만료 예정 계약</h2><div class="mini-list">${contracts.filter(x => x.status === "만료 예정").map(x => `<span class="mini-row">${x.id} ${x.customer}</span>`).join("") || "<p class='muted'>만료 예정 계약이 없습니다.</p>"}</div></article>
  </section>`);
