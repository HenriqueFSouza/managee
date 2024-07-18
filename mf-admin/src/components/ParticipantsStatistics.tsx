import 'tailwindcss/tailwind.css'
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Select from 'react-select';
import { api } from '../services/api';

interface Event {
  _id: string;
  title: string;
}

interface StatisticsData {
  date: string;
  participants: number;
}

const ParticipantsStatistics = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [statistics, setStatistics] = useState<StatisticsData[]>([]);

  useEffect(() => {
    // Fetch events for the selector
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      // Fetch statistics for the selected event
      const fetchStatistics = async () => {
        try {
          const response = await api.get(`/dashboard/statistics/${selectedEvent}`);
          setStatistics(response.data.statistics);
        } catch (error) {
          console.error('Failed to fetch statistics', error);
        }
      };

      fetchStatistics();
    }
  }, [selectedEvent]);

  const handleEventChange = (selectedOption: any) => {
    setSelectedEvent(selectedOption.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-lg font-bold mb-2">Estatísticas de Participantes Registrados</h2>
      <Select
        options={events.map(event => ({ value: event._id, label: event.title }))}
        onChange={handleEventChange}
        placeholder="Selecione um evento"
        className="mb-4"
      />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={statistics}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="participants" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipantsStatistics;
