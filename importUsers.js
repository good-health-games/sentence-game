const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // 頭先下載嘅鎖匙

// 登入最高權限
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 💡 喺度放入你幾百個學生嘅 Email 同密碼
// 你可以用 Excel 嘅公式幫手快速砌好呢個格式
const users = [
  { email: '12345678@gh.com', password: '123456' },
  { email: '98765432gh.com', password: '123456' },
  // ... 幾多個都可以繼續加落去
];

async function importAllUsers() {
  console.log(`開始建立 ${users.length} 個帳號...`);
  
  for (const user of users) {
    try {
      // 叫 Firebase 建立帳號（佢會自動幫你將密碼加密）
      const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password,
      });
      console.log(`✅ 成功建立: ${userRecord.email}`);
    } catch (error) {
      console.log(`❌ 建立失敗 ${user.email}:`, error.message);
    }
  }
  
  console.log("🎉 全部搞掂！");
}

importAllUsers();
