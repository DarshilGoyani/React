import { useEffect, useState } from "react";
import type { employeeType } from "../utils/global";

type propsType = {
  allEmployees: employeeType[];
  deleteEmployee: (index: number) => void;
  updateEmployee: (index: number) => void;
};

export default function Table({ allEmployees, deleteEmployee, updateEmployee }: propsType) {
  const [numberOfCity, setNumberOfCity] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    let allCity: any;

    allCity = allEmployees.map((employee) => {
      return employee.city;
    });

    allCity = new Set([...allCity]);

    setNumberOfCity(allCity.size);
  }, [allEmployees]);

  const filterEmployees = allEmployees.filter((employee) => {
    return (
      employee.fName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lName.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: allEmployees.length, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Male', value: allEmployees.filter(e => e.gender === "Male").length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Female', value: allEmployees.filter(e => e.gender === "Female").length, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Cities', value: numberOfCity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Location</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filterEmployees.map((employee, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                        {employee.fName[0]}{employee.lName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{employee.fName} {employee.lName}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${employee.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                          {employee.gender}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600">{employee.email}</p>
                    <p className="text-xs text-slate-400">{employee.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-700 font-medium">{employee.city}</p>
                    <p className="text-xs text-slate-400 truncate max-w-[150px]">{employee.address}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => updateEmployee(index)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => deleteEmployee(index)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filterEmployees.length === 0 && (
            <div className="py-20 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              </div>
              <p className="text-slate-500 font-medium">No employees found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}