import { Routes, Route } from 'react-router'

import { Home } from './components/pages/Home'
import { Room } from './components/pages/Room'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path='rooms/:roomId' element={<Room />} />
    </Routes>
  )
}

export default App
