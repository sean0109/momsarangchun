# 엄마사랑 재가복지센터 웹사이트

따뜻한 마음으로 엄마처럼 돌보는 재가복지센터 공식 홈페이지

## 프로젝트 개요

이 웹사이트는 엄마사랑 재가복지센터의 공식 홈페이지로, 노인 재가복지 서비스를 제공하는 센터를 소개하고 상담을 유도하는 것을 목표로 합니다.

### 주요 서비스
- 1:1 맞춤 돌봄 서비스
- 노인 장기요양보험
- 전문 건강 관리

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 반응형 디자인, CSS 변수, 그리드/플렉스박스
- **JavaScript (ES6+)**: 바닐라 JS, 이벤트 핸들링
- **Google Fonts**: Noto Sans KR
- **완전 정적 사이트**: 빌드 프로세스 불필요

## 프로젝트 구조

```
HTMLproject/
├── index.html              # 메인 홈페이지
├── about/
│   └── index.html          # 센터 소개 페이지 (추가 예정)
├── contact/
│   └── index.html          # 오시는 길/문의 페이지 (추가 예정)
├── css/
│   └── styles.css          # 메인 스타일시트
├── js/
│   └── script.js           # 메인 JavaScript
├── images/
│   ├── logo.png            # 센터 로고
│   └── (기타 이미지)
├── .htaccess               # Apache URL 리라이팅 설정
├── README.md               # 이 파일
├── IMAGE_GUIDE.md          # 이미지 준비 가이드
├── DESIGN_REFERENCE.md     # 경쟁사 디자인 분석
└── CLAUDE.md               # Claude Code 가이드
```

## 로컬 개발

### 서버 실행 방법

**Python 3 사용 (권장):**
```bash
cd /Users/skywlkr/IdeaProjects/HTMLproject
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (http-server):**
```bash
npx http-server -p 8000
```

### 파일 직접 열기
간단한 확인은 `index.html`을 브라우저에서 직접 열어도 됩니다.
(단, 일부 기능은 웹서버 환경에서만 작동)

## 디자인 특징

### 색상 팔레트
- **메인 그린**: #4CAF50 (생명, 건강)
- **오렌지**: #FF9800 (따뜻함)
- **블루**: #2196F3 (신뢰)

### 반응형 브레이크포인트
- 데스크톱: 922px 이상
- 태블릿: 545px ~ 921px
- 모바일: 544px 이하

### 주요 기능
- ✅ 스티키 헤더
- ✅ 부드러운 스크롤
- ✅ 모바일 햄버거 메뉴
- ✅ 스크롤 애니메이션
- ✅ 호버 효과 및 트랜지션
- ✅ 완전 반응형 디자인

## 배포

### Cafe24 호스팅 준비

1. **FTP 업로드**
   - 모든 파일/폴더를 public_html에 업로드
   - `.htaccess` 파일 포함 필수

2. **URL 구조**
   - `www.domain.com` → index.html
   - `www.domain.com/about` → about/index.html
   - `www.domain.com/contact` → contact/index.html

3. **이미지 추가**
   - `IMAGE_GUIDE.md` 참고
   - AI 생성 또는 무료 스톡 이미지 사용

### 수정할 정보

배포 전에 다음 정보를 실제 정보로 변경하세요:

**index.html:**
- 전화번호: `02-1234-5678`
- 이메일: `info@ommasarang.co.kr`
- 주소: `서울특별시 강남구 테헤란로 123`
- 운영시간 (필요시)

**푸터 정보:**
- 모든 연락처 정보
- 사업자 등록번호 (필요시 추가)

## 추가 페이지 만들기

### 새 페이지 추가 예시

```bash
# 1. 디렉토리 생성
mkdir services

# 2. index.html 복사 및 수정
cp about/index.html services/index.html

# 3. 내용 수정
# - 페이지 제목
# - 본문 내용
# - 메타 태그
```

### 네비게이션 업데이트
모든 페이지의 네비게이션 메뉴에 새 링크 추가:
```html
<li><a href="/services" class="nav-link">서비스</a></li>
```

## 성능 최적화

### 이미지 최적화
- TinyPNG: https://tinypng.com
- 권장 포맷: JPG (사진), PNG (로고)

### 로딩 속도
- Google Fonts 프리로드 적용됨
- CSS/JS 압축 (배포 시)

## 브라우저 호환성

- ✅ Chrome (최신)
- ✅ Firefox (최신)
- ✅ Safari (최신)
- ✅ Edge (최신)
- ⚠️ IE11 (부분 지원)

## 라이선스

© 2026 엄마사랑 재가복지센터. All rights reserved.

## 지원

문의사항:
- 전화: 02-1234-5678
- 이메일: info@ommasarang.co.kr

---
**제작 정보:**
- 제작일: 2026년 1월
- 디자인: 경쟁사 분석 기반 커스텀 디자인
- 기술: HTML5, CSS3, JavaScript (ES6+)

