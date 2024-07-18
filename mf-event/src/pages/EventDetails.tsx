import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { formatDateToLong } from '../utils/formatDate';
import { toast } from 'react-toastify';
import { FaCheck, FaUserClock } from "react-icons/fa6";
// import { FaRegTrashAlt } from 'react-icons/fa';
import BackArrow from '../components/BackArrow';
import PageContainer from '../components/PageContainer';

type Participant = {
  event: string;
  name: string;
  email: string;
  confirmed: boolean;
  registrationDate: string;
}
export interface EventDetailsProps {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  participants: Participant[];
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar o evento');
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Evento não encontrado. <a href='/eventos'>Meus eventos</a></div>;
  }

  return (
    <>
      <BackArrow />
      <PageContainer>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold ">{event.title}</h2>
          {/* <button onClick={() => { }} className="text-zinc-500 hover:text-red-700 focus:outline-none">
            <FaRegTrashAlt size={18} />
          </button> */}
        </div>
        <p className="mb-4">{event.description}</p>
        <div className="mb-4">
          <strong>Data:</strong> {formatDateToLong(event.date)}
        </div>
        <div className="mb-4">
          <strong>Início:</strong> {event.startTime}
        </div>
        {event.endTime && (<div className="mb-4">
          <strong>Término:</strong> {event.endTime}
        </div>)}
        <div className="mb-4">
          <strong>Local:</strong> {event.isOnline ? <a href={event.location}>{event.location}</a> : event.location}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Participants</h3>
          {event.participants.length > 0 ? (
            <ul className="flex gap-4 flex-wrap md:divide-x divide-gray-200">
              {event.participants.map((participant, index) => (
                <li key={index} className="py-4 pl-4 w-full max-w-[300px]">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-md text-white ${participant.confirmed ? 'bg-green-500' : 'bg-yellow-500'}`}
                    >
                      {participant.confirmed ? <FaCheck fill='#fff' /> : <FaUserClock fill='#fff' />}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{participant.name}</p>
                      <p className="text-sm text-gray-500">{participant.email}</p>
                      <p className="text-xs text-gray-500">
                        Data de realização: {formatDateToLong(participant.registrationDate)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Não há participantes neste evento!</p>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default EventDetails;
