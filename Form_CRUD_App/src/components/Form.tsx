import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Form() {
  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [hobby, setHobby] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [error, setError] = useState<any>({});

  const [allStudents, setAllStudents] = useState<studentSchema[]>(
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

  const allHobby = ["Gaming","Coding", "Sports", "Music", "Other"];
  const allCity = ["Surat", "Rajkot", "Mumbai", "UP", "Bihar"];

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(allStudents));
  }, [allStudents]);

  const getStudentHobby = (event: any) => {
    const data = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHobby((abc) => [...abc, data]);
    } else {
      setHobby((hobby) => hobby.filter((myHobby) => myHobby !== data));
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

    if (!gender) newError.gender = "Gender is required";
    if (hobby.length === 0) newError.hobby = "Hobby is required";
    if (!city || city === "select") newError.city = "City is required";
    if (!address) newError.address = "Address is required";

    setError(newError);
    return Object.keys(newError).length;
  };

  const FormSubmit = (event: any) => {
    event.preventDefault();

    if (formValidation() !== 0) return;

    const studentData: studentSchema = {
      fName,
      lName,
      email,
      phone,
      gender,
      hobby,
      city,
      address,
    };

    setAllStudents((allStudents) => [...allStudents, studentData]);

    setFName("");
    setLName("");
    setEmail("");
    setPhone("");
    setGender("");
    setHobby([]);
    setCity("");
    setAddress("");

    toast.success("Student added successfully!");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Student Registration</h2>
        <p className="text-indigo-100 text-sm mt-1">Please fill out all required fields</p>
      </div>

      <form className="p-8 space-y-6" onSubmit={FormSubmit}>
        {/* Name Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${error.fname ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50`}
              placeholder="John"
            />
            {error.fname && <p className="text-xs text-red-500">{error.fname}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${error.lname ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50`}
              placeholder="Doe"
            />
            {error.lname && <p className="text-xs text-red-500">{error.lname}</p>}
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${error.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50`}
              placeholder="john@example.com"
            />
            {error.email && <p className="text-xs text-red-500">{error.email}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${error.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50`}
              placeholder="9876543210"
            />
            {error.phone && <p className="text-xs text-red-500">{error.phone}</p>}
          </div>
        </div>

        {/* Gender Radios (Improved custom-button style) */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Gender <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-4 pt-1">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">{g}</span>
              </label>
            ))}
          </div>
          {error.gender && <p className="text-xs text-red-500">{error.gender}</p>}
        </div>

        {/* Hobby Checkboxes (Grid layout for modern looks) */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Hobbies <span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            {allHobby.map((myHobby, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  value={myHobby}
                  checked={hobby.includes(myHobby)}
                  onChange={getStudentHobby}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">{myHobby}</span>
              </label>
            ))}
          </div>
          {error.hobby && <p className="text-xs text-red-500">{error.hobby}</p>}
        </div>

        {/* Dropdown & Address split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">City <span className="text-red-500">*</span></label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${error.city ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50 cursor-pointer font-medium`}
            >
              <option value="select">Select city</option>
              {allCity.map((myCity, index) => <option key={index} value={myCity}>{myCity}</option>)}
            </select>
            {error.city && <p className="text-xs text-red-500">{error.city}</p>}
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="block text-sm font-semibold text-gray-700">Address <span className="text-red-500">*</span></label>
            <textarea
              rows={1}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full street address..."
              className={`w-full px-4 py-3 rounded-lg border ${error.address ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm bg-gray-50 resize-none`}
            />
            {error.address && <p className="text-xs text-red-500">{error.address}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transform active:scale-[0.98] transition duration-200"
        >
          Add Student
        </button>
      </form>
    </div>
  );
}