import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useUser } from 'hooks/UserContext';
import BackArrow from '../components/BackArrow';
import PageContainer from '../components/PageContainer';

const eventSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório!').max(100),
  description: z.string().min(10, 'A descrição é obrigatória!').max(500),
  date: z.string().min(8, 'A data é obrigatória'),
  startTime: z.string().min(5, 'Um horário de início é obrigatório'),
  endTime: z.string(),
  location: z.string().min(3, 'A localização é obrigatória!').max(100),
  isOnline: z.boolean(),
});

type EventFormData = z.infer<typeof eventSchema>;

const CreateEvent: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema)
  });
  const navigate = useNavigate()
  const { logout } = useUser()

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    try {
      await api.post('/event', data);
      toast.success("Evento criado com sucesso!")
      navigate('/eventos')
    } catch (error) {
      toast.error("Erro ao criar evento")
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          logout()
        }
      }
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <BackArrow />
      <PageContainer>
        <h2 className="text-2xl font-bold mb-6">Novo Evento</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Título"
            name="title"
            type="text"
            placeholder='Novo evento'
            register={register}
            error={errors.title}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              {...register('description')}
              className={`mt-1 block w-full rounded-md border-gray-300 border-[1px] h-10 p-2 shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <Input
            label="Data"
            name="date"
            type="date"
            register={register}
            error={errors.date}
          />
          <Input
            label="Início"
            name="startTime"
            type="time"
            register={register}
            error={errors.startTime}
          />
          <Input
            label="Término"
            name="endTime"
            type="time"
            register={register}
            error={errors.endTime}
          />
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('isOnline')}
                className="form-checkbox h-5 w-5 rounded-md"
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              <span className="ml-2">Evento online</span>
            </label>
          </div>
          <Input
            name="location"
            type="text"
            label={isOnline ? "Localização: (Link para o evento)" : "Localização: (Endereço para chegar ao evento)"}
            placeholder={isOnline ? "https://..." : "Rua/Avenida..."}
            register={register}
            error={errors.location}
          />
          <Button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            type="submit"
            isLoading={isSubmitting}
          >
            Criar
          </Button>
        </form>
      </PageContainer>
    </div>
  );
};

export default CreateEvent;
