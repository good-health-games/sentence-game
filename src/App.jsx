import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Play, Star, School, Lock, Home, Building, Globe, Activity, Calendar, Coins, Heart, Leaf, GraduationCap, ChevronLeft, Smile, Utensils, Users, Cat, CloudSun, TreePine, Briefcase, Car } from 'lucide-react';

// 高清康傑教育機構 Logo 元件
const GHLogo = () => (
  <div className="bg-[#243c64] text-white p-6 rounded-2xl shadow-md w-full mb-6 flex flex-col items-center">
    <svg viewBox="0 0 100 115" className="w-20 h-24 mb-4">
      <path
        d="M 5 5 L 95 5 L 95 65 C 95 95 50 110 50 110 C 50 110 5 95 5 65 Z"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text x="50" y="68" fill="white" fontFamily="sans-serif" fontWeight="bold" fontSize="48" textAnchor="middle">GH</text>
    </svg>
    <div className="text-center font-sans w-full mt-2">
      <div className="text-3xl font-bold tracking-widest mb-2 text-white">句子拼拼樂</div>
      <div className="text-sm font-bold tracking-[0.2em] opacity-90 uppercase text-sky-200">Sentence Builder</div>
    </div>
  </div>
);

// 遊戲題庫：各級別與主題分類 (中英文獨立開關)
const GRADES_DATA = {
  'K2': {
    themes: [
      { id: 'emotion', name: '情緒', enName: 'Emotions', icon: Smile, available: { zh: true, en: false } },
      { id: 'food', name: '食物', enName: 'Food', icon: Utensils, available: { zh: true, en: false } },
      { id: 'family', name: '家庭', enName: 'Family', icon: Users, available: { zh: true, en: false } },
      { id: 'animal', name: '動物', enName: 'Animals', icon: Cat, available: { zh: true, en: false } },
      { id: 'weather', name: '天氣', enName: 'Weather', icon: CloudSun, available: { zh: true, en: false } },
      { id: 'nature', name: '大自然', enName: 'Nature', icon: TreePine, available: { zh: true, en: false } },
      { id: 'occupation', name: '職業', enName: 'Jobs', icon: Briefcase, available: { zh: true, en: false } },
      { id: 'transport', name: '交通', enName: 'Transport', icon: Car, available: { zh: true, en: false } },
    ],
    data: {
      'emotion': {
        zh: [
          { id: 1, parts: ["文文", "生氣地", "跺腳", "。"] },
          { id: 2, parts: ["小青", "快樂地", "玩耍", "。"] },
          { id: 3, parts: ["妹妹", "傷心地", "哭", "。"] },
          { id: 4, parts: ["哥哥", "愉快地", "唱歌", "。"] },
          { id: 5, parts: ["弟弟", "興奮地", "拍掌", "。"] },
          { id: 6, parts: ["天天", "認真地", "寫字", "。"] },
          { id: 7, parts: ["老師", "耐心地", "教導", "我們", "。"] },
          { id: 8, parts: ["小文", "緊張地", "舉手", "。"] },
          { id: 9, parts: ["小青", "害怕地", "躲起來", "。"] },
          { id: 10, parts: ["弟弟", "疲倦地", "坐下來", "。"] }
        ],
        en: []
      },
      'food': {
        zh: [
          { id: 1, parts: ["公公", "愛", "上茶樓", "。"] },
          { id: 2, parts: ["妹妹", "喜歡", "到", "快餐店", "。"] },
          { id: 3, parts: ["蔬菜", "真", "有益", "。"] },
          { id: 4, parts: ["水果", "真", "美味", "。"] },
          { id: 5, parts: ["米飯", "真", "健康", "。"] },
          { id: 6, parts: ["琳琳", "喜歡", "吃", "香蕉", "。"] },
          { id: 7, parts: ["小天", "喜歡", "喝", "果汁", "。"] },
          { id: 8, parts: ["弟弟", "喜歡", "喝", "牛奶", "。"] },
          { id: 9, parts: ["俊俊", "喜歡", "吃", "蘋果", "。"] },
          { id: 10, parts: ["哥哥", "喜歡", "吃", "餅乾", "。"] }
        ],
        en: []
      },
      'family': {
        zh: [
          { id: 1, parts: ["爸爸", "在", "書房", "看書", "。"] },
          { id: 2, parts: ["媽媽", "在", "廚房", "煮飯", "。"] },
          { id: 3, parts: ["妹妹", "在", "房間", "睡覺", "。"] },
          { id: 4, parts: ["爺爺", "在", "飯廳", "吃晚餐", "。"] },
          { id: 5, parts: ["我", "在", "客廳", "玩玩具", "。"] },
          { id: 6, parts: ["朗朗", "和", "爸爸", "一起", "玩積木", "。"] },
          { id: 7, parts: ["爸爸", "和", "媽媽", "一起", "整理", "儲物室", "。"] },
          { id: 8, parts: ["公公", "和", "婆婆", "一起", "泡茶", "。"] },
          { id: 9, parts: ["弟弟", "和", "妹妹", "一起", "收拾", "玩具", "。"] },
          { id: 10, parts: ["我", "和", "表弟", "一起", "唱歌", "。"] }
        ],
        en: []
      },
      'animal': {
        zh: [
          { id: 1, parts: ["兔子", "在", "草地上", "跳躍", "。"] },
          { id: 2, parts: ["毛毛蟲", "在", "地上", "爬行", "。"] },
          { id: 3, parts: ["蜜蜂", "在", "花叢中", "探花蜜", "。"] },
          { id: 4, parts: ["猴子", "在", "樹上", "吃", "香蕉", "。"] },
          { id: 5, parts: ["獅子", "在", "森林裏", "尋找", "食物", "。"] },
          { id: 6, parts: ["蝴蝶", "在", "花間", "飛舞", "。"] },
          { id: 7, parts: ["斑馬", "住在", "炎熱的", "草原", "。"] },
          { id: 8, parts: ["海獅", "住在", "寒冷的", "海洋", "。"] },
          { id: 9, parts: ["明明", "到", "動物園", "看", "老虎", "。"] },
          { id: 10, parts: ["我", "到", "海洋公園", "看", "海豚表演", "。"] }
        ],
        en: []
      },
      'weather': {
        zh: [
          { id: 1, parts: ["今天", "的", "天氣", "晴朗。"] },
          { id: 2, parts: ["我", "正在", "觀看", "天氣報告。"] },
          { id: 3, parts: ["颱風天", "我們", "不應", "外出。"] },
          { id: 4, parts: ["寒冷", "天氣警告", "現正", "生效。"] },
          { id: 5, parts: ["媽媽", "正在", "收集", "雨水。"] },
          { id: 6, parts: ["天文台", "每天", "預測", "天氣。"] },
          { id: 7, parts: ["日本", "冬天", "會", "下雪。"] },
          { id: 8, parts: ["冬天", "要", "穿著", "保暖衣物。"] },
          { id: 9, parts: ["夏天", "天氣", "很", "炎熱。"] },
          { id: 10, parts: ["藍藍", "是", "班上的", "天氣報告員。"] }
        ],
        en: []
      },
      'nature': {
        zh: [
          { id: 1, parts: ["香港", "有", "四個", "不同季節。"] },
          { id: 2, parts: ["樹木", "在", "森林裏", "生長。"] },
          { id: 3, parts: ["小明", "收集", "不同形狀的", "樹葉。"] },
          { id: 4, parts: ["地上", "有", "很多", "松果。"] },
          { id: 5, parts: ["琳琳", "喜歡", "到沙灘", "游泳。"] },
          { id: 6, parts: ["欣欣", "學習了", "水循環", "知識。"] },
          { id: 7, parts: ["我們", "要", "愛護", "大自然。"] },
          { id: 8, parts: ["鳥兒", "在", "空中", "飛翔。"] },
          { id: 9, parts: ["我們", "到", "水塘", "參觀。"] },
          { id: 10, parts: ["避雷針", "能", "保護", "建築物。"] }
        ],
        en: []
      },
      'occupation': {
        zh: [
          { id: 1, parts: ["護士", "細心地", "照顧", "病人。"] },
          { id: 2, parts: ["老師", "耐心地", "教導", "學生。"] },
          { id: 3, parts: ["消防員", "正在", "撲滅", "火災。"] },
          { id: 4, parts: ["收銀員", "熟練地", "操作", "收銀機。"] },
          { id: 5, parts: ["廚師", "正在", "預備", "食物。"] },
          { id: 6, parts: ["醫生", "在醫院", "為病人", "治療。"] },
          { id: 7, parts: ["郵差", "每天", "準時地", "派送信件。"] },
          { id: 8, parts: ["警察", "保護", "市民的", "安全。"] },
          { id: 9, parts: ["理髮師", "為", "顧客", "設計造型。"] },
          { id: 10, parts: ["司機", "把乘客", "送到", "目的地。"] }
        ],
        en: []
      },
      'transport': {
        zh: [
          { id: 1, parts: ["我", "每天", "乘搭", "巴士", "上學。"] },
          { id: 2, parts: ["我們", "要", "遵守", "交通", "規則。"] },
          { id: 3, parts: ["天星小輪", "在", "維多利亞港", "上", "行駛。"] },
          { id: 4, parts: ["藍色", "的士", "在", "大嶼山", "行駛。"] },
          { id: 5, parts: ["飛機", "帶", "我們", "到", "世界各地。"] },
          { id: 6, parts: ["馬路上", "有", "不同", "的", "交通", "工具。"] },
          { id: 7, parts: ["過馬路時", "要", "留意", "四周", "環境。"] },
          { id: 8, parts: ["我們", "可用", "八達通", "支付", "車資。"] },
          { id: 9, parts: ["妹妹", "在", "港鐵客務中心", "購買", "八達通。"] },
          { id: 10, parts: ["電車", "在", "港島區", "的", "街道上", "來回穿梭。"] }
        ],
        en: []
      }
    }
  },
  'K3': {
    themes: [
      { id: 'community', name: '社區', enName: 'Community', icon: Building, available: { zh: true, en: false } },
      { id: 'world', name: '環遊世界', enName: 'Around the World', icon: Globe, available: { zh: true, en: false } },
      { id: 'sports', name: '運動', enName: 'Sports', icon: Activity, available: { zh: true, en: false } },
      { id: 'festival', name: '節日', enName: 'Festivals', icon: Calendar, available: { zh: true, en: false } },
      { id: 'finance', name: '理財', enName: 'Money', icon: Coins, available: { zh: true, en: false } },
      { id: 'hobby', name: '興趣', enName: 'Hobbies', icon: Heart, available: { zh: true, en: false } },
      { id: 'nature', name: '保護大自然', enName: 'Caring for Nature', icon: Leaf, available: { zh: true, en: false } },
      { id: 'primary', name: '小學生活', enName: 'Primary School Life', icon: GraduationCap, available: { zh: true, en: false } },
    ],
    data: {
      'community': {
        zh: [
          { id: 1, parts: ["小朋友", "在公園", "開心地", "玩耍", "。"] },
          { id: 2, parts: ["媽媽", "在", "超級市場", "購買", "日常用品", "。"] },
          { id: 3, parts: ["明明", "到", "郵局", "寄信", "給朋友", "。"] },
          { id: 4, parts: ["我們", "要", "保持", "環境清潔", "。"] },
          { id: 5, parts: ["我們", "要", "關心", "社區", "不同的人", "。"] },
          { id: 6, parts: ["我和爸爸", "到", "體育館", "打", "羽毛球", "。"] },
          { id: 7, parts: ["我們", "可以", "進行", "分類", "回收", "。"] },
          { id: 8, parts: ["老師", "帶我們", "到", "老人院", "探訪長者", "。"] },
          { id: 9, parts: ["社區上裏", "有", "不同種族", "的", "人", "。"] },
          { id: 10, parts: ["我們", "要", "愛護", "社區的", "公共設施", "。"] }
        ],
        en: []
      },
      'world': {
        zh: [
          { id: 1, parts: ["我們", "在", "旅行時", "拍下", "照片", "。"] },
          { id: 2, parts: ["小康", "到", "中國", "萬里長城", "參觀", "。"] },
          { id: 3, parts: ["我們", "在", "日本", "品嚐", "美味的壽司", "。"] },
          { id: 4, parts: ["文文", "在", "英國", "倫敦塔橋", "欣賞夜景", "。"] },
          { id: 5, parts: ["媽媽", "在", "法國", "艾菲爾鐵塔", "拍照留念", "。"] },
          { id: 6, parts: ["我們", "在旅行中", "了解", "當地文化", "。"] },
          { id: 7, parts: ["明明", "到", "韓國", "雪山", "滑雪", "。"] },
          { id: 8, parts: ["西班牙", "的", "馬賽克", "圖案", "很特別", "。"] },
          { id: 9, parts: ["樂樂", "在", "埃及", "欣賞", "金字塔", "。"] },
          { id: 10, parts: ["我們", "在", "環球美食節", "品嚐", "不同國家的美食", "。"] }
        ],
        en: []
      },
      'sports': {
        zh: [
          { id: 1, parts: ["我們", "到", "運動店", "購買", "運動用品", "。"] },
          { id: 2, parts: ["體育台", "直播", "不同的", "運動", "比賽", "。"] },
          { id: 3, parts: ["每天", "做運動", "能", "保持", "身體健康", "。"] },
          { id: 4, parts: ["爸爸", "帶哥哥", "到", "公共游泳池", "游泳", "。"] },
          { id: 5, parts: ["我", "和朋友", "到", "足球場", "踢足球", "。"] },
          { id: 6, parts: ["中國", "有", "很多", "出色的", "運動員", "。"] },
          { id: 7, parts: ["悅悅", "在", "溜冰場", "練習", "花式溜冰", "。"] },
          { id: 8, parts: ["婆婆", "早上", "在", "公園", "打太極", "。"] },
          { id: 9, parts: ["跆拳道", "是一項", "源自", "韓國", "的運動", "。"] },
          { id: 10, parts: ["文文", "到", "馬術學校", "參加", "騎馬活動", "。"] }
        ],
        en: []
      },
      'festival': {
        zh: [
          { id: 1, parts: ["雅雅", "預備了", "母親節", "禮物", "給", "媽媽", "。"] },
          { id: 2, parts: ["小明", "和家人", "在", "元宵節", "一起", "吃湯圓", "。"] },
          { id: 3, parts: ["我們", "在", "重陽節", "一起", "到山上", "登高", "。"] },
          { id: 4, parts: ["我們", "在", "聖誕節", "交換", "聖誕", "禮物", "。"] },
          { id: 5, parts: ["復活節", "是", "紀念", "耶穌復活", "的", "日子", "。"] },
          { id: 6, parts: ["我們", "到", "尖沙咀海旁", "欣賞", "跨年", "煙花表演", "。"] },
          { id: 7, parts: ["媽媽", "正在", "準備", "農曆新年", "的", "全盒", "。"] },
          { id: 8, parts: ["端午節", "是", "紀念", "屈原", "的", "節日", "。"] },
          { id: 9, parts: ["學校", "今天", "舉行", "了", "中秋節", "賞燈會", "。"] },
          { id: 10, parts: ["我們", "在", "年宵市場", "購買", "各種", "新年用品", "。"] }
        ],
        en: []
      },
      'finance': {
        zh: [
          { id: 1, parts: ["我", "每天", "都會", "把", "零用錢", "儲起來", "。"] },
          { id: 2, parts: ["你", "知道", "八達通", "有", "甚麼用途", "嗎", "？"] },
          { id: 3, parts: ["請", "捐款", "幫助", "有需要", "的", "山區小朋友", "。"] },
          { id: 4, parts: ["我", "會把", "部份", "利是錢", "存進", "錢箱", "。"] },
          { id: 5, parts: ["爸爸", "使用", "信用卡", "購買", "新家具", "。"] },
          { id: 6, parts: ["香港", "有", "三家", "法定", "貨幣", "銀行", "。"] },
          { id: 7, parts: ["媽媽", "把", "紙幣", "放在", "錢包", "裏", "。"] },
          { id: 8, parts: ["金錢", "可以", "購買", "需要", "的", "物品", "。"] },
          { id: 9, parts: ["爺爺", "把", "現金", "放在", "銀行", "儲蓄", "。"] },
          { id: 10, parts: ["樂樂", "把", "十元", "捐到", "愛心箱", "內", "。"] }
        ],
        en: []
      },
      'hobby': {
        zh: [
          { id: 1, parts: ["小天", "喜歡", "到", "公共", "游泳池", "游泳", "。"] },
          { id: 2, parts: ["明明", "與同學", "進行", "小提琴", "合奏", "練習", "。"] },
          { id: 3, parts: ["安妮", "喜歡", "參加", "不同", "的", "歌唱", "比賽", "。"] },
          { id: 4, parts: ["朗朗", "在家中", "種植", "了", "不同", "的", "盆栽", "。"] },
          { id: 5, parts: ["安安", "在家中", "製作", "不同", "款式的", "甜品", "。"] },
          { id: 6, parts: ["佳佳", "喜歡", "在", "旅行時", "拍攝", "不同的照片", "。"] },
          { id: 7, parts: ["他們", "正在", "進行", "緊張的", "圍棋", "比賽", "。"] },
          { id: 8, parts: ["延延", "喜歡", "進行", "不同類型", "的", "手工創作", "。"] },
          { id: 9, parts: ["他們", "正在", "綵排", "精彩的", "話劇", "表演", "。"] },
          { id: 10, parts: ["智智", "和朋友", "都", "報名", "參加", "鋼琴班", "。"] }
        ],
        en: []
      },
      'nature': {
        zh: [
          { id: 1, parts: ["風", "可以", "幫助", "風車", "進行", "發電", "。"] },
          { id: 2, parts: ["樂樂", "參加了", "社區", "的", "植樹", "活動", "。"] },
          { id: 3, parts: ["學校", "正在", "進行", "垃圾", "分類", "活動", "。"] },
          { id: 4, parts: ["我們", "購物時", "要", "自備", "環保", "購物袋", "。"] },
          { id: 5, parts: ["文文", "在", "家中", "響應", "世界關燈日", "活動", "。"] },
          { id: 6, parts: ["言言", "參加", "食物銀行", "舉辦", "的", "義工活動", "。"] },
          { id: 7, parts: ["太陽能板", "可以", "把", "陽光", "轉化成", "電能", "。"] },
          { id: 8, parts: ["我們", "平日", "要", "減少", "製造", "垃圾", "。"] },
          { id: 9, parts: ["海洋", "動物", "需要", "乾淨", "的", "環境", "。"] },
          { id: 10, parts: ["堆積如山", "的", "膠袋", "污染", "美麗的", "地球", "。"] }
        ],
        en: []
      },
      'primary': {
        zh: [
          { id: 1, parts: ["我", "在", "電腦課", "學習", "電腦", "知識", "。"] },
          { id: 2, parts: ["天天", "喜歡", "到", "學校", "圖書館", "看書", "。"] },
          { id: 3, parts: ["欣欣", "喜歡", "到", "小食部", "購買", "小食", "。"] },
          { id: 4, parts: ["老師", "正在", "為", "學生", "安排", "新座位", "。"] },
          { id: 5, parts: ["庭庭", "是", "一甲班", "的", "體育科", "科長", "。"] },
          { id: 6, parts: ["媽媽", "帶", "晴晴", "到", "百貨公司", "選購", "開學用品", "。"] },
          { id: 7, parts: ["子欣", "每天", "按", "上課", "時間表", "收拾書包", "。"] },
          { id: 8, parts: ["老師", "每天", "耐心地", "教導", "我們", "新知識", "。"] },
          { id: 9, parts: ["我們", "在", "中文課", "進行", "小組討論", "活動", "。"] },
          { id: 10, parts: ["文文", "參加", "星期六", "舉辦", "的", "課外活動", "。"] }
        ],
        en: []
      }
    }
  }
};

// 陣列洗牌函數
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [view, setView] = useState('home');
  const [previousView, setPreviousView] = useState('home');
  const [currentGrade, setCurrentGrade] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('zh');
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [status, setStatus] = useState('playing');
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSelectGrade = (grade) => {
    if (grade === 'K2' || grade === 'K3') {
      setCurrentGrade(grade);
      setView('language');
    } else {
      setPreviousView('home');
      setView('coming_soon');
    }
  };

  const handleSelectLanguage = (lang) => {
    setCurrentLanguage(lang);
    setView('themes');
  };

  const goHome = () => {
    setView('home');
    setGameFinished(false);
    setCurrentTheme(null);
    setCurrentGrade(null);
    setCurrentLanguage('zh');
  };

  const goLanguage = () => {
    setView('language');
    setGameFinished(false);
    setCurrentTheme(null);
  };

  const goThemes = () => {
    setView('themes');
    setGameFinished(false);
    setCurrentTheme(null);
  };

  const handleSelectTheme = (theme) => {
    if (theme.available[currentLanguage]) {
      setCurrentTheme(theme.id);
      setCurrentLevel(0);
      setScore(0);
      setGameFinished(false);
      setView('playing');
    }
  };

  const initLevel = (levelIndex) => {
    if (!currentTheme || !currentGrade || !currentLanguage) return;
    const currentThemeAllData = GRADES_DATA[currentGrade].data[currentTheme];
    const currentThemeData = currentThemeAllData ? currentThemeAllData[currentLanguage] : null;
    
    if (!currentThemeData || levelIndex >= currentThemeData.length) {
      setGameFinished(true);
      return;
    }
    
    const sentenceParts = currentThemeData[levelIndex].parts;
    const wordObjects = sentenceParts.map((text, index) => ({
      id: `${levelIndex}-${index}`,
      text: text
    }));

    setWordBank(shuffleArray(wordObjects));
    setUserAnswer([]);
    setStatus('playing');
  };

  useEffect(() => {
    initLevel(currentLevel);
  }, [currentLevel, currentTheme]);

  const moveToAnswer = (wordObj) => {
    if (status === 'correct') return;
    setWordBank((prev) => prev.filter((w) => w.id !== wordObj.id));
    setUserAnswer((prev) => [...prev, wordObj]);
    setStatus('playing');
  };

  const moveToBank = (wordObj) => {
    if (status === 'correct') return;
    setUserAnswer((prev) => prev.filter((w) => w.id !== wordObj.id));
    setWordBank((prev) => [...prev, wordObj]);
    setStatus('playing');
  };

  const checkAnswer = () => {
    const currentThemeData = GRADES_DATA[currentGrade].data[currentTheme][currentLanguage];
    const originalSentence = currentThemeData[currentLevel].parts.join('');
    const currentAttempt = userAnswer.map((w) => w.text).join('');

    if (currentAttempt === originalSentence && wordBank.length === 0) {
      setStatus('correct');
      setScore((prev) => prev + 10);
    } else {
      setStatus('wrong');
    }
  };

  const resetLevel = () => {
    initLevel(currentLevel);
  };

  const nextLevel = () => {
    const currentThemeData = GRADES_DATA[currentGrade].data[currentTheme][currentLanguage];
    if (currentLevel + 1 >= currentThemeData.length) {
      setGameFinished(true);
    } else {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameFinished(false);
    initLevel(0); 
  };

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full text-center border-t-8 border-[#243c64]">
          <GHLogo />
          <div className="space-y-4">
            <button onClick={() => handleSelectGrade('K1')} className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all text-xl">
              <span>K1</span><Lock className="w-6 h-6 ml-2" />
            </button>
            <button onClick={() => handleSelectGrade('K2')} className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-xl">
              <span>K2</span>
            </button>
            <button onClick={() => handleSelectGrade('K3')} className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-xl">
              <span>K3</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'language') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full text-center border-t-8 border-[#243c64]">
          <div className="flex items-center mb-8 bg-sky-50 p-3 rounded-2xl shadow-sm border border-sky-100">
            <button onClick={goHome} className="p-2 bg-white hover:bg-gray-100 text-gray-600 rounded-lg transition-colors mr-4 shadow-sm" title="回到首頁">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-sky-600 flex-1 text-center mr-10">{currentGrade} 選擇語言</h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleSelectLanguage('zh')} className="flex-1 flex flex-col items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-10 px-4 rounded-2xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all">
              <span className="text-3xl tracking-widest">中文</span>
            </button>
            <button onClick={() => handleSelectLanguage('en')} className="flex-1 flex flex-col items-center justify-center bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-10 px-4 rounded-2xl shadow-[0_4px_0_rgb(52,211,153)] active:shadow-none active:translate-y-1 transition-all">
              <span className="text-3xl tracking-widest">English</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'themes') {
    const currentThemesList = GRADES_DATA[currentGrade]?.themes || [];
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center py-10 p-4 font-sans selection:bg-blue-200">
        <div className="max-w-4xl w-full">
          <div className="flex items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
            <button onClick={goLanguage} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors mr-4" title={currentLanguage === 'en' ? 'Back' : '回到語言選擇'}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-sky-600 flex-1 text-center mr-10">
              {currentGrade} {currentLanguage === 'en' ? 'Challenge Topics' : '挑戰主題'}
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {currentThemesList.map((theme) => {
              const isAvailable = theme.available[currentLanguage];
              return (
                <button key={theme.id} onClick={() => isAvailable && handleSelectTheme(theme)} className={`flex flex-col items-center justify-center p-6 rounded-3xl border-b-4 transition-all ${isAvailable ? 'bg-white hover:bg-sky-50 border-sky-200 hover:border-sky-300 shadow-md hover:-translate-y-1 cursor-pointer' : 'bg-gray-50 border-gray-200 opacity-80 cursor-not-allowed'}`}>
                  <div className={`p-4 rounded-2xl mb-4 shadow-inner ${isAvailable ? 'bg-sky-100 text-sky-500' : 'bg-gray-200 text-gray-400'}`}>
                    <theme.icon className="w-12 h-12" />
                  </div>
                  <span className={`text-xl font-bold ${isAvailable ? 'text-gray-700' : 'text-gray-400'}`}>
                    {currentLanguage === 'en' ? theme.enName : theme.name}
                  </span>
                  {!isAvailable && (
                    <div className="mt-3 flex items-center justify-center gap-1 text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      <Lock className="w-4 h-4" /> {currentLanguage === 'en' ? 'Coming Soon' : '準備中'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'coming_soon') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6"><Lock className="w-20 h-20 text-gray-300" /></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{currentLanguage === 'en' ? 'Coming Soon...' : '內容準備中...'}</h1>
          <p className="text-gray-600 mb-8">{currentLanguage === 'en' ? 'This topic is currently under construction.' : '這個單元的題目還在努力製作中，請先挑戰其他開放的關卡吧！'}</p>
          <button onClick={() => previousView === 'themes' ? goThemes() : previousView === 'language' ? goLanguage() : goHome()} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-lg flex items-center justify-center gap-2">
            <ChevronLeft className="w-5 h-5" /> {currentLanguage === 'en' ? 'Back' : '返回上一頁'}
          </button>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6"><Star className="w-24 h-24 text-yellow-400 fill-yellow-400 animate-bounce" /></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentLanguage === 'en' ? 'Great Job!' : '太棒了！完成所有挑戰！'}</h1>
          <p className="text-xl text-gray-600 mb-8">{currentLanguage === 'en' ? 'Total Score: ' : '你的總得分是：'}<span className="text-blue-600 font-bold text-3xl">{score}</span>{currentLanguage === 'en' ? ' points' : ' 分'}</p>
          <div className="space-y-4">
            <button onClick={restartGame} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(37,99,235)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"><RotateCcw className="w-6 h-6" /> {currentLanguage === 'en' ? 'Play Again' : '再玩一次'}</button>
            <button onClick={goThemes} className="w-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(186,230,253)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"><ChevronLeft className="w-6 h-6" /> {currentLanguage === 'en' ? 'Back to Topics' : '回到主題選單'}</button>
            <button onClick={goHome} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(209,213,219)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"><Home className="w-6 h-6" /> {currentLanguage === 'en' ? 'Home' : '回到首頁'}</button>
          </div>
        </div>
      </div>
    );
  }

  const currentThemeData = currentTheme ? GRADES_DATA[currentGrade]?.data[currentTheme]?.[currentLanguage] || [] : [];
  const currentThemeInfo = currentTheme ? GRADES_DATA[currentGrade]?.themes.find(t => t.id === currentTheme) : null;

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center py-10 p-4 font-sans selection:bg-blue-200">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
          <div className="flex items-center gap-2">
            <button onClick={goThemes} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors mr-1" title={currentLanguage === 'en' ? 'Back' : '回到主題選單'}><ChevronLeft className="w-5 h-5" /></button>
            <div className="bg-sky-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-sm">{currentLanguage === 'en' ? currentThemeInfo?.enName : currentThemeInfo?.name} - {currentLanguage === 'en' ? `Level ${currentLevel + 1} / ${currentThemeData.length}` : `第 ${currentLevel + 1} / ${currentThemeData.length} 關`}</div>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-amber-500"><Star className="w-6 h-6 fill-amber-500" />{currentLanguage === 'en' ? 'Score: ' : '得分：'}{score}</div>
        </div>
        <p className="text-center text-gray-600 font-medium mb-4 text-lg">{currentLanguage === 'en' ? 'Please click the cards below to build the correct sentence.' : '請點擊下方的字卡，拼出正確的句子。'}</p>
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border-b-8 border-sky-100">
          <div className="mb-8">
            <div className="text-sm font-bold text-sky-600 mb-2 ml-2">{currentLanguage === 'en' ? 'Answer Area:' : '解答區：'}</div>
            <div className={`min-h-[120px] p-4 rounded-2xl border-4 border-dashed flex flex-wrap gap-3 items-start transition-colors duration-300 ${status === 'wrong' ? 'border-red-300 bg-red-50' : status === 'correct' ? 'border-green-400 bg-green-50' : 'border-sky-200 bg-sky-50'}`}>
              {userAnswer.length === 0 && <div className="w-full h-full flex items-center justify-center text-sky-300 font-medium text-lg pt-6 pb-2">{currentLanguage === 'en' ? '( Click cards below )' : '( 點擊下方的字卡 )'}</div>}
              {userAnswer.map((word) => <button key={word.id} onClick={() => moveToBank(word)} disabled={status === 'correct'} className="bg-white text-gray-800 font-bold text-xl md:text-2xl px-5 py-3 rounded-xl shadow-[0_4px_0_rgb(203,213,225)] border-2 border-gray-100 active:shadow-none active:translate-y-1 transition-all hover:bg-gray-50">{word.text}</button>)}
            </div>
          </div>
          {status === 'wrong' && <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-lg mb-6 animate-pulse"><XCircle className="w-6 h-6" /> {currentLanguage === 'en' ? 'Not quite right!' : '順序好像不太對！'}</div>}
          {status === 'correct' && <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xl mb-6 animate-bounce"><CheckCircle2 className="w-7 h-7" /> {currentLanguage === 'en' ? 'Correct!' : '太棒了！答對了！'}</div>}
          <div className="mb-10">
            <div className="text-sm font-bold text-sky-600 mb-2 ml-2">{currentLanguage === 'en' ? 'Word Cards:' : '字卡庫：'}</div>
            <div className="min-h-[120px] bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 flex flex-wrap gap-3 items-center justify-center">
              {wordBank.map((word) => <button key={word.id} onClick={() => moveToAnswer(word)} className="bg-amber-100 text-amber-900 font-bold text-xl md:text-2xl px-5 py-3 rounded-xl shadow-[0_4px_0_rgb(252,211,77)] border-2 border-amber-200 active:shadow-none active:translate-y-1 transition-all hover:bg-amber-200">{word.text}</button>)}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {status !== 'correct' ? (
              <>
                <button onClick={resetLevel} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(209,213,219)] active:shadow-none active:translate-y-1 transition-all text-lg"><RotateCcw className="w-5 h-5" /> {currentLanguage === 'en' ? 'Reset' : '重設'}</button>
                <button onClick={checkAnswer} disabled={userAnswer.length !== (currentThemeData[currentLevel]?.parts?.length || 0)} className="flex-[2] flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-lg disabled:opacity-50"><Play className="w-5 h-5" /> {currentLanguage === 'en' ? 'Check Answer' : '檢查答案'}</button>
              </>
            ) : (
              <button onClick={nextLevel} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(22,163,74)] active:shadow-none active:translate-y-1 transition-all text-xl animate-pulse">
                {currentLevel === currentThemeData.length - 1 ? (currentLanguage === 'en' ? 'Finish' : '完成') : (currentLanguage === 'en' ? 'Next Level' : '下一關')} <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}