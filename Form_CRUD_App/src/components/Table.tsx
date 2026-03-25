import { useEffect, useState } from "react";

export default function Table() {
  const [allStudents] = useState<studentSchema[]>(
    JSON.parse(localStorage.getItem("students") || "[]")
  );

  type studentSchema = {
    fName: string;
    lName: string;
    email: string;
    phone: string;
    gender: string;
    hobby: string[];
    city: string;
    address: string;
  };

  return (
    <div className="space-y-8">
      {/* Top Search / Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Student Directory</h3>
          <p className="text-sm text-slate-500">Overview of all active student records</p>
        </div>
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search directory..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm shadow-sm transition"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Table Window */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["No", "First Name", "Last Name", "Email", "Phone", "Gender", "Hobby", "City", "Address", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {allStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition duration-150">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{student.fName}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{student.lName}</td>
                  <td className="px-6 py-4 text-sm text-indigo-600 truncate max-w-[150px]">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{student.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${
                      student.gender === "Male" ? "bg-blue-100 text-blue-800" :
                      student.gender === "Female" ? "bg-pink-100 text-pink-800" : "bg-purple-100 text-purple-800"
                    }`}>
                      {student.gender}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {student.hobby.map((h, i) => <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{h}</span>)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800">{student.city}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-[150px]">{student.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-slate-400 hover:text-indigo-600 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="text-slate-400 hover:text-red-600 transition">
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