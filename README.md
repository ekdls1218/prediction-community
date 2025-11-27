# 🎯 과연 맞을까? – Prediction Community
사용자들이 다양한 주제를 예측하고 투표하며  
**개인 적중률과 인기 예측글/랭킹을 확인할 수 있는 참여형 예측 커뮤니티 서비스**입니다.

프론트–백엔드–DB까지 **전체 서비스를 직접 설계·구현한 개인 프로젝트**입니다.

---

## 🛠 Tech Stack

### Frontend
- Next.js 14 (SSR/CSR 혼합)
- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Axios

### Backend
- FastAPI
- Python

### Database
- MySQL

---

## 🚀 Core Features
### 🔮 홈
- 카테고리 별 게시물 필터링
- 통계 보여주기
- 예측 게시물 조회 및 작성
- 투표 기

### 🔮 예측글 작성
- 카테고리 선택, 제목/마감일 설정
- 투표 기능 자동 활성화

### 🗳 투표 기능
- “맞을 것 같다 / 아닐 것 같다” 선택
- 1회 투표

### 🎯 통계 (Stats)
- 전체 맞힌 수 / 참여 수 / 적중률
- 인기 예측글 Top3
- 사용자 랭킹 Top3

### 👤 마이페이지
- 내 정보 조회·수정
- 전체 / 카테고리 별 통계
- 투표한 예측 게시물 조회
- 예측 정답 선택
- 회원 탈퇴 (ON DELETE CASCADE 적용)

---

### 구현하며 고민했던 것들
- 각 페이지, 컴포넌트 별 SSR/CSR 혼합으로 초기 렌더링 최적화 전략
1) **SSR과 CSR의 분리**
각 페이지, 컴포넌트 별 SSR/CSR 혼합으로 초기 렌더링 최적화 전략에 대해 고민했다.
최초 렌더링이 중요한 페이지/컴포넌트 SSR, 인터랙션 중심 컴포넌트는 CSR로 구조를 재설계했다.

2) **통계 업데이트 시점의 정확성**  
처음에는 **결과 입력 시점에 통계 업데이트**가 자연스럽다고 생각했지만,  
이 방식은 **마감일 이전에 누군가 결과를 입력해버리면 통계가 틀어지는 문제**가 있었다.

그래서  
- `is_reflected` 컬럼을 추가해 **통계 반영 여부**를 관리  
- deadline이 지난 글만 통계 반영  
- 중복 반영 방지를 위해 1회만 반영  

→ 예측 서비스에서 가장 중요한 **정확한 통계 신뢰도**를 확보했다.

---

## 📂 Project Structure
```
prediction_community
├─ backend
│  ├─ comment
│  │  ├─ commentDAO.py
│  ├─ DainLibrary
│  │  ├─ dbManager.py
│  │  ├─ fileManager.py
│  ├─ homeController.py
│  ├─ my
│  │  ├─ MyDAO.py
│  ├─ prediction
│  │  ├─ predictionDAO.py
│  ├─ user
│  │  ├─ psaFolder
│  │  ├─ userDAO.py
│  ├─ __init__.py
└─ frontend
   ├─ public
   │  ├─ favicon.ico
   │  └─ fonts
   │     ├─ PyeongChangPeace-Bold.ttf
   │     └─ PyeongChangPeace-Light.ttf
   ├─ README.md
   ├─ src
   │  ├─ app
   │  │  ├─ globals.css
   │  │  ├─ initDataLoader.tsx
   │  │  ├─ layout.tsx
   │  │  ├─ login
   │  │  │  └─ page.tsx
   │  │  ├─ my
   │  │  │  ├─ edit
   │  │  │  │  └─ page.tsx
   │  │  │  └─ page.tsx
   │  │  ├─ page.tsx
   │  │  ├─ providers.tsx
   │  │  └─ signup
   │  │     └─ page.tsx
   │  ├─ components
   │  │  ├─ auth
   │  │  │  ├─ loginForm.tsx
   │  │  │  └─ SignupForm.tsx
   │  │  ├─ header.tsx
   │  │  ├─ home
   │  │  │  ├─ CommentChatModal.tsx
   │  │  │  ├─ CommentList.tsx
   │  │  │  ├─ mainBoard.tsx
   │  │  │  ├─ post.tsx
   │  │  │  ├─ PostList.tsx
   │  │  │  ├─ PostWriteModal.tsx
   │  │  │  ├─ SideBoardLeft.tsx
   │  │  │  └─ SideBoardRight.tsx
   │  │  └─ my
   │  │     ├─ CategoryPieChart.tsx
   │  │     ├─ MyEditForm.tsx
   │  │     └─ MyMain.tsx
   │  ├─ redux
   │  │  ├─ categorySlice.ts
   │  │  ├─ predictionSlice.ts
   │  │  ├─ rankSlice.ts
   │  │  ├─ store.ts
   │  │  └─ userSlice.ts
   │  └─ validators.ts
   ├─ tailwind.config.js
   ├─ tsconfig.json  
   ├─ eslint.config.mjs
   ├─ global.d.ts
   ├─ next-env.d.ts
   ├─ next.config.ts
   ├─ package-lock.json
   ├─ package.json
   └─ postcss.config.js
```
---

### 아키텍쳐
<img width="2843" height="1631" alt="과연 맞을까__아키텍쳐 drawio" src="https://github.com/user-attachments/assets/4f67cf4f-b1ad-454a-9ffd-8c332cf8f7b2" />

---

### DB - 테이블
- pc_user(사용자)
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 아이디 | id | VARCHAR(12) | PRIMARY KEY |
    | 비밀번호 | pw | VARCHAR(12) | NOT NULL |
    | 닉네임 | nick | VARCHAR(10) | NOT NULL, UNIQUE |
    | 생년월일 | birth | DATE | NOT NULL |
    | 성별 | gender | VARCHAR(10) | NOT NULL |
    | 주소 | addr | VARCHAR(200) | NOT NULL |
    | 프로필 사진 | psa | VARCHAR(255) | NULL |
- 예측 게시물 (pc_post)
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 기본키 | id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
    | 제목 | title | VARCHAR(100) | NOT NULL |
    | 마감일 | deadline | DATETIME | NOT NULL |
    | 카테고리 | category_id | INT | FOREIGN KEY |
    | 생성일 | created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |
    | 작성자 아이디 | user_id | VARCHAR(12) | FOREIGN KEY |
    - 적용여부: 0은 false, 1은 true
- 예측 정답(pc_result)
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 기본키 | post_id | BIGINT | PRIMARY KEY, FOREIGN KEY |
    | 예측 정답 | result | BOOLEAN  | DEFAULT NULL |
- 댓글 (pc_comment)
    
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 기본키 | id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
    | 댓글 내용 | content | TEXT | NOT NULL |
    | 작성자 아이디 | user_id | VARCHAR(12) | FOREIGN KEY |
    | 게시물 아이디 | post_id | BIGINT | FOREIGN KEY |
- 카테고리 (pc_category)
    
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 기본키 | id | INT | PRIMARY KEY, AUTO_INCREMENT |
    | 카테고리 종류 | name | VARCHAR(50) | NOT NULL, UNIQUE |
- 예측 투표 (pc_vote)
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 기본키 | id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
    | 예측 선택 | pick | INT | PRIMARY KEY, NOT NULL |
    | 사용자 아이디 | user_id | VARCHAR(12) | FOREIGN KEY |
    | 게시물 아이디 | post_id | BIGINT | FOREIGN KEY |
    | 통계 반영 여부 | is_reflected | BOOLEAN  | DEFAULT FALSE |
- 예측 정보(pc_stats)
    
    
    | 한글명 | 필드명 | 데이터 타입 | 제약조건 |
    | --- | --- | --- | --- |
    | 사용자 아이디 | user_id | VARCHAR(12) | PRIMARY KEY, FOREIGN KEY |
    | 카테고리 종류 | cate_id | INT | PRIMARY KEY, FOREIGN KEY |
    | 맞힌 횟수 | correct_count | INT | DEFAULT 0 |
    | 총 참여 횟수 | total_count | INT | DEFAULT 0 |
    | 적중률 | accuracy_rate | DECIMAL(5,2) | NULL |
