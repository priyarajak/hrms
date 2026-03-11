import { useEffect, useState } from "react"
import API from "../services/api"
import EmployeeTable from "../components/EmployeeTable"
import toast from "react-hot-toast"

function Employees() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState("")
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  })
  const [loading, setLoading] = useState(true)
  const [presentToday, setPresentToday] = useState(0)

  const fetchEmployees = async () => {
    setLoading(true)
    const res = await API.get("/employees")
    setEmployees(res.data)
    setLoading(false)
  }


  const fetchPresentToday = async () => {
  try {
    const res = await API.get("/attendance/today/present-count")

    console.log("Present Today:", res.data)

    setPresentToday(res.data.present_today)

  } catch (err) {
    console.error(err)
  }
}
useEffect(() => {
  fetchEmployees()
  fetchPresentToday()
}, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post("/employees", form)
      toast.success("Employee added successfully")
      setForm({ employee_id: "", name: "", email: "", department: "" })
      fetchEmployees()
      fetchPresentToday()
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong")
    }
  }

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    )

    if (!confirmDelete) return

    try {
      await API.delete(`/employees/${id}`)
      toast.success("Employee deleted successfully")
      fetchEmployees()
      fetchPresentToday()
    } catch {
      toast.error("Unable to delete employee")
    }
  }

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 px-4 sm:px-0">

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400">Directory Size</p>
          <p className="text-2xl font-semibold text-slate-700">
            {employees.length}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs text-slate-400">Departments</p>
          <p className="text-2xl font-semibold text-slate-700">
            {[...new Set(employees.map((e) => e.department))].length}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <p className="text-xs text-slate-400">Present Today</p>
    <p className="text-2xl font-semibold text-emerald-600">
      {presentToday}
    </p>
  </div>


      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-10">

        {/* Form */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold text-slate-700">
            Add Employee
          </h3>

          <p className="text-xs text-slate-400 mb-6">
            Register a new employee in the organization
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">

            <div>
              <label className="text-xs text-slate-600 font-medium">
                Employee ID
              </label>
              <input
                name="employee_id"
                placeholder="EMP001"
                value={form.employee_id}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 font-medium">
                Full Name
              </label>
              <input
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="text-xs text-slate-600 font-medium">
                Department
              </label>
              <input
                name="department"
                placeholder="Engineering"
                value={form.department}
                onChange={handleChange}
                className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-700 transition">
              Add Employee
            </button>

          </form>
        </div>

        {/* Employee Table */}
        <div className="lg:col-span-7 space-y-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3 text-sm"
          />

          <EmployeeTable
            employees={filteredEmployees}
            onDelete={deleteEmployee}
            onRefresh={fetchEmployees}
            loading={loading}
          />

        </div>
      </div>
    </div>
  )
}

export default Employees