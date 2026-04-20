import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Play, Star, School, Lock, Home, Building, Globe, Activity, Calendar, Coins, Heart, Leaf, GraduationCap, ChevronLeft, Smile, Utensils, Users, Cat, CloudSun, TreePine, Briefcase, Car } from 'lucide-react';

// 遊戲題庫：各級別與主題分類
const GRADES_DATA = {
  'K2': {
    themes: [
      { id: 'emotion', name: '情緒', icon: Smile, available: false },
      { id: 'food', name: '食物', icon: Utensils, available: false },
      { id: 'family', name: '家庭', icon: Users, available: false },
      { id: 'animal', name: '動物', icon: Cat, available: false },
      { id: 'weather', name: '天氣', icon: CloudSun, available: false },
      { id: 'nature', name: '大自然', icon: TreePine, available: false },
      { id: 'occupation', name: '職業', icon: Briefcase, available: false },
      { id: 'transport', name: '交通', icon: Car, available: false },
    ],
    data: {}
  },
  'K3': {
    themes: [
      { id: 'community', name: '社區', icon: Building, available: true },
      { id: 'world', name: '環遊世界', icon: Globe, available: false },
      { id: 'sports', name: '運動', icon: Activity, available: false },
      { id: 'festival', name: '節日', icon: Calendar, available: false },
      { id: 'finance', name: '理財', icon: Coins, available: false },
      { id: 'hobby', name: '興趣', icon: Heart, available: false },
      { id: 'nature', name: '保護大自然', icon: Leaf, available: false },
      { id: 'primary', name: '小學生活', icon: GraduationCap, available: false },
    ],
    data: {
      'community': [
        { id: 1, parts: ["妹妹", "在", "泳池", "游泳", "。"] },
        { id: 2, parts: ["他", "去", "郵局", "寄信", "。"] },
        { id: 3, parts: ["我", "在", "圖書館", "看書", "。"] },
        { id: 4, parts: ["我", "和", "同學", "一起", "到", "戲院", "看電影", "。"] },
        { id: 5, parts: ["我們", "一家", "在", "餐廳", "吃晚餐", "。"] },
        { id: 6, parts: ["我", "在", "街上", "看到", "很多", "商店", "。"] },
        { id: 7, parts: ["我們", "在", "社區中心", "參加", "活動", "。"] },
        { id: 8, parts: ["我", "和", "家人", "一起", "到", "公園", "玩耍", "。"] },
        { id: 9, parts: ["媽媽", "到", "超級市場", "買", "早餐", "。"] },
        { id: 10, parts: ["我", "和", "家人", "在", "公園", "散步", "。"] }
      ]
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

// 高清康傑教育機構 Logo 元件 (使用 SVG 與 CSS 繪製，保證絕對高清，放大不模糊)
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
    <div className="text-center font-sans w-full">
      <div className="text-2xl font-bold tracking-[0.2em] mb-1">康傑教育機構</div>
      <div className="text-[0.55rem] mb-3 font-semibold tracking-wider opacity-90 uppercase whitespace-nowrap scale-90">Good Health Early Childhood Education Group</div>
      <div className="text-lg tracking-[0.1em]">康傑中英文幼稚園</div>
      <div className="text-lg tracking-[0.1em] mb-2">康傑幼兒中心</div>
      <div className="text-[0.6rem] opacity-90 tracking-wide scale-90">Good Health Anglo-Chinese Kindergarten</div>
      <div className="text-[0.6rem] opacity-90 tracking-wide scale-90">Good Health Child Care Centre</div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState('home'); // 'home', 'themes', 'playing', 'coming_soon'
  const [previousView, setPreviousView] = useState('home'); // 記錄上一頁
  const [currentGrade, setCurrentGrade] = useState(null); // 記錄當前級別 'K1', 'K2', 'K3'
  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [status, setStatus] = useState('playing'); // 'playing', 'correct', 'wrong'
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  // 處理首頁選擇
  const handleSelectGrade = (grade) => {
    if (grade === 'K2' || grade === 'K3') {
      setCurrentGrade(grade);
      setView('themes');
    } else {
      setPreviousView('home');
      setView('coming_soon');
    }
  };

  // 處理主題選擇
  const handleSelectTheme = (theme) => {
    if (theme.available) {
      setCurrentTheme(theme.id);
      setView('playing');
      setCurrentLevel(0);
      setScore(0);
      setGameFinished(false);
    } else {
      setPreviousView('themes');
      setView('coming_soon');
    }
  };

  // 回到首頁
  const goHome = () => {
    setView('home');
    setGameFinished(false);
    setCurrentTheme(null);
    setCurrentGrade(null);
  };

  // 回到主題選擇
  const goThemes = () => {
    setView('themes');
    setGameFinished(false);
    setCurrentTheme(null);
  };

  // 初始化關卡
  const initLevel = (levelIndex) => {
    if (!currentTheme || !currentGrade) return;
    const currentThemeData = GRADES_DATA[currentGrade].data[currentTheme];
    
    if (!currentThemeData || levelIndex >= currentThemeData.length) {
      setGameFinished(true);
      return;
    }
    
    const sentenceParts = currentThemeData[levelIndex].parts;
    // 將每個詞語轉換成帶有唯一 ID 的物件，避免有重複詞語（如兩個「的」）時發生渲染錯誤
    const wordObjects = sentenceParts.map((text, index) => ({
      id: `${levelIndex}-${index}`,
      text: text
    }));

    setWordBank(shuffleArray(wordObjects));
    setUserAnswer([]);
    setStatus('playing');
  };

  // 元件掛載時載入第一題
  useEffect(() => {
    initLevel(currentLevel);
  }, [currentLevel, currentTheme]);

  // 將詞語從下方字庫移動到上方解答區
  const moveToAnswer = (wordObj) => {
    if (status === 'correct') return; // 答對後鎖定
    setWordBank((prev) => prev.filter((w) => w.id !== wordObj.id));
    setUserAnswer((prev) => [...prev, wordObj]);
    setStatus('playing'); // 清除錯誤狀態
  };

  // 將詞語從上方解答區退回下方字庫
  const moveToBank = (wordObj) => {
    if (status === 'correct') return; // 答對後鎖定
    setUserAnswer((prev) => prev.filter((w) => w.id !== wordObj.id));
    setWordBank((prev) => [...prev, wordObj]);
    setStatus('playing'); // 清除錯誤狀態
  };

  // 檢查答案
  const checkAnswer = () => {
    const currentThemeData = GRADES_DATA[currentGrade].data[currentTheme];
    const originalSentence = currentThemeData[currentLevel].parts.join('');
    const currentAttempt = userAnswer.map((w) => w.text).join('');

    if (currentAttempt === originalSentence && wordBank.length === 0) {
      setStatus('correct');
      setScore((prev) => prev + 10);
    } else {
      setStatus('wrong');
    }
  };

  // 重新排列目前關卡
  const resetLevel = () => {
    initLevel(currentLevel);
  };

  // 下一關
  const nextLevel = () => {
    const currentThemeData = GRADES_DATA[currentGrade].data[currentTheme];
    if (currentLevel + 1 >= currentThemeData.length) {
      setGameFinished(true);
    } else {
      setCurrentLevel((prev) => prev + 1);
    }
  };

  // 重新開始遊戲
  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameFinished(false);
    initLevel(0); // 確保重新開始時會載入第一題
  };

  // 首頁畫面
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full text-center border-t-8 border-[#243c64]">
          
          {/* 插入高清 SVG Logo */}
          <GHLogo />
          
          <h2 className="text-2xl font-bold text-sky-600 mb-6 bg-sky-50 py-2 rounded-lg">中文重組句子遊戲</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => handleSelectGrade('K1')}
              className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 text-gray-400 font-bold py-4 px-6 rounded-xl border-2 border-gray-200 transition-all text-xl"
            >
              <span>K1 級別</span>
              <Lock className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleSelectGrade('K2')}
              className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-xl"
            >
              進入 K2 挑戰 <ArrowRight className="w-6 h-6 ml-2" />
            </button>
            <button
              onClick={() => handleSelectGrade('K3')}
              className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-xl"
            >
              進入 K3 挑戰 <ArrowRight className="w-6 h-6 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 主題選擇畫面 (K2, K3)
  if (view === 'themes') {
    const currentThemesList = GRADES_DATA[currentGrade]?.themes || [];
    
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center py-10 p-4 font-sans selection:bg-blue-200">
        <div className="max-w-4xl w-full">
          <div className="flex items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
            <button 
              onClick={goHome}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors mr-4"
              title="回到首頁"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-sky-600 flex-1 text-center mr-10">{currentGrade} 挑戰主題</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {currentThemesList.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme)}
                className={`flex flex-col items-center justify-center p-6 rounded-3xl border-b-4 transition-all ${
                  theme.available 
                    ? 'bg-white hover:bg-sky-50 border-sky-200 hover:border-sky-300 shadow-md hover:-translate-y-1 cursor-pointer' 
                    : 'bg-gray-50 border-gray-200 opacity-80 cursor-not-allowed'
                }`}
              >
                <div className={`p-4 rounded-2xl mb-4 shadow-inner ${theme.available ? 'bg-sky-100 text-sky-500' : 'bg-gray-200 text-gray-400'}`}>
                  <theme.icon className="w-12 h-12" />
                </div>
                <span className={`text-xl font-bold ${theme.available ? 'text-gray-700' : 'text-gray-400'}`}>
                  {theme.name}
                </span>
                {!theme.available && (
                  <div className="mt-3 flex items-center justify-center gap-1 text-sm font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    <Lock className="w-4 h-4" /> 準備中
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 敬請期待畫面 (未開放的級別或主題)
  if (view === 'coming_soon') {
    return (
      <div className="min-h-screen bg-sky-50 flex flex-col items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <Lock className="w-20 h-20 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">內容準備中...</h1>
          <p className="text-gray-600 mb-8">這個單元的題目還在努力製作中，請先挑戰其他開放的關卡吧！</p>
          <button
            onClick={() => previousView === 'themes' ? goThemes() : goHome()}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-lg flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" /> 返回上一頁
          </button>
        </div>
      </div>
    );
  }

  // 遊戲通關畫面
  if (gameFinished) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <Star className="w-24 h-24 text-yellow-400 fill-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">太棒了！完成所有挑戰！</h1>
          <p className="text-xl text-gray-600 mb-8">你的總得分是：<span className="text-blue-600 font-bold text-3xl">{score}</span> 分</p>
          <div className="space-y-4">
            <button
              onClick={restartGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(37,99,235)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-6 h-6" /> 再玩一次
            </button>
            <button
              onClick={goThemes}
              className="w-full bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(186,230,253)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-6 h-6" /> 回到主題選單
            </button>
            <button
              onClick={goHome}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 px-8 rounded-xl shadow-[0_4px_0_rgb(209,213,219)] active:shadow-none active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"
            >
              <Home className="w-6 h-6" /> 回到首頁
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentThemeData = currentTheme ? GRADES_DATA[currentGrade]?.data[currentTheme] || [] : [];
  const currentThemeInfo = currentTheme ? GRADES_DATA[currentGrade]?.themes.find(t => t.id === currentTheme) : null;

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center py-10 p-4 font-sans selection:bg-blue-200">
      <div className="max-w-2xl w-full">
        
        {/* 頂部資訊列 */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-sky-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={goThemes}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors mr-1"
              title="回到主題選單"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="bg-sky-500 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-sm">
              {currentThemeInfo?.name} - 第 {currentLevel + 1} / {currentThemeData.length} 關
            </div>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-amber-500">
            <Star className="w-6 h-6 fill-amber-500" />
            得分：{score}
          </div>
        </div>

        {/* 提示語 */}
        <p className="text-center text-gray-600 font-medium mb-4 text-lg">
          請點擊下方的字卡，拼出正確的中文句子。
        </p>

        {/* 遊戲主要區域 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border-b-8 border-sky-100">
          
          {/* 解答區 (使用者排的句子) */}
          <div className="mb-8">
            <div className="text-sm font-bold text-sky-600 mb-2 ml-2">解答區：</div>
            <div className={`min-h-[120px] p-4 rounded-2xl border-4 border-dashed flex flex-wrap gap-3 items-start transition-colors duration-300 ${
              status === 'wrong' ? 'border-red-300 bg-red-50' : 
              status === 'correct' ? 'border-green-400 bg-green-50' : 
              'border-sky-200 bg-sky-50'
            }`}>
              {userAnswer.length === 0 && (
                <div className="w-full h-full flex items-center justify-center text-sky-300 font-medium text-lg pt-6 pb-2">
                  ( 點擊下方的字卡將它們移動到這裡 )
                </div>
              )}
              {userAnswer.map((word) => (
                <button
                  key={word.id}
                  onClick={() => moveToBank(word)}
                  disabled={status === 'correct'}
                  className="bg-white text-gray-800 font-bold text-xl md:text-2xl px-5 py-3 rounded-xl shadow-[0_4px_0_rgb(203,213,225)] border-2 border-gray-100 active:shadow-none active:translate-y-1 transition-all hover:bg-gray-50 disabled:opacity-90 disabled:cursor-default disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_rgb(203,213,225)]"
                >
                  {word.text}
                </button>
              ))}
            </div>
          </div>

          {/* 狀態回饋 */}
          {status === 'wrong' && (
            <div className="flex items-center justify-center gap-2 text-red-500 font-bold text-lg mb-6 animate-pulse">
              <XCircle className="w-6 h-6" /> 順序好像不太對，再試試看！
            </div>
          )}
          {status === 'correct' && (
            <div className="flex items-center justify-center gap-2 text-green-500 font-bold text-xl mb-6 animate-bounce">
              <CheckCircle2 className="w-7 h-7" /> 太棒了！答對了！
            </div>
          )}

          {/* 字庫區 (待選字卡) */}
          <div className="mb-10">
            <div className="text-sm font-bold text-sky-600 mb-2 ml-2">字卡庫：</div>
            <div className="min-h-[120px] bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 flex flex-wrap gap-3 items-center justify-center">
              {wordBank.map((word) => (
                <button
                  key={word.id}
                  onClick={() => moveToAnswer(word)}
                  className="bg-amber-100 text-amber-900 font-bold text-xl md:text-2xl px-5 py-3 rounded-xl shadow-[0_4px_0_rgb(252,211,77)] border-2 border-amber-200 active:shadow-none active:translate-y-1 transition-all hover:bg-amber-200"
                >
                  {word.text}
                </button>
              ))}
            </div>
          </div>

          {/* 控制按鈕 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {status !== 'correct' ? (
              <>
                <button
                  onClick={resetLevel}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(209,213,219)] active:shadow-none active:translate-y-1 transition-all text-lg"
                >
                  <RotateCcw className="w-5 h-5" /> 重設
                </button>
                <button
                  onClick={checkAnswer}
                  disabled={userAnswer.length !== (currentThemeData[currentLevel]?.parts?.length || 0)}
                  className="flex-[2] flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_0_rgb(2,132,199)] active:shadow-none active:translate-y-1 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:shadow-[0_4px_0_rgb(2,132,199)] disabled:active:translate-y-0"
                >
                  <Play className="w-5 h-5" /> 檢查答案
                </button>
              </>
            ) : (
              <button
                onClick={nextLevel}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-[0_4px_0_rgb(22,163,74)] active:shadow-none active:translate-y-1 transition-all text-xl animate-pulse"
              >
                {currentLevel === currentThemeData.length - 1 ? (
                  <>完成 <CheckCircle2 className="w-6 h-6" /></>
                ) : (
                  <>下一關 <ArrowRight className="w-6 h-6" /></>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}