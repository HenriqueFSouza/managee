import 'tailwindcss/tailwind.css'
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ConfirmationRate from './ConfirmationRate';
import PendingSubscribes from './PendingSubscribes';

const ConfirmRateAndPendSubs = () => {
  const [engagementRate, setEngagementRate] = useState<number>(0);
  const [pendingData, setPendingData] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events for the selector
    const fetchEvents = async () => {
      try {
        const response = await api.get('/dashboard/statistics');
        setEngagementRate(response.data.confirmationRate);
        setPendingData(response.data.pendingSubscribes);
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <ConfirmationRate data={engagementRate} isLoading={loading} />
      <PendingSubscribes data={pendingData} isLoading={loading} />
    </div>
  );
};

export default ConfirmRateAndPendSubs;
