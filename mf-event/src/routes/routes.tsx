import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import MyEvents from '../pages/MyEvents'
import CreateEvent from '../pages/CreateEvent'
import EditEvent from '../pages/EditEvent'
import EventDetails from '../pages/EventDetails'
import EventSubscribe from '../pages/EventSubscribe'


function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyEvents />} />
        <Route path="/criar-evento" element={<CreateEvent />} />
        <Route path="/editar-evento" element={<EditEvent />} />
        <Route path="/detalhes-evento" element={<EventDetails />} />
        <Route path="/inscricao" element={<EventSubscribe />} />
      </Routes>
    </Router>
  )
}

export default MyRoutes