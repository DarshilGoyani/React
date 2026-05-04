import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      <Header/>
      <main className="max-w-[1300px] mx-auto pb-20">
        <Outlet />
      </main>
    </div>
  );
}