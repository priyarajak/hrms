import { Link, useLocation } from "react-router-dom"
import { Users, CalendarDays } from "lucide-react"

function Navbar() {
  const location = useLocation()

  const linkStyleDesktop = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600"
        : "text-slate-600 hover:bg-slate-100"
    }`

  const linkStyleMobile = (path) =>
    `flex flex-col items-center text-xs ${
      location.pathname === path ? "text-indigo-600" : "text-slate-400"
    }`

  return (
    <>
      {/* DESKTOP NAVBAR (TOP) */}
      <div className="hidden md:block bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">
            HRMS Lite
          </h1>

          <div className="flex gap-3">
            <Link to="/" className={linkStyleDesktop("/")}>
              <Users size={18} />
              Employees
            </Link>

            <Link to="/attendance" className={linkStyleDesktop("/attendance")}>
              <CalendarDays size={18} />
              Attendance
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR (BOTTOM) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around items-center py-3">

          <Link to="/" className={linkStyleMobile("/")}>
            <Users size={22} />
            Employees
          </Link>

          <Link to="/attendance" className={linkStyleMobile("/attendance")}>
            <CalendarDays size={22} />
            Attendance
          </Link>

        </div>
      </div>
    </>
  )
}

export default Navbar