import { Trash2, RefreshCw } from "lucide-react"

function EmployeeTable({ employees, onDelete, onRefresh }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-700">
            Employee Directory
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {employees.length} registered employees
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200 transition"
        >
          <RefreshCw size={14}/> Refresh
        </button>
      </div>

      <table className="hidden md:table w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Department</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.employee_id}
              className="border-t border-slate-100 hover:bg-slate-50 transition"
            >
              <td className="p-4 text-slate-700">{emp.employee_id}</td>
              <td className="p-4 text-slate-700">{emp.name}</td>
              <td className="p-4 text-slate-500">{emp.email}</td>
              <td className="p-4 text-slate-500">{emp.department}</td>
              <td className="p-4">
                <button
                  onClick={() => onDelete(emp.employee_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile Employee Cards */}
<div className="md:hidden divide-y">
  {employees.map((emp) => (
    <div key={emp.employee_id} className="p-4 space-y-2">

      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-slate-800">{emp.name}</p>
          <p className="text-xs text-slate-400">{emp.employee_id}</p>
        </div>

        <button
          onClick={() => onDelete(emp.employee_id)}
          className="text-red-500"
        >
          <Trash2 size={16}/>
        </button>
      </div>

      <p className="text-xs text-slate-500">{emp.email}</p>
      <p className="text-xs text-slate-500">{emp.department}</p>

    </div>
  ))}
</div>
    </div>
  )
}

export default EmployeeTable