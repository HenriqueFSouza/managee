import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Loading from './Loading';

export interface Event {
  _id: string;
  title: string;
  date: string;
  participantsCount: number;
  confirmedCount: number;
}

type Props = {
  data: Event[];
  isLoading: boolean;
}

const UpcomingEventsTable: React.FC<Props> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const copyLink = (eventId: string) => {
    const link = `${process.env.WEBSITE_URL || 'https://managee-mf-container.onrender.com'}/eventos/inscricao/${eventId}`;
    navigator.clipboard.writeText(link);
    toast.success('Link de inscrições copiado!');
  };

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full overflow-x-auto">
      <h2 className="text-lg text-zinc-600 font-bold mb-2">Próximos Eventos</h2>
      {isLoading ? (
        <Loading size={6} />
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="text-start px-4 py-2">Nome</th>
                <th className="text-start px-4 py-2">Data</th>
                <th className="text-center px-4 py-2">Participantes</th>
                <th className="text-center px-4 py-2">Inscrições Confirmadas</th>
                <th className="text-start px-4 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map(event => (
                <tr key={event._id}>
                  <td className="px-4 py-2 cursor-pointer" onClick={() => navigate(`/eventos/detalhes-evento/${event._id}`)}>{event.title}</td>
                  <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-center">{event.participantsCount}</td>
                  <td className="px-4 py-2 text-center">{event.confirmedCount}</td>
                  <td className="px-4 py-2">
                    <FaCopy onClick={() => copyLink(event._id)} className="cursor-pointer text-accent" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={'Anterior'}
            nextLabel={'Próxima'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'flex justify-center mt-4'}
            activeClassName={'bg-blue-500 text-white border-blue-500'}
            pageClassName={'border rounded mx-1 cursor-pointer'}
            pageLinkClassName={'block py-1 px-3'}
            previousClassName={'border rounded mx-1 cursor-pointer'}
            previousLinkClassName={'block py-1 px-3'}
            nextClassName={'border rounded mx-1 cursor-pointer'}
            nextLinkClassName={'block py-1 px-3'}
            breakClassName={'border rounded mx-1 cursor-pointer'}
            breakLinkClassName={'block py-1 px-3'}
          />
        </>
      )}
    </div>
  );
};

export default UpcomingEventsTable;
