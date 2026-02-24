import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Layout from "./components/Layout"
import Employees from "./pages/Employees"
import Attendance from "./pages/Attendance"

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Employees />
              </PageWrapper>
            }
          />
          <Route
            path="/attendance"
            element={
              <PageWrapper>
                <Attendance />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App