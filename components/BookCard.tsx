
import React from 'react';
import { BookDeconstruction } from '../types';

interface BookCardProps {
  data: BookDeconstruction;
}

const BookCard: React.FC<BookCardProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fadeIn">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-white/20 rounded text-xs backdrop-blur-md uppercase tracking-wider">{data.genre}</span>
              <div className="flex items-center">
                <span className="text-amber-400">★</span>
                <span className="ml-1 text-sm font-semibold">{data.rating}/10</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold serif-font mb-2 leading-tight">{data.title}</h1>
            <p className="text-indigo-100 text-lg opacity-90">作者：{data.author}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 md:max-w-xs">
            <p className="text-sm font-medium mb-1 text-indigo-100 uppercase tracking-widest">一句话精华</p>
            <p className="text-sm leading-relaxed">{data.oneSentenceSummary}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-12">
        {/* Core Themes & Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h3 className="flex items-center gap-2 text-indigo-700 font-bold mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 7h.01M7 11h.01M7 15h.01M11 7h.01M11 11h.01M11 15h.01M15 7h.01M15 11h.01M15 15h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              核心主题
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.mainThemes.map((theme, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium border border-indigo-100 italic">
                  #{theme}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h3 className="flex items-center gap-2 text-emerald-700 font-bold mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              推荐读众
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {data.targetAudience.map((target, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  {target}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Chapter Breakdown */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 serif-font">深度拆解</h3>
            <span className="text-slate-400 text-sm">共 {data.keyChapters.length} 个核心板块</span>
          </div>
          <div className="space-y-4">
            {data.keyChapters.map((chapter, i) => (
              <div key={i} className="group p-6 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-full font-bold text-lg">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{chapter.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">{chapter.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Takeaways */}
        <section className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
          <h3 className="flex items-center gap-2 text-amber-800 font-bold text-xl mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            行动指南：你可以学到什么？
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.practicalTakeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 flex-shrink-0 w-5 h-5 text-amber-500">
                  <svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                </div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Critical Review */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 serif-font mb-4">深度透视</h3>
          <div className="relative p-6 bg-slate-900 text-slate-200 rounded-xl">
            <svg className="absolute top-4 left-4 w-8 h-8 text-slate-700 opacity-50" fill="currentColor" viewBox="0 0 32 32"><path d="M10 8v8h4l-2 5h3l2-5V8h-7zm9 0v8h4l-2 5h3l2-5V8h-7z"/></svg>
            <p className="relative italic leading-relaxed text-slate-300 z-10 pl-8">
              {data.criticalReview}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookCard;
