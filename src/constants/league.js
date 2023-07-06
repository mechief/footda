export const SERVICE_LEAGUES = new Map([
  // 리그
  [39, {
    name: 'Premier League',
    nameKr: '프리미어리그',
    type: 'league',
    region: 'europe',
    color: '#3d195b',
  }],
  [140, {
    name: 'La Liga',
    nameKr: '라 리가',
    type: 'league',
    region: 'europe',
    color: '#ee8707',
  }],
  [135, {
    name: 'Serie A',
    nameKr: '세리에 A',
    type: 'league',
    region: 'europe',
    color: '#024494',
  }],
  [78, {
    name: 'Bundesliga',
    nameKr: '분데스리가',
    type: 'league',
    region: 'europe',
    color: '#d3010c',
  }],
  [61, {
    name: 'Ligue 1',
    nameKr: '리그 앙',
    type: 'league',
    region: 'europe',
    color: '#dae025',
  }],
  [292, {
    name: 'K League 1',
    nameKr: 'K리그1',
    type: 'league',
    region: 'asia',
    color: '#182241',
  }],
  [293, {
    name: 'K League 2',
    nameKr: 'K리그2',
    type: 'league',
    region: 'asia',
    color: '#182241',
  }],
  // 대륙 클럽 대항전
  [2, {
    name: 'UEFA Champions League',
    nameKr: 'UEFA 챔피언스 리그',
    nameShort: 'UCL',
    type: 'continental',
    region: 'europe',
  }],
  [3, {
    name: 'UEFA Europa League',
    nameKr: '유로파 리그',
    nameShort: 'UEL',
    type: 'continental',
    region: 'europe',
  }],
  [848, {
    name: 'UEFA Europa Conference League',
    nameKr: '유로파 컨퍼런스 리그',
    nameShort: 'UECL',
    type: 'continental',
    region: 'europe',
  }],
  [17, {
    name: 'AFC Champions League',
    nameKr: 'AFC 챔피언스 리그',
    nameShort: 'ACL',
    type: 'continental',
    region: 'asia',
  }],
  // [531, {
  //   name: 'UEFA Super Cup',
  //   nameKr: 'UEFA 슈퍼컵',
  //   type: 'cup',
  // }],
  // 잉글랜드 컵
  [45, {
    name: 'FA Cup',
    nameKr: 'FA컵',
    type: 'cup',
    region: 'europe',
  }],
  [48, {
    name: 'League Cup',
    nameKr: '잉글랜드 리그 컵',
    nameShort: 'EFL컵',
    type: 'cup',
    region: 'europe',
  }],
  // [528, {
  //   name: 'Community Shield',
  //   nameKr: '커뮤니티 쉴드',
  //   type: 'cup',
  // }],
  // 프랑스 컵
  [65, {
    name: 'Coupe de la Ligue',
    nameKr: '프랑스 리그 컵',
    type: 'cup',
    region: 'europe',
  }],
  [66, {
    name: 'Coupe de France',
    nameKr: '쿠프 드 프랑스',
    type: 'cup',
    region: 'europe',
  }],
  // [526, {
  //   name: 'Trophée des champions',
  //   nameKr: '트로페 데 샹피옹',
  //   type: 'cup',
  // }],
  // 스페인 컵
  [143, {
    name: 'Copa del Rey',
    nameKr: '코파 델 레이',
    type: 'cup',
    region: 'europe',
  }],
  // [556, {
  //   name: 'Super Cup',
  //   nameKr: '스페인 슈퍼컵',
  //   type: 'cup',
  // }],
  // 이탈리아 컵
  [137, {
    name: 'Coppa Italia',
    nameKr: '코파 이탈리아',
    type: 'cup',
    region: 'europe',
  }],
  // [547, {
  //   name: 'Super Cup',
  //   nameKr: '이탈리아 슈퍼컵',
  //   type: 'cup',
  // }],
  // 독일 컵
  [81, {
    name: 'DFB Pokal',
    nameKr: 'DFB 포칼컵',
    type: 'cup',
    region: 'europe',
  }],
  // [529, {
  //   name: 'Super Cup',
  //   nameKr: '독일 슈퍼컵',
  //   type: 'cup',
  // }],
  // 대한민국 컵
  [294, {
    name: 'FA Cup',
    nameKr: 'FA컵 (KFA)',
    type: 'cup',
    region: 'asia',
  }],
])

// 승격, 강등, 유럽대항전 규칙
export const LEAGUE_RULES = {
  // 프리미어리그
  '39': [
    {
      type: 'demotion',
      detail: null,
      ranks: [18, 19, 20],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3, 4],
      league: 2,
    },
    {
      type: 'continental',
      detail: 'EuropaLeague',
      ranks: [5],
      league: 3,
    },
    {
      type: 'continental',
      detail: 'ConferenceLeague',
      ranks: [6],
      league: 848,
    },
  ],
  // 리그 1
  '61': [
    {
      type: 'demotion',
      detail: null,
      ranks: [18, 19, 20],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3],
      league: 2,
    },
    {
      type: 'continental',
      detail: 'EuropaLeague',
      ranks: [4],
      league: 3,
    },
    {
      type: 'continental',
      detail: 'ConferenceLeague',
      ranks: [5],
      league: 848,
    },
  ],
  // 분데스리가
  '78': [ 
    {
      type: 'demotion',
      detail: null,
      ranks: [16, 17, 18],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3, 4],
      league: 2,
    },
    {
      type: 'continental',
      detail: 'EuropaLeague',
      ranks: [5],
      league: 3,
    },
    {
      type: 'continental',
      detail: 'ConferenceLeague',
      ranks: [6],
      league: 848,
    },
  ],
  // 세리에 A
  '135': [
    {
      type: 'demotion',
      detail: null,
      ranks: [18, 19, 20],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3, 4],
      league: 2,
    },
    {
      type: 'continental',
      detail: 'EuropaLeague',
      ranks: [5],
      league: 3,
    },
    {
      type: 'continental',
      detail: 'ConferenceLeague',
      ranks: [6],
      league: 848,
    },
  ],
  // 라리가
  '140': [
    {
      type: 'demotion',
      detail: null,
      ranks: [18, 19, 20],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3, 4],
      league: 2,
    },
    {
      type: 'continental',
      detail: 'EuropaLeague',
      ranks: [5],
      league: 3,
    },
    {
      type: 'continental',
      detail: 'ConferenceLeague',
      ranks: [6],
      league: 848,
    },
  ],
  // K리그 1
  '292': [
    {
      type: 'demotion',
      detail: null,
      ranks: [12],
    },
    {
      type: 'demotionPlayoffs',
      detail: null,
      ranks: [10, 11],
    },
    {
      type: 'continental',
      detail: 'ChampionsLeague',
      ranks: [1, 2, 3],
      league: 17,
    },
  ],
  // K리그 2
  '293': [
    {
      type: 'promotion',
      detail: null,
      ranks: [1],
    },
    {
      type: 'promotionPlayoffs',
      detail: null,
      ranks: [2, 3, 4, 5],
    },
  ],
}