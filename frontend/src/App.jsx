import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import EventList from './components/EventList'
import EventDetails from './components/EventDetails'
import './index.css'

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/event/:id" element={<EventDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
  )
}

export default App
