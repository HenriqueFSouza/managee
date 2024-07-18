import 'tailwindcss/tailwind.css'
import React from 'react';
import Loading from './Loading';

const TotalEvents = ({ data, isLoading }: { data: number, isLoading: boolean }) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      {isLoading && (
        <Loading />
      )}
      {!isLoading && (
        <>
          <h2 className="text-lg md:text-xl font-bold mb-2">Total de Eventos Criados</h2>
          <p className="text-3xl">{data}</p>
        </>
      )}
    </div>
  );
};

export default TotalEvents;
