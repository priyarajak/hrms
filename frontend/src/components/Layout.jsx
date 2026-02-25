import { Users, CalendarDays } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

function Layout({ children }) {
  const location = useLocation()

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600"
        : "text-slate-500 hover:bg-slate-100"
    }`
    const pageInfo = {
  "/": {
    title: "Employees",
    icon: <Users size={18} className="text-indigo-600"/>
  },
  "/attendance": {
    title: "Attendance",
    icon: <CalendarDays size={18} className="text-indigo-600"/>
  }
}

const currentPage = pageInfo[location.pathname]

  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* top bar */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
  <div className="bg-indigo-100 p-2 rounded-lg">
    {currentPage.icon}
  </div>
  <h1 className="text-lg font-semibold text-slate-800">
    {currentPage.title}
  </h1>
</div>
        <div className="flex gap-4">
          <Link to="/" className={linkClass("/")}>
            <Users size={16}/> Employees
          </Link>
          <Link to="/attendance" className={linkClass("/attendance")}>
            <CalendarDays size={16}/> Attendance
          </Link>
        </div>

        <p className="text-sm text-slate-400">{today}</p>
      </div>

      <div className="px-6 py-6 pb-20">{children}</div>
    </div>
  )
}

export default Layout