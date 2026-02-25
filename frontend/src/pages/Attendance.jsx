import { useEffect, useState } from "react"
import API from "../services/api"
import toast from "react-hot-toast"

function Attendance() {
  const [employees, setEmployees] = useState([])
  const [selectedEmp, setSelectedEmp] = useState("")
  const [date, setDate] = useState("")
  const [status, setStatus] = useState("Present")

  const [searchEmp, setSearchEmp] = useState("")
  const [records, setRecords] = useState([])
  const [presentCount, setPresentCount] = useState(0)
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const today = new Date().toLocaleDateString("en-CA")

  const fetchEmployees = async () => {
    const res = await API.get("/employees")
    setEmployees(res.data)
  }

  const fetchAttendance = async (empId) => {
  if (!empId) return
  const res = await API.get(`/attendance/${empId}`)
  let data = res.data

  if (fromDate)
    data = data.filter(r => r.date >= fromDate)
  if (toDate)
    data = data.filter(r => r.date <= toDate)

  data.sort((a, b) => new Date(b.date) - new Date(a.date))

  setRecords(data)
  setPresentCount(data.filter(r => r.status==="Present").length)
}

  const resetForm = () => {
    setSelectedEmp("")
    setDate("")
    setStatus("Present")
  }

  const markAttendance = async (e) => {
    e.preventDefault()
    try {
  await API.post("/attendance", {
    employee_id: selectedEmp,
    date,
    status,
  })

  toast.success("Attendance marked")
  fetchAttendance(searchEmp || selectedEmp)
  resetForm()

} catch (err) {
  toast.error(err.response?.data?.detail || "Error marking attendance")
}
  }

  useEffect(()=>{ fetchEmployees() },[])
  useEffect(()=>{ fetchAttendance(searchEmp) },[searchEmp, fromDate, toDate])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* LEFT CARD */}
      <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="font-semibold text-slate-800">Mark Attendance</h3>
        <p className="text-sm text-slate-400 mb-6">
          Record attendance for an employee.
        </p>

        <form onSubmit={markAttendance} className="space-y-4 text-sm">

          <div>
            <label className="text-xs text-slate-400">Employee</label>
            <select
              value={selectedEmp}
              required
              onChange={(e)=>setSelectedEmp(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 bg-slate-50"
            >
              <option value="" disabled>Select employee</option>
              {employees.map(emp=>(
                <option key={emp.employee_id} value={emp.employee_id}>
                  {emp.name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400">Date</label>
            <input
  type="date"
  required
  max={today}
  value={date}
  onChange={(e)=>setDate(e.target.value)}
  className="w-full mt-1 p-3 rounded-xl border border-slate-200 bg-slate-50"
/>
          </div>

          <div>
            <label className="text-xs text-slate-400">Status</label>
            <select value={status}
              onChange={(e)=>setStatus(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl border border-slate-200 bg-slate-50">
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>

          <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-600 transition">
            Mark Attendance
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 space-y-6">

  <div>
    <h3 className="font-semibold text-slate-800">Attendance History</h3>
    <p className="text-sm text-slate-400">
      Select an employee to view attendance details
    </p>
  </div>

  <select
    value={searchEmp}
    onChange={(e)=>setSearchEmp(e.target.value)}
    className="w-full p-3 rounded-xl border text-slate-600 bg-white"
  >
    <option value="" disabled>Select employee to view attendance records.</option>
    {employees.map(emp=>(
      <option key={emp.employee_id} value={emp.employee_id}>
        {emp.name} ({emp.employee_id})
      </option>
    ))}
  </select>

  {!searchEmp ? (

    /* EMPTY STATE */
    <div className="bg-white rounded-2xl border border-slate-200 
        flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-slate-100 p-4 rounded-full mb-4">
        📅
      </div>
      <p className="text-slate-400 text-sm">
        Select an employee above to view history
      </p>
    </div>

  ) : (

    <>
      {/* DATE FILTERS */}
<div className=" rounded-2xl p-1">
  <div className="grid grid-cols-2 gap-6 text-sm">

    {/* FROM DATE */}
    <div className="flex flex-col">
      <label className="text-m text-slate-400 mb-1">
        From Date
      </label>
      <input
        type="date"
        value={fromDate}
        onChange={(e)=>setFromDate(e.target.value)}
        className="p-3 rounded-xl border border-slate-200 bg-slate-50"
      />
    </div>

    {/* TO DATE */}
    <div className="flex flex-col">
      <label className="text-m text-slate-400 mb-1">
        To Date
      </label>
      <input
        type="date"
        value={toDate}
        onChange={(e)=>setToDate(e.target.value)}
        className="p-3 rounded-xl border border-slate-200 bg-slate-50"
      />
    </div>

  </div>
</div>

      {/* SUMMARY */}
      <div className="bg-green-50 border border-green-200 text-green-700 
          px-5 py-2 rounded-xl flex justify-between ">
        <span>Attendance Summary</span>
        <span className="bg-green-100 px-3 py-1 rounded-full text-sm">
          {presentCount} days present
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

        <div className="grid grid-cols-2 bg-slate-50 text-slate-500 text-xs p-4">
          <span>DATE</span>
          <span>STATUS</span>
        </div>

        {records.map(r=>(
          <div key={r.id} className="grid grid-cols-2 p-4 border-t text-sm">
            <span className="text-slate-600">{r.date}</span>

            {r.status==="Present" ? (
              <span className="text-green-600 bg-green-100 border border-green-200 px-3 py-1 rounded-full w-fit">
                Present
              </span>
            ) : (
              <span className="text-red-600 bg-red-100 border border-red-200 px-3 py-1 rounded-full w-fit">
                Absent
              </span>
            )}
          </div>
        ))}

      </div>
    </>
  )}
</div>
    </div>
  )
}

export default Attendance