import { Link, useLocation } from "react-router-dom"

function Navbar() {
  const location = useLocation()

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-600 hover:bg-slate-200"
    }`

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">HRMS Lite</h1>

        <div className="flex gap-3">
  <Link to="/" className={linkStyle("/")}>Employees</Link>
  <Link to="/attendance" className={linkStyle("/attendance")}>Attendance</Link>
</div>
      </div>
    </div>
  )
}

export default Navbar