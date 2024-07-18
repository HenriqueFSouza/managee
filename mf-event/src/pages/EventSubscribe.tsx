import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { api } from '../services/api';
import { formatDateToLong } from '../utils/formatDate';
import { toast } from 'react-toastify';
import { EventDetailsProps } from './EventDetails';
import Input from '../components/Input';
import Button from '../components/Button';
import { FaRegCircleCheck } from "react-icons/fa6";
import { AxiosError } from 'axios';
import PageContainer from '../components/PageContainer';

const registrationSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().email('Email inválido!'),
});

type RegistrationFormInputs = z.infer<typeof registrationSchema>;

const EventSubscribe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

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

  const onSubmit = async (data: RegistrationFormInputs) => {
    try {
      await api.post(`/event/${id}/register`, data);
      setStep(1)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        if (error.response?.status === 400) {
          return toast.error(error.response?.data.error);
        }
        toast.error('Erro ao realizar inscrição. Tente novamente mais tarde');
      }
    }
  };

  if (loading) {
    return <div className='text-center text-xl'>Loading...</div>;
  }

  if (!event) {
    return <div className='text-center text-xl'>Evento não encontrado.</div>;
  }


  return (
    <PageContainer className={`max-w-3xl mx-auto mt-4 ${step === 1 && 'bg-transparent shadow-none'}`}>
      {step === 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6">{event.title}</h2>
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
            <h3 className="text-lg font-bold mb-4">Inscreva-se:</h3>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  label="Nome"
                  name="name"
                  type="text"
                  register={register}
                  error={errors.name}
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Email"
                  name="email"
                  type="text"
                  register={register}
                  error={errors.email}
                />
              </div>
              <Button
                className="px-12 mx-auto"
                type="submit"
                isLoading={isSubmitting}
              >
                INSCREVER
              </Button>
            </form>
          </div>
        </>
      )}
      {step === 1 && (
        <div className='flex flex-col items-center'>
          <FaRegCircleCheck className='text-green-400 mb-4' size={40} />
          <h2 className="text-2xl text-center font-bold mb-6">Inscrição realizada com sucesso!</h2>
          <p className="mb-4 text-center">Acesso o link enviado para o seu email e confirme a sua inscrição</p>
        </div>
      )}
    </PageContainer>
  );
};

export default EventSubscribe;
