import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { api } from '../services/api';
import Input from '../components/Input';
import Button from '../components/Button';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto!'),
  email: z.string().email('Email inválido!'),
  password: z.string().min(6, 'Mínimo de 6 caracteres!'),
  confirmPassword: z.string().min(6, 'Mínimo de 6 caracteres!'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem!',
  path: ['confirmPassword'],
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await api.post('/register', {
        username: data.name,
        email: data.email.toLocaleLowerCase(),
        password: data.password,
        role: 'participant'
      });
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) return toast.error(error.response?.data.error)
      }
      return toast.error('Erro inesperado. Tente novamente mais tarde')
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-black text-4xl font-bold text-center mb-4">Manag<span className='text-accent'>.ee</span></h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mb-4">
            <Input
              label="Senha"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />
          </div>
          <Button
            className=" w-full my-4"
            type="submit"
            isLoading={isSubmitting}
          >
            Cadastrar
          </Button>
        </form>
        <p>Já tem uma conta? <a className='text-accent' href='/'>Entrar</a></p>
      </div>
    </div>
  );
};

export default Register;
