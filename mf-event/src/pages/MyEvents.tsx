import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa";
import { EventDetailsProps } from './EventDetails';
import PageContainer from '../components/PageContainer';


const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<EventDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar eventos');
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer className='shadow-none bg-transparent mt-4'>
      <div className='flex justify-between mb-6'>
        <h2 className="text-2xl text-zinc-600 font-bold ">Meus Eventos</h2>
        <Link to="/eventos/criar-evento" className="flex gap-2 items-center bg-indigo-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <FaPlus /> Novo Evento
        </Link>
      </div>
      {events.length === 0 ? (
        <p>Nenhum evento criado. :(</p>
      ) : (
        events.map(event => (
          <EventCard
            key={event._id}
            event={event}
          />
        ))
      )}
    </PageContainer>
  );
};

export default MyEvents;
