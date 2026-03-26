import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Form({allEmp, setAllEmp}) {
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [workMode, setWorkMode] = useState<string>("");
  const [hobby, setHobby] = useState<string[]>([]);
  const [designation, setDesignation] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [error, setError] = useState<any>({});


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

  const allHobby = ["Gaming", "Coding", "Sports", "Music", "Other"];
  const allCity = [
  "Ahmedabad", 
  "Surat", 
  "Vadodara", 
  "Rajkot", 
  "Bhavnagar", 
  "Jamnagar", 
  "Junagadh", 
  "Gandhinagar", 
  "Gandhidham", 
  "Anand", 
  "Navsari", 
  "Morbi", 
  "Nadiad", 
  "Surendranagar", 
  "Bharuch", 
  "Mehsana", 
  "Bhuj", 
  "Porbandar", 
  "Palanpur", 
  "Valsad", 
  "Vapi"
];
  const allDesignation = ["Manager", "HR", "Product Manager", "AI/ML Developer", "Fullstack Developer", "MERN stack Developer", "Frontend Developer", "Backend Developer", "Peon"];

  useEffect(() => {
    localStorage.setItem("Emp", JSON.stringify(allEmp));
  }, [allEmp]);

  const getEmpHobby = (event: any) => {
    const data = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHobby((abc) => [...abc, data]);
    } else {
      setHobby((prev) => prev.filter((myHobby) => myHobby !== data));
    }
  };

  const formValidation = () => {
    let newError: any = {};

    if (!fName) newError.fname = "First name is required";
    if (!lName) newError.lname = "Last name is required";

    const emailCheckPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newError.email = "Email is required";
    } else if (!emailCheckPattern.test(email)) {
      newError.email = "Invalid email address";
    }

    const phoneCheckPattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (!phone) {
      newError.phone = "Phone number is required";
    } else if (phone.length !== 10 || !phoneCheckPattern.test(phone)) {
      newError.phone = "Invalid 10-digit number";
    }

    if (!workMode) newError.workMode = "Work Mode is required";
    if (!gender) newError.gender = "Gender is required";
    if (hobby.length === 0) newError.hobby = "At least one hobby is required";
    if (!designation || designation === "select") newError.designation = "Designation is required";
    if (!city || city === "select") newError.city = "City is required";
    if (!address) newError.address = "Address is required";

    setError(newError);
    return Object.keys(newError).length;
  };

  const FormSubmit = (event: any) => {
    event.preventDefault();

    if (formValidation() !== 0) return;

    const empData: empSchema = {
      fName,
      lName,
      email,
      phone,
      workMode,
      gender,
      hobby,
      designation,
      city,
      address,
    };

    setAllEmp((prev) => [...prev, empData]);

    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setWorkMode("");
    setGender("");
    setHobby([]);
    setDesignation("");
    setCity("");
    setAddress("");
    setError({});

    toast.success("Employee added successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-12">
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-500 px-10 py-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Register Employee</h2>
        <p className="text-indigo-100 text-sm mt-1.5 font-medium">Please fill in workplace details to onboard a new profile.</p>
      </div>

      <form className="p-10 space-y-12" onSubmit={FormSubmit}>
        
        {/* SECTION 1: Personal Profile */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">1</span>
            <h3 className="text-md font-bold text-slate-800 uppercase tracking-wide">Personal Profile</h3>
          </div>
          <hr className="border-slate-100" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.fname ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50`}
                placeholder="John"
              />
              {error.fname && <p className="text-xs font-medium text-red-500 mt-1">{error.fname}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.lname ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50`}
                placeholder="Doe"
              />
              {error.lname && <p className="text-xs font-medium text-red-500 mt-1">{error.lname}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Work Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.email ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50`}
                placeholder="john.doe@company.com"
              />
              {error.email && <p className="text-xs font-medium text-red-500 mt-1">{error.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.phone ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50`}
                placeholder="9876543210"
              />
              {error.phone && <p className="text-xs font-medium text-red-500 mt-1">{error.phone}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Gender <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-4 pt-1">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className={`flex items-center space-x-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition ${gender === g ? "bg-indigo-50 border-indigo-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span className="text-sm font-semibold text-slate-700">{g}</span>
                </label>
              ))}
            </div>
            {error.gender && <p className="text-xs font-medium text-red-500 mt-1">{error.gender}</p>}
          </div>
        </div>

        {/* SECTION 2: Employment Logistics */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">2</span>
            <h3 className="text-md font-bold text-slate-800 uppercase tracking-wide">Employment Details</h3>
          </div>
          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Designation <span className="text-red-500">*</span></label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.designation ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50 cursor-pointer font-medium`}
              >
                <option value="select">Select Designation</option>
                {allDesignation.map((myDesignation, index) => (
                  <option key={index} value={myDesignation}>{myDesignation}</option>
                ))}
              </select>
              {error.designation && <p className="text-xs font-medium text-red-500 mt-1">{error.designation}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Work Mode <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-4 pt-1">
                {["On-site", "Remote", "Hybrid"].map((g) => (
                  <label key={g} className={`flex items-center space-x-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition ${workMode === g ? "bg-indigo-50 border-indigo-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}>
                    <input
                      type="radio"
                      name="work"
                      value={g}
                      checked={workMode === g}
                      onChange={(e) => setWorkMode(e.target.value)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span className="text-sm font-semibold text-slate-700">{g}</span>
                  </label>
                ))}
              </div>
              {error.workMode && <p className="text-xs font-medium text-red-500 mt-1">{error.workMode}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Cultural Preferences / Hobbies <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-1">
              {allHobby.map((myHobby, index) => (
                <label key={index} className={`flex items-center space-x-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition ${hobby.includes(myHobby) ? "bg-indigo-50 border-indigo-400" : "bg-slate-50 border-slate-200 hover:bg-slate-100"}`}>
                  <input
                    type="checkbox"
                    value={myHobby}
                    checked={hobby.includes(myHobby)}
                    onChange={getEmpHobby}
                    className="w-4 h-4 text-indigo-600 rounded-md focus:ring-indigo-500 border-slate-300"
                  />
                  <span className="text-sm font-semibold text-slate-700">{myHobby}</span>
                </label>
              ))}
            </div>
            {error.hobby && <p className="text-xs font-medium text-red-500 mt-1">{error.hobby}</p>}
          </div>
        </div>

        {/* SECTION 3: Location Details */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <span className="flex items-center justify-center w-7 h-7 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm">3</span>
            <h3 className="text-md font-bold text-slate-800 uppercase tracking-wide">Location Info</h3>
          </div>
          <hr className="border-slate-100" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Base City <span className="text-red-500">*</span></label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${error.city ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50 cursor-pointer font-medium`}
              >
                <option value="select">Select City</option>
                {allCity.map((myCity, index) => (
                  <option key={index} value={myCity}>{myCity}</option>
                ))}
              </select>
              {error.city && <p className="text-xs font-medium text-red-500 mt-1">{error.city}</p>}
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">Residential Address <span className="text-red-500">*</span></label>
              <textarea
                rows={1}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat details, street, and Zip code..."
                className={`w-full px-4 py-3 rounded-xl border ${error.address ? "border-red-500" : "border-slate-200"} focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition text-sm bg-slate-50 resize-none`}
              />
              {error.address && <p className="text-xs font-medium text-red-500 mt-1">{error.address}</p>}
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4.5 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-indigo-500/20 transform active:scale-[0.98] transition duration-200"
          >
            Register Workplace Employee
          </button>
        </div>
      </form>
    </div>
  );
}