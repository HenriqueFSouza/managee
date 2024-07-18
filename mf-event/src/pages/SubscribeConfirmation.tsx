import React, { useEffect, useState } from 'react';

import { FaRegCircleCheck } from "react-icons/fa6";
import axios from 'axios';
import { useQuery } from '../hooks/useQuery';

const SubscribeConfirmation: React.FC = () => {
  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const token = query.get("token")

  console.log('TOKEN', token)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        await axios.put(`${process.env.API_URL}/event/register-confirm`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchEvent();
  }, [token]);


  if (loading) {
    return <div className='text-center text-xl'>Confirmando inscrição...</div>;
  }

  if (!token || error) {
    return <div className='text-center text-xl'>Erro ao confirmar inscrição</div>;
  }


  return (
    <div className='flex flex-col items-center'>
      <FaRegCircleCheck className='text-green-400 mb-4' size={40} />
      <h2 className="text-2xl font-bold mb-6">Inscrição Confirmada com sucesso!</h2>
      <p className="mb-4 text-center">Você já pode deixar esta página</p>
    </div>
  );
};

export default SubscribeConfirmation;
