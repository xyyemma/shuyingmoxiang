
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import BookCard from './components/BookCard';
import { deconstructBook } from './services/geminiService';
import { BookDeconstruction, AppStatus } from './types';

const App: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<BookDeconstruction | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('book_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent, nameOverride?: string) => {
    if (e) e.preventDefault();
    const query = nameOverride || bookName;
    if (!query.trim()) return;

    setStatus(AppStatus.LOADING);
    setErrorMsg('');
    
    try {
      const data = await deconstructBook(query);
      setResult(data);
      setStatus(AppStatus.SUCCESS);
      
      // Update history
      const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('book_history', JSON.stringify(newHistory));
    } catch (error: any) {
      console.error(error);
      setStatus(AppStatus.ERROR);
      setErrorMsg(error?.message || "拆解失败，请重试。可能是书名太生僻或API请求问题。");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 serif-font mb-4 tracking-tight">
            每一本书都值得<span className="text-indigo-600">深度拆解</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            输入任何经典书籍的名称，由AI为您实时提炼核心精华，助您在碎片化时代快速构建知识体系。
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={(e) => handleSearch(e)} className="relative group">
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="输入书籍名称，例如：自私的基因..."
              className="w-full h-16 pl-6 pr-32 bg-white rounded-2xl shadow-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg transition-all"
            />
            <button
              type="submit"
              disabled={status === AppStatus.LOADING}
              className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              {status === AppStatus.LOADING ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              )}
              <span>立即拆解</span>
            </button>
          </form>

          {/* Search History Chips */}
          {history.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-widest mr-2">最近搜过</span>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => { setBookName(h); handleSearch(undefined, h); }}
                  className="px-3 py-1 bg-slate-200/50 hover:bg-indigo-100 text-slate-600 hover:text-indigo-600 rounded-lg text-xs transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {status === AppStatus.LOADING && (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-pulse">
              <div className="relative">
                <div className="w-20 h-24 bg-slate-200 rounded-lg flex items-center justify-center border-t-4 border-indigo-400">
                  <div className="w-12 h-1 bg-slate-300 rounded mb-2"></div>
                  <div className="w-10 h-1 bg-slate-300 rounded mb-2"></div>
                  <div className="w-8 h-1 bg-slate-300 rounded"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                   <svg className="w-4 h-4 text-white animate-spin" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-700 serif-font">正在为你深度阅读并拆解中...</h3>
                <p className="text-slate-400 text-sm mt-1">这可能需要 10-20 秒，Gemini 正在梳理整本书的脉络</p>
              </div>
            </div>
          )}

          {status === AppStatus.ERROR && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-red-800">拆解遇到麻烦</h4>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
                <button onClick={() => handleSearch()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                  重试一次
                </button>
              </div>
            </div>
          )}

          {status === AppStatus.SUCCESS && result && (
            <BookCard data={result} />
          )}

          {status === AppStatus.IDLE && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 font-bold">1</div>
                <h4 className="font-bold text-slate-800 mb-2">输入书名</h4>
                <p className="text-sm text-slate-500">无论是经典名著、商业圣经还是心理学杰作，只要存在，我们就能拆解。</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 font-bold">2</div>
                <h4 className="font-bold text-slate-800 mb-2">AI 深度学习</h4>
                <p className="text-sm text-slate-500">Gemini 3 会迅速扫描并分析书籍核心，提取最具有行动价值的知识点。</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 font-bold">3</div>
                <h4 className="font-bold text-slate-800 mb-2">获得精华卡片</h4>
                <p className="text-sm text-slate-500">一份精美的、结构化的阅读报告将呈现在您面前，助您在几分钟内读完一本书。</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">Powered by Gemini 3 Flash & React</p>
          <p className="text-slate-300 text-xs mt-2">© 2024 书影墨香 - 开启高效阅读新时代</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
