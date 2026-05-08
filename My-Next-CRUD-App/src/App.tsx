import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { employeeType } from "./utils/global";

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
    toast.error("Employee record deleted");
  };

  const updateEmployee = (index: number) => {
    setEditIndex(index);
    setEditEmployee(allEmployees[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-20">
      {/* Decorative Background Blur */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-100 blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-12">
        <Form
          allEmployees={allEmployees}
          setAllEmployees={setAllEmployees}
          editEmployee={editEmployee}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />

        <Table
          allEmployees={allEmployees}
          deleteEmployee={deleteEmployee}
          updateEmployee={updateEmployee}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}