import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout'
import ActiveTicketsPage from './pages/ActiveTicketsPage'
import DashboardPage from './pages/DashboardPage'
import ParkingLotsPage from './pages/ParkingLotsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/parking-lots" element={<ParkingLotsPage />} />
          <Route path="/active-tickets" element={<ActiveTicketsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
