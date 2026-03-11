import { NavLink, useLocation } from "react-router-dom"
import { Users, CalendarDays } from "lucide-react"

function Navbar() {

  const location = useLocation()

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  const pageTitle =
    location.pathname === "/attendance"
      ? "Attendance Management"
      : "Employee Directory"

  return (
    <>

      {/* MOBILE HEADER */}
      <header className="bg-gray-900 text-white px-4 py-4 flex justify-between items-center md:hidden">

        <div>
          <h1 className="text-lg font-semibold">
            {pageTitle}
          </h1>

          <p className="text-xs text-gray-400">
            HRMS Lite
          </p>
        </div>

        <span className="text-xs text-gray-300">
          {today}
        </span>

      </header>


      {/* DESKTOP NAVBAR */}
      <header className="hidden md:flex justify-between items-center px-8 py-5 bg-white border-b">

        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            HRMS Lite
          </h1>

          <p className="text-xs text-slate-400">
            Employee & Attendance Management
          </p>
        </div>

        <nav className="flex gap-3">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
              ${isActive
                ? "bg-indigo-100 text-indigo-600"
                : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <Users size={18} />
            Employees
          </NavLink>

          <NavLink
            to="/attendance"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
              ${isActive
                ? "bg-indigo-100 text-indigo-600"
                : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <CalendarDays size={18} />
            Attendance
          </NavLink>

        </nav>

        <span className="text-sm text-slate-400">
          {today}
        </span>

      </header>

    </>
  )
}

export default Navbar