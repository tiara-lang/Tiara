import React, { useMemo, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from 'motion/react';
import { Student, DailyRecord } from '../types';
import { GRADE_CATEGORY } from '../constants';
import { TrendingUp, Award, Calendar, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { generateStudentConclusion } from '../services/geminiService';

interface DashboardProps {
  student: Student;
  records: DailyRecord[];
}

export const MonthlyDashboard = ({ student, records }: DashboardProps) => {
  const [aiConclusion, setAiConclusion] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = useMemo(() => {
    if (records.length === 0) return null;
    // ... rest of stats logic remains same
    const allScores = records.flatMap(r => Object.values(r.scores));
    const avg = allScores.reduce((a, b) => a + b, 0) / (allScores.length || 1);
    const percentage = (avg / 5) * 100;
    const { grade, category } = GRADE_CATEGORY(percentage);

    const trendData = [...records].reverse().map(r => ({
      date: new Date(r.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      score: Object.values(r.scores).reduce((a, b) => a + b, 0) / (Object.values(r.scores).length || 1)
    })).slice(-7);

    return { avg, percentage, grade, category, trendData };
  }, [records]);

  const handleGenerateAiConclusion = async () => {
    setIsGenerating(true);
    const conclusion = await generateStudentConclusion(student, records);
    setAiConclusion(conclusion);
    setIsGenerating(false);
  };

  if (!stats) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300 p-12">
        <AlertCircle size={48} className="mb-4 opacity-20" />
        <h3 className="font-bold text-slate-700">No Assessment Data Yet</h3>
        <p className="text-sm">Complete a daily monitoring entry to unlock insights.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Top Stats */}
      <div className="col-span-12 lg:col-span-12 grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Average</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-800">{stats.avg.toFixed(1)}</span>
            <span className="text-xs text-slate-400 font-medium mb-1">/ 5.0</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-bold">
            <TrendingUp size={14} /> +12% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score Percentile</p>
          <div className="flex items-end gap-2 text-blue-600">
            <span className="text-3xl font-black">{stats.percentage.toFixed(0)}%</span>
            <Award size={20} className="mb-1" />
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${stats.percentage}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl shadow-slate-900/10">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Current Grade</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{stats.grade}</span>
            <span className="text-xs text-slate-500 font-medium">{stats.category}</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-medium">Standardized Evaluation</p>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl shadow-blue-600/20">
          <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1">Total Logs</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black">{records.length}</span>
            <Calendar size={24} className="opacity-50" />
          </div>
          <p className="text-[10px] text-blue-200 mt-3 font-medium">Entries for Jan 2026</p>
        </div>
      </div>

      {/* Main Charts */}
      <section className="col-span-12 lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="font-bold text-slate-800">Learning Progress Trend</h3>
            <p className="text-xs text-slate-400 mt-1">Daily skill acquisition scores across all categories</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">Daily</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-400">Weekly</button>
          </div>
        </div>

        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                domain={[0, 5]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2563EB" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Sidebar Metrics */}
      <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1">
          <h3 className="font-bold text-slate-800 mb-6">Subject Breakdown</h3>
          <div className="space-y-6">
            {[
              { label: 'Literasi', val: 78, color: 'bg-blue-500' },
              { label: 'Numerasi', val: 92, color: 'bg-green-500' },
              { label: 'Sosial-Emosional', val: 64, color: 'bg-amber-500' },
              { label: 'Kemandirian', val: 81, color: 'bg-purple-500' }
            ].map(item => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">{item.label}</span>
                  <span className="text-[11px] font-black text-slate-400">{item.val}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${item.color} h-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h3 className="text-sm font-black text-blue-900 mb-2 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500" />
            AI Conclusion
          </h3>
          
          {aiConclusion ? (
            <p className="text-xs text-blue-700/80 mb-4 font-medium leading-relaxed italic">
              "{aiConclusion}"
            </p>
          ) : (
            <p className="text-xs text-blue-700/70 mb-4 font-medium leading-relaxed">
              Generate a data-driven narrative summary for the monthly report using AI.
            </p>
          )}

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={handleGenerateAiConclusion}
              disabled={isGenerating}
              className="py-2.5 bg-blue-600 rounded-xl text-[10px] font-black text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  ANALYZING DATA...
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  {aiConclusion ? 'REGENERATE SUMMARY' : 'GENERATE DRAFT'}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex-1">
          <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest">Report Tools</h3>
          <div className="grid grid-cols-1 gap-3">
            <button className="py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 hover:bg-slate-50 transition-all">
              EXPORT MONTHLY PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
