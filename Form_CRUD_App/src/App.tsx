import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { employeeType } from "./utils/global";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [allEmployees, setAllEmployees] = useState<employeeType[]>(
    JSON.parse(localStorage.getItem("employees") || "[]"),
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editEmployee, setEditEmployee] = useState<employeeType>();

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(allEmployees));
  }, [allEmployees]);

  const deleteEmployee = (index: number) => {
    setAllEmployees((prev) => prev.filter((_, i) => i !== index));
    toast.error("Employee removed");
  };

  const updateEmployee = (index: number) => {
    setEditIndex(index);
    setEditEmployee(allEmployees[index]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Navigation/Header Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">EmpManager</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <Form
              allEmployees={allEmployees}
              setAllEmployees={setAllEmployees}
              editEmployee={editEmployee}
              editIndex={editIndex}
              setEditIndex={setEditIndex}
            />
          </div>

          {/* Right Column: Table & Stats */}
          <div className="lg:col-span-8">
            <Table
              allEmployees={allEmployees}
              deleteEmployee={deleteEmployee}
              updateEmployee={updateEmployee}
            />
          </div>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
}