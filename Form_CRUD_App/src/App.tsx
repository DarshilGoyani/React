import Form from "./components/Form";
import Table from "./components/Table";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 7xl max-width takes care of table squishing on desktops */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl mx-auto">
          <Form />
        </div>
        
        <hr className="border-gray-200" />

        <Table />
      </div>
    </div>
  );
}