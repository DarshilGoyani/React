import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { employeeType } from "../utils/global";

type propsType = {
  allEmployees: employeeType[];
  setAllEmployees: (value: React.SetStateAction<employeeType[]>) => void;
  editEmployee: employeeType | undefined;
  editIndex: number | null;
  setEditIndex: (value: React.SetStateAction<number | null>) => void;
};

export default function Form({ allEmployees, setAllEmployees, editEmployee, editIndex, setEditIndex }: propsType) {
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [hobby, setHobby] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [error, setError] = useState<any>({});

  const allHobby = ["Reading", "Gaming", "Sports", "Music", "Other"];
  const allCity = ["Surat", "Rajkot", "Mumbai", "UP", "Bihar"];

  useEffect(() => {
    if (editEmployee) {
      setFName(editEmployee.fName);
      setLName(editEmployee.lName);
      setEmail(editEmployee.email);
      setPhone(editEmployee.phone);
      setGender(editEmployee.gender);
      setHobby(editEmployee.hobby);
      setCity(editEmployee.city);
      setAddress(editEmployee.address);
    }
  }, [editEmployee]);

  const getEmployeeHobby = (event: any) => {
    const data = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHobby((abc) => [...abc, data]);
    } else {
      setHobby((hobby) => hobby.filter((myHobby) => myHobby !== data));
    }
  };

  const validation = () => {
    let newError: any = {};

    if (!fName) {
      newError.fname = "first name is required..";
    }

    if (!lName) {
      newError.lname = "last name is required..";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newError.email = "email is required..";
    } else if (!emailPattern.test(email)) {
      newError.email = "Invalid email address...";
    }

    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;

    if (!phone) {
      newError.phone = "phone number is required..";
    } else if (phone.length !== 10 || !phonePattern.test(phone)) {
      newError.phone = "Invalid phone number..";
    }

    if (!gender) {
      newError.gender = "gender is required..";
    }

    if (hobby.length === 0) {
      newError.hobby = "hobby is required..";
    }

    if (!city) {
      newError.city = "city is required..";
    }

    setError(newError);

    return Object.keys(newError).length;
  };

  const employeeFormSubmit = (event: any) => {
    event.preventDefault();

    if (validation() !== 0) {
      return;
    }

    const employeeData: employeeType = {
      fName,
      lName,
      email,
      phone,
      gender,
      hobby,
      city,
      address,
    };

    if (editIndex !== null) {
      let updateEmployee = [...allEmployees];
      updateEmployee[editIndex] = employeeData;
      setAllEmployees(updateEmployee);
      setEditIndex(null);
      toast.success("Employee updated successfully...");
    } else {
      setAllEmployees((allEmployees) => [...allEmployees, employeeData]);
      toast.success("Employee added succussfully...");
    }

    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setGender("");
    setHobby([]);
    setCity("");
    setAddress("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">
          {editIndex !== null ? "Edit Employee" : "New Registration"}
        </h2>
        <p className="text-sm text-slate-500">Fill in the employee details below.</p>
      </div>

      <form className="p-6 space-y-5" onSubmit={employeeFormSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">First Name</label>
            <input
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${error.fname ? "border-red-500 bg-red-50" : "border-slate-200"} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
              placeholder="John"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Last Name</label>
            <input
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${error.lname ? "border-red-500 bg-red-50" : "border-slate-200"} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 rounded-lg border ${error.email ? "border-red-500 bg-red-50" : "border-slate-200"} focus:ring-2 focus:ring-indigo-500 outline-none`}
            placeholder="john@company.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              <option value="">Select City</option>
              {allCity.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="1234567890"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase block mb-2">Gender</label>
          <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                /> {g}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 uppercase block">Hobbies</label>
          <div className="h-32 overflow-y-auto p-3 border border-slate-200 rounded-lg space-y-2 bg-white">
            {allHobby.map((h, i) => (
              <label key={i} className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50 p-1 rounded transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  value={h}
                  checked={hobby.includes(h)}
                  onChange={getEmployeeHobby}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                /> {h}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-white transition-all transform active:scale-[0.98] shadow-md ${
            editIndex !== null ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {editIndex !== null ? "Update Record" : "Create Employee"}
        </button>
      </form>
    </div>
  );
}