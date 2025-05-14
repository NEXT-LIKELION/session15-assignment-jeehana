# Todo List Application

React와 Firebase Firestore를 이용한 할 일 관리 애플리케이션입니다.

## 기능

1. 할 일 목록 보기 (제목, 세부사항, 마감기한)
2. 할 일 생성하기
3. 할 일 수정하기
4. 할 일 삭제하기
5. Firestore 데이터베이스 연동

## 설치 및 실행

1. 저장소 클론하기
```
git clone <repository-url>
cd todolist
```

2. 의존성 설치하기
```
npm install
```

3. Firebase 설정하기
   - Firebase 콘솔(https://console.firebase.google.com)에서 새 프로젝트 생성
   - Firestore 데이터베이스 추가
   - 프로젝트 설정에서 웹 앱 등록
   - `src/firebase.js` 파일의 firebaseConfig 변수에 Firebase 구성 정보 입력

4. 개발 서버 실행하기
```
npm run dev
```

## 사용된 기술

- React
- Firebase Firestore
- Vite
- CSS

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
