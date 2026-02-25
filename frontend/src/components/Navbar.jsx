import { NavLink, useLocation } from "react-router-dom"
import { Users, CalendarDays, Building2 } from "lucide-react"

function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Employees", icon: <Users size={20}/> },
    { path: "/attendance", label: "Attendance", icon: <CalendarDays size={20}/> },
  ]

  const isActive = (path) => location.pathname === path

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return (
    <>
      {/* ================= DESKTOP TOP NAV ================= */}
      <header className="hidden md:block sticky top-0 z-30 bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Building2 size={18}/>
            </div>
            <h1 className="text-lg font-semibold text-slate-800">HRMS Lite</h1>
          </div>

          {/* Desktop Links */}
          <nav className="flex gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                ${isActive(item.path)
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100"}`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Date */}
          <div className="text-sm text-slate-400">{today}</div>
        </div>
      </header>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around py-2">

          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-xs py-2 transition
              ${isActive(item.path) ? "text-indigo-600" : "text-slate-400"}`}
            >
              <div className={`${isActive(item.path) ? "bg-indigo-100" : ""} p-2 rounded-full`}>
                {item.icon}
              </div>
              {item.label}
            </NavLink>
          ))}

        </div>
      </nav>
    </>
  )
}

export default Navbar