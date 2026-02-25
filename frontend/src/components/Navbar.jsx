import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X, Users, CalendarDays } from "lucide-react"

function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const linkStyle = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600"
        : "text-slate-600 hover:bg-slate-100"
    }`

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Logo */}
        <h1 className="text-lg font-semibold text-slate-800">
          HRMS Lite
        </h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-3">
          <Link to="/" className={linkStyle("/")}>
            <Users size={18} /> Employees
          </Link>

          <Link to="/attendance" className={linkStyle("/attendance")}>
            <CalendarDays size={18} /> Attendance
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 border-t">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={linkStyle("/")}
          >
            <Users size={18}/> Employees
          </Link>

          <Link
            to="/attendance"
            onClick={() => setOpen(false)}
            className={linkStyle("/attendance")}
          >
            <CalendarDays size={18}/> Attendance
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar