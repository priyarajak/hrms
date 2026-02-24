import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react"

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-[#9EC5FE] text-white"
        : "text-slate-600 hover:bg-slate-100"
    }`

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
          HRMS Lite
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3">
          <Link to="/" className={linkStyle("/")}>Employees</Link>
          <Link to="/attendance" className={linkStyle("/attendance")}>Attendance</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 border-t bg-white">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={linkStyle("/")}
          >
            Employees
          </Link>
          <Link
            to="/attendance"
            onClick={() => setIsOpen(false)}
            className={linkStyle("/attendance")}
          >
            Attendance
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar