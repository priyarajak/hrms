import { Trash2, RefreshCw } from "lucide-react"
import TableSkeleton from "./TableSkeleton"

function EmployeeTable({ employees, onDelete, onRefresh, loading }) {

  const initials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-slate-200">

        <div>
          <h3 className="font-semibold text-slate-700">
            Employee Directory
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            {loading
              ? "Loading employees..."
              : `${employees.length} active employees`}
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
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <TableSkeleton />
            ) : employees.length === 0 ? (

              <tr>
                <td colSpan="4" className="text-center py-12 text-slate-400">
                  No employees found
                </td>
              </tr>

            ) : (

              employees.map((emp) => (

                <tr
                  key={emp.employee_id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  {/* Avatar + Name */}
                  <td className="p-4 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                      {initials(emp.name)}
                    </div>

                    <div>
                      <p className="text-slate-700 font-medium">
                        {emp.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {emp.employee_id}
                      </p>
                    </div>

                  </td>

                  <td className="p-4 text-slate-500">
                    {emp.email}
                  </td>

                  <td className="p-4 text-slate-500">
                    {emp.department}
                  </td>

                  <td className="p-4">
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