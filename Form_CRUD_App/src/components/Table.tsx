import { useEffect, useState } from "react";

export default function Table({allEmp }) {
  

  return (
    <div className="space-y-10 max-w-7xl mx-auto my-12 px-4">
      {/* Top Search / Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">Employee Directory</h3>
          <p className="text-sm text-slate-500 font-medium mt-1">Review and manage dynamic employment profiles with ease.</p>
        </div>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search employees or parameters..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none font-medium text-sm shadow-sm transition"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Table Window */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {["No", "First Name", "Last Name", "Email", "Phone", "Gender", "Work Mode", "Interests", "Designation", "City", "Address", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {allEmp.map((employee, index) => (
                <tr key={index} className="hover:bg-indigo-50/30 transition duration-150">
                  <td className="px-6 py-4.5 text-sm font-bold text-slate-900">{index + 1}</td>
                  <td className="px-6 py-4.5 text-sm font-semibold text-slate-800">{employee.fName}</td>
                  <td className="px-6 py-4.5 text-sm text-slate-700">{employee.lName}</td>
                  <td className="px-6 py-4.5 text-sm font-medium text-indigo-600 truncate max-w-[150px]">{employee.email}</td>
                  <td className="px-6 py-4.5 text-sm text-slate-600 font-medium">{employee.phone}</td>
                  <td className="px-6 py-4.5">
                    <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-full ${
                      employee.gender === "Male" ? "bg-blue-100 text-blue-800" :
                      employee.gender === "Female" ? "bg-pink-100 text-pink-800" : "bg-purple-100 text-purple-800"
                    }`}>
                      {employee.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-full ${
                      employee.workMode === "On-site" ? "bg-amber-100 text-amber-800" :
                      employee.workMode === "Remote" ? "bg-emerald-100 text-emerald-800" : "bg-teal-100 text-teal-800"
                    }`}>
                      {employee.workMode}
                    </span>
                  </td>
                  <td className="px-6 py-4.5">
                    <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                      {employee.hobby.map((h, i) => <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 font-semibold rounded-md text-xs">{h}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4.5 text-sm font-medium text-slate-800">{employee.designation}</td>
                  <td className="px-6 py-4.5 text-sm font-medium text-slate-800">{employee.city}</td>
                  <td className="px-6 py-4.5 text-sm text-slate-500 font-medium truncate max-w-[150px]">{employee.address}</td>
                  <td className="px-6 py-4.5">
                    <div className="flex space-x-3">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}