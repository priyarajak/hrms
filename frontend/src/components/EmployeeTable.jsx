import { Trash2, RefreshCw } from "lucide-react"
import Loader from "./Loader"
import TableSkeleton from "./TableSkeleton"

function EmployeeTable({ employees, onDelete, onRefresh, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200">
        <div>
          <h3 className="font-semibold text-slate-700">
            Employee Directory
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {loading? "Loading employees..." : `${employees.length} active employees`}
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-2 rounded-lg hover:bg-slate-200 transition"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-sm">
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
  {loading ? (
    <TableSkeleton/>
  ) : employees.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-10 text-slate-400">
        No employees found
      </td>
    </tr>
  ) : (
    employees.map((emp) => (
      <tr
        key={emp.employee_id}
        className="border-t border-slate-100 hover:bg-slate-50 transition"
      >
        <td className="p-4 text-slate-700 whitespace-nowrap">
          {emp.employee_id}
        </td>
        <td className="p-4 text-slate-700 whitespace-nowrap">
          {emp.name}
        </td>
        <td className="p-4 text-slate-500 whitespace-nowrap">
          {emp.email}
        </td>
        <td className="p-4 text-slate-500 whitespace-nowrap">
          {emp.department}
        </td>
        <td className="p-4 whitespace-nowrap">
          <button
            onClick={() => onDelete(emp.employee_id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>

    </div>
  )
}

export default EmployeeTable