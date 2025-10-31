# 🔮 사주 풀이 프론트엔드

> Claude AI 기반 사주팔자 계산 및 해석 서비스 프론트엔드

## ✨ 주요 기능

- 📅 **생년월일시 입력**: 사용자 친화적인 폼 인터페이스
- 🔮 **사주팔자 표시**: 년주, 월주, 일주, 시주 시각화
- 🔥 **오행 분석**: 목화토금수 오행 분포 표시
- ⭐ **십성 분석**: 십성(비견, 겁재, 식신 등) 분포 표시
- 🤖 **AI 해석**: Claude AI의 자연스럽고 이해하기 쉬운 해석
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ⚡ **실시간 분석**: 빠른 응답 속도

## 🛠 기술 스택

- **Frontend**: React 19.1
- **Build Tool**: Vite 7.1
- **Styling**: CSS3 (모던 그라디언트 디자인)
- **Font**: Pretendard (한글 최적화)
- **API**: RESTful API (FastAPI 백엔드)

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd sajufrontend
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

`.env` 파일을 편집하여 백엔드 API URL을 설정합니다:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속합니다.

### 5. 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 🎯 사용 방법

1. **생년월일시 입력**
   - 출생 연도, 월, 일, 시, 분 입력
   - 성별 선택 (남성/여성)
   - 질문 입력 (선택사항)

2. **사주 풀이 시작**
   - "사주 풀이 시작" 버튼 클릭
   - AI가 사주를 계산하고 해석

3. **결과 확인**
   - 사주팔자 (년주, 월주, 일주, 시주)
   - 오행 분석 (목화토금수)
   - 십성 분석
   - AI 해석

## 📁 프로젝트 구조

```
sajufrontend/
├── public/              # 정적 파일
├── src/
│   ├── App.jsx         # 메인 컴포넌트
│   ├── App.css         # 스타일시트
│   ├── main.jsx        # 진입점
│   └── index.css       # 전역 스타일
├── .env                # 환경 변수
├── .env.example        # 환경 변수 예시
├── index.html          # HTML 템플릿
├── package.json        # 의존성 관리
└── vite.config.js      # Vite 설정
```

## 🔌 백엔드 연동

이 프론트엔드는 다음 백엔드 API와 연동됩니다:

- **Repository**: https://github.com/psh10004okpro/newsajuapi
- **API Endpoint**: `POST /api/v1/full-analysis`

**요청 형식**:
```json
{
  "birth_info": {
    "year": 1990,
    "month": 5,
    "day": 15,
    "hour": 14,
    "minute": 30,
    "gender": "male"
  },
  "question": "전체적인 운세를 알려주세요",
  "detail_level": "normal",
  "tone": "friendly"
}
```

## 🎨 디자인 특징

- **모던 그라디언트**: 보라색 계열의 세련된 그라디언트
- **카드 레이아웃**: 깔끔한 카드 기반 UI
- **반응형**: 모든 디바이스에서 최적화된 레이아웃
- **한글 폰트**: Pretendard 폰트로 가독성 향상
- **부드러운 애니메이션**: 로딩 스피너, 호버 효과

## 🚀 배포

### Vercel

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🔧 개발 팁

- Vite의 HMR 기능으로 실시간 개발 가능
- ESLint로 코드 품질 유지
- React DevTools로 디버깅

## 📝 라이선스

MIT License

## 🤝 기여하기

이슈와 PR을 환영합니다!

---

**Made with ❤️ and 🤖 Claude AI**
