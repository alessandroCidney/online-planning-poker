import { Routes, Route } from 'react-router'

import { Home } from './app/routes/Home'
import { Room } from './app/routes/Room'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path='rooms/:roomId' element={<Room />} />
    </Routes>
  )
}

export default App
