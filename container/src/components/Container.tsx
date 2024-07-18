import 'tailwindcss/tailwind.css'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'dashboard/Dashboard'
import MyEvents from 'meus_eventos/MyEvents'
import CreateEvent from 'meus_eventos/CreateEvent'
import EditEvent from 'meus_eventos/EditEvent'
import EventDetails from 'meus_eventos/EventDetails'

// import Events from './Events'; // Importar componentes de eventos
// import Profile from './Profile'; // Importar componentes de perfil
import Header from './Header';

const Container: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Barra superior */}
        <Header />

        {/* Conteúdo principal */}
        <main className="flex justify-center">
          <div className="flex-grow p-6 overflow-y-auto max-w-[1200px]">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/meus-eventos" element={<MyEvents />} />
              <Route path="/criar-evento" element={<CreateEvent />} />
              <Route path="/editar-evento" element={<EditEvent />} />
              <Route path="/detalhes-evento" element={<EventDetails />} />

              {/* <Route path="/events">
                <Events />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route> */}
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default Container;
