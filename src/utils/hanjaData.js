// 한자 매핑 데이터

export const elementHanja = {
  '목': '木',
  '화': '火',
  '토': '土',
  '금': '金',
  '수': '水'
};

export const pillarHanja = {
  '년주': '年柱',
  '월주': '月柱',
  '일주': '日柱',
  '시주': '時柱'
};

export const tenGodsHanja = {
  '비견': '比肩',
  '겁재': '劫財',
  '식신': '食神',
  '상관': '傷官',
  '편재': '偏財',
  '정재': '正財',
  '편관': '偏官',
  '정관': '正官',
  '편인': '偏印',
  '정인': '正印'
};

// 오행별 색상
export const elementColors = {
  '목': '#4ade80', // 녹색 (나무)
  '화': '#f87171', // 빨강 (불)
  '토': '#fbbf24', // 노랑 (흙)
  '금': '#94a3b8', // 회색 (금속)
  '수': '#60a5fa'  // 파랑 (물)
};

// 천간의 오행
export const heavenlyStemElements = {
  '갑': '목',
  '을': '목',
  '병': '화',
  '정': '화',
  '무': '토',
  '기': '토',
  '경': '금',
  '신': '금',
  '임': '수',
  '계': '수'
};

// 지지의 오행
export const earthlyBranchElements = {
  '자': '수',
  '축': '토',
  '인': '목',
  '묘': '목',
  '진': '토',
  '사': '화',
  '오': '화',
  '미': '토',
  '신': '금',
  '유': '금',
  '술': '토',
  '해': '수'
};

// 오행 확인 함수
export const getElementColor = (char) => {
  const element = heavenlyStemElements[char] || earthlyBranchElements[char];
  return element ? elementColors[element] : '#94a3b8';
};
