import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { MonitoringInput } from './components/MonitoringInput';
import { MonthlyDashboard } from './components/MonthlyDashboard';
import { MOCK_STUDENTS } from './constants';
import { DailyRecord, Student } from './types';
import { Search, Bell, Calendar as CalendarIcon, Settings, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function App() {
  const [activeTab, setActiveTab] = useState('input');
  const [selectedStudent, setSelectedStudent] = useState<Student>(MOCK_STUDENTS[0]);
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [currentDate] = useState(new Date());

  const handleSaveRecord = (newRecord: DailyRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    // Navigate to dashboard to see the update
    setActiveTab('dashboard');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Section */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-8 flex-1">
            <div className="relative w-full max-w-md group">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search students, indicators, or reports..." 
                className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
               <CalendarIcon size={16} className="text-slate-400" />
               <span className="text-sm font-semibold text-slate-600">
                {format(currentDate, 'EEEE, d MMM yyyy', { locale: id })}
               </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-500 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-500 rounded-xl transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col p-8 gap-8">
          <div className="flex justify-between items-end shrink-0">
            <div>
              <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                {activeTab === 'input' ? 'Active Monitoring' : 'Academic Insights'}
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  {selectedStudent.name}
                </h2>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-500 shadow-sm">
                  {selectedStudent.class}
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
               <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
                Student Profile
              </button>
              <button 
                onClick={() => setActiveTab(activeTab === 'input' ? 'dashboard' : 'input')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                {activeTab === 'input' ? 'View Dashboard' : 'Daily Monitoring'}
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            {activeTab === 'input' && (
              <MonitoringInput student={selectedStudent} onSave={handleSaveRecord} />
            )}
            {activeTab === 'dashboard' && (
              <MonthlyDashboard student={selectedStudent} records={records} />
            )}
            {activeTab === 'students' && (
              <div className="h-full flex items-center justify-center bg-white rounded-3xl border border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-xs">
                Student Database Module - Coming Soon
              </div>
            )}
            {activeTab === 'reports' && (
              <div className="h-full flex items-center justify-center bg-white rounded-3xl border border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-xs">
                Report Archives Module - Coming Soon
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
