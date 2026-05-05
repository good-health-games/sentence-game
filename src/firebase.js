import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: 將下方 firebaseConfig 替換成你在 Firebase 控制台獲得的專屬設定碼
const firebaseConfig = {
  apiKey: "AIzaSyDVFleEaYeQJ9cEGeoFzfCZtktIFeHG3Xk",
  authDomain: "gh-sentence-game.firebaseapp.com",
  projectId: "gh-sentence-game",
  storageBucket: "gh-sentence-game.firebasestorage.app",
  messagingSenderId: "205536614211",
  appId: "1:205536614211:web:5be3015cbcde0e49efc1f6",
  measurementId: "G-RPN815YZWD"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出 Authentication (驗證) 與 Firestore (資料庫) 實例供 App.jsx 使用
export const auth = getAuth(app);
export const db = getFirestore(app);