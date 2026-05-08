import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { employeeType } from "../utils/global";

export default function Form({ allEmployees, setAllEmployees, editEmployee, editIndex, setEditIndex }: any) {
  const [formData, setFormData] = useState({
    fName: "", lName: "", email: "", phone: "", gender: "", skills: [] as string[], department: "", address: ""
  });

  const allSkills = ["React", "Node.js", "Design", "Marketing", "Sales"];
  const allDepts = ["Engineering", "Product", "Growth", "Finance", "People"];

  useEffect(() => {
    if (editEmployee) setFormData(editEmployee);
  }, [editEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fName || !formData.email) return toast.warning("Fields cannot be empty!");

    if (editIndex !== null) {
      const updated = [...allEmployees];
      updated[editIndex] = formData;
      setAllEmployees(updated);
      setEditIndex(null);
      toast.success("Profile updated!");
    } else {
      setAllEmployees([...allEmployees, formData]);
      toast.success("Employee Onboarded!");
    }
    setFormData({ fName: "", lName: "", email: "", phone: "", gender: "", skills: [], department: "", address: "" });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white shadow-2xl rounded-[2rem] p-8 md:p-10 mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-1.5 bg-indigo-600 rounded-full"></div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-800">
            {editIndex !== null ? "Edit Member" : "New Onboarding"}
          </h2>
          <p className="text-slate-500 font-medium text-sm italic">Workspace Core System v2.0</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Identity</label>
            <div className="flex gap-4">
              <input type="text" placeholder="First Name" className="flex-1 bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
              value={formData.fName} onChange={e => setFormData({...formData, fName: e.target.value})} />
              <input type="text" placeholder="Last Name" className="flex-1 bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
              value={formData.lName} onChange={e => setFormData({...formData, lName: e.target.value})} />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Contact Details</label>
            <input type="email" placeholder="Work Email" className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 mb-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number" className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
            value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">Placement</label>
            <select className="w-full bg-slate-100/50 border-none rounded-2xl px-5 py-4 appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
              <option value="">Select Department</option>
              {allDepts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">Core Competencies</label>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <button key={skill} type="button" 
                onClick={() => {
                  const newSkills = formData.skills.includes(skill) ? formData.skills.filter(s => s !== skill) : [...formData.skills, skill];
                  setFormData({...formData, skills: newSkills})
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${formData.skills.includes(skill) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-3xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-slate-200">
            {editIndex !== null ? "Save Update" : "Confirm Onboarding"}
          </button>
        </div>
      </form>
    </div>
  );
}