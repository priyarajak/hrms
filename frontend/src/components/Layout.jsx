import { NavLink, useLocation } from "react-router-dom"
import { Users, CalendarDays } from "lucide-react"
import Navbar from "./Navbar"

function Layout({ children }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <Navbar />

      <main className="flex-1 px-4 py-5 sm:px-6 md:px-8 pb-28 md:pb-10">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-2xl z-50">
        <div className="flex justify-around py-3">

          <NavLink
            to="/"
            className={`flex flex-col items-center text-xs transition ${
              isActive("/") ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <Users size={24} />
            Employees
          </NavLink>

          <NavLink
            to="/attendance"
            className={`flex flex-col items-center text-xs transition ${
              isActive("/attendance") ? "text-indigo-600" : "text-slate-400"
            }`}
          >
            <CalendarDays size={24} />
            Attendance
          </NavLink>

        </div>
      </nav>

    </div>
  )
}

export default Layout