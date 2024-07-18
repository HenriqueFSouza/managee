import React from 'react';
import { Link } from 'react-router-dom';
import { EventDetailsProps } from '../pages/EventDetails';
import { FaEdit, FaListAlt, FaCopy } from "react-icons/fa";
import { formatDateToLong } from '../utils/formatDate';
import { toast } from 'react-toastify';

interface EventCardProps {
  event: EventDetailsProps;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

  const handleCopy = () => {
    window.navigator.clipboard.writeText(`${process.env.WEBSITE_URL}/eventos/inscricao/${event._id}`)
    toast.success('Link de inscrições copiado!')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 pt-6 mb-4 flex justify-between items-center">
      <div className="w-full">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold ">{event.title}</h3>

          <div className='flex items-center gap-4'>
            <Link to={`/eventos/detalhes-evento/${event._id}`} className="text-accent hover:underline mr-4 flex gap-2 items-center">
              <FaListAlt size={18} />
              <p className="hidden md:flex">Ver Detalhes</p>
            </Link>
            <Link to={`/eventos/editar-evento/${event._id}`} className="text-accent hover:underline mr-4 flex gap-2 items-center">
              <FaEdit size={18} />
              <p className="hidden md:flex">Editar</p>
            </Link>
            <button onClick={handleCopy} className="text-accent hover:underline mr-4 flex gap-2 items-center">
              <FaCopy size={18} />
              <p className="hidden md:flex">Link de Inscrições</p>
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-2">{event.description}</p>
        <div>
          <p className="text-sm"><strong>Date:</strong> {formatDateToLong(event.date)}</p>
          <p className="text-sm"><strong>Time:</strong> {event.startTime} {event.endTime ? '- ' + event.endTime : ''}</p>
          <p className="text-sm"><strong>Location:</strong> {event.isOnline ? <a href={event.location} target='_blank'>{event.location}</a> : event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
