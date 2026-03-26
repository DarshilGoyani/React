import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

export default function App() {

  const [allEmp, setAllEmp] = useState<empSchema[]>(JSON.parse(localStorage.getItem("Emp") || "[]"));

  useEffect(() => {
    localStorage.setItem("Emp", JSON.stringify(allEmp));
  }, [allEmp]);

  type empSchema = {
    fName: string;
    lName: string;
    email: string;
    phone: string;
    gender: string;
    workMode: string;
    hobby: string[];
    designation: string;
    city: string;
    address: string;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 7xl max-width takes care of table squishing on desktops */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl mx-auto">
          <Form allEmp={allEmp} setAllEmp={setAllEmp} />
        </div>
        
        <hr className="border-gray-200" />

        <Table allEmp={allEmp} />
      </div>
    </div>
  );
}