import { NavLink, useLocation } from "react-router-dom"
import { Users, CalendarDays } from "lucide-react"
import { useState } from "react"

function Navbar() {
  const location = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  const isActive = (path) => location.pathname === path

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="hidden md:block bg-white border-b">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">HRMS Lite</h1>

          <nav className="flex gap-3">
            <NavLink
              to="/"
              className={`px-4 py-2 rounded-lg text-sm ${
                isActive("/") ? "bg-indigo-100 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Employees
            </NavLink>

            <NavLink
              to="/attendance"
              className={`px-4 py-2 rounded-lg text-sm ${
                isActive("/attendance") ? "bg-indigo-100 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              Attendance
            </NavLink>
          </nav>

          <span className="text-sm text-slate-400">{today}</span>
        </div>
      </header>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden flex justify-between items-center bg-gray-900 text-white p-4">
        <h1 className="text-lg font-semibold">HRMS Lite</h1>
        <button onClick={() => setMobileMenu(!mobileMenu)}>☰</button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-b">
          <NavLink
            to="/"
            onClick={() => setMobileMenu(false)}
            className="block px-4 py-3 border-b text-slate-700"
          >
            Employees
          </NavLink>
          <NavLink
            to="/attendance"
            onClick={() => setMobileMenu(false)}
            className="block px-4 py-3 text-slate-700"
          >
            Attendance
          </NavLink>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-2">

          <NavLink
            to="/"
            className={`flex flex-col items-center text-xs ${
              isActive("/") ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <Users size={22} />
            Employees
          </NavLink>

          <NavLink
            to="/attendance"
            className={`flex flex-col items-center text-xs ${
              isActive("/attendance") ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <CalendarDays size={22} />
            Attendance
          </NavLink>

        </div>
      </nav>
    </>
  )
}

export default Navbar