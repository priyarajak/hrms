import { useEffect, useState } from "react"
import API from "../services/api"
import EmployeeTable from "../components/EmployeeTable"
import toast from "react-hot-toast"

function Employees() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  })

  const fetchEmployees = async () => {
    const res = await API.get("/employees")
    setEmployees(res.data)
  }

  useEffect(() => {
    fetchEmployees()
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
    } catch (err) {
      toast.error(err.response?.data?.detail || "Something went wrong")
    }
  }

  const deleteEmployee = async (id) => {
    
    await API.delete(`/employees/${id}`)
    toast.success("Employee deleted")
    fetchEmployees()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">

      {/* 30% Form */}
      <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-base font-semibold text-slate-700">
  Add Employee
</h3>
<p className="text-xs text-slate-400 mb-6">
  Register a new employee in the organization
</p>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">

          <div>
            <label className="text-xs text-slate-600 font-medium">Employee ID</label>
            <input
              name="employee_id"
              placeholder="EMP001"
              value={form.employee_id}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-medium">Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-medium">Email</label>
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
            <label className="text-xs text-slate-600 font-medium">Department</label>
            <input
              name="department"
              placeholder="Engineering"
              value={form.department}
              onChange={handleChange}
              className="w-full mt-1 p-2.5 border border-slate-200 rounded-lg"
            />
          </div>

          <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-600 transition">
            Add Employee
          </button>

        </form>
      </div>

      {/* 70% Table */}
      <div className="lg:col-span-7">
        <EmployeeTable
          employees={employees}
          onDelete={deleteEmployee}
          onRefresh={fetchEmployees}
        />
      </div>

    </div>
  )
}

export default Employees