import { useState } from "react";

export default function Table({ allEmployees, deleteEmployee, updateEmployee }: any) {
  const [search, setSearch] = useState("");

  const filtered = allEmployees.filter((e: any) => 
    e.fName.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800">Active Directory</h3>
          <p className="text-slate-400 font-medium text-sm italic">Total members: {allEmployees.length}</p>
        </div>
        <div className="w-full md:w-80">
          <input 
            type="text" placeholder="Quick search..." 
            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((emp: any, index: number) => (
          <div key={index} className="group bg-white hover:bg-indigo-50/50 border border-slate-100 rounded-[1.5rem] p-5 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                {emp.fName[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">{emp.fName} {emp.lName}</h4>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-[10px] font-black uppercase tracking-tighter">
                    {emp.department || "No Dept"}
                  </span>
                  <span className="text-slate-400 text-xs font-medium">{emp.email}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {emp.skills?.map((s: string) => (
                <span key={s} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-500 rounded-full text-[10px] font-bold">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex gap-3 w-full md:w-auto justify-end">
              <button onClick={() => updateEmployee(index)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={() => deleteEmployee(index)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-slate-100/50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No teammates found in this view.</p>
          </div>
        )}
      </div>
    </div>
  );
}