import 'tailwindcss/tailwind.css'
import React from 'react';
import TotalEvents from '../components/TotalEvents';
import ParticipantsStatistics from '../components/ParticipantsStatistics';
import ConfirmRateAndPendSubs from '../components/ConfirmRateAndPendSubs';
import { api } from '../services/api';
import UpcomingEventsTable, { Event } from '../components/UpComingEventsTable';

const Dashboard = () => {
  const [totalEvents, setTotalEvents] = React.useState<number>(0);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);


  React.useEffect(() => {
    const fetchTotalEvents = async () => {
      try {
        const response = await api.get('/dashboard/events');
        setTotalEvents(response.data.totalEvents);
        setEvents(response.data.events)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch total events', error);
      }
    };

    fetchTotalEvents();
  }, []);
  return (
    <div className='p-4'>
      <p className='text-zinc-600 font-semibold'>Últimos 7 dias</p>
      <div className="flex flex-col md:!flex-row gap-4">
        <div className="flex flex-col justify-around w-full md:w-1/2">
          <TotalEvents data={totalEvents} isLoading={loading} />
          <ConfirmRateAndPendSubs />
        </div>
        <div className="w-full md:w-1/2">
          <ParticipantsStatistics />
        </div>
      </div>
      <UpcomingEventsTable data={events} isLoading={loading} />
    </div>
  );
};

export default Dashboard;
