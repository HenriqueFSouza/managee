import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useUser } from 'hooks/UserContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from '../services/api';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email('Email inválido!'),
  password: z.string().min(6, 'Mínimo de 6 caracteres!'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post('/sessions', {
        email: data.email.toLocaleLowerCase(),
        password: data.password
      });

      login(response.data);
      navigate('/dashboard');
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
              label="Email"
              name="email"
              type="text"
              register={register}
              error={errors.email}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Senha"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />
          </div>
          <Button
            className=" w-full my-4"
            type="submit"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </form>
        <p>Não tem uma conta? <a className='text-accent' href='/cadastro'>Criar conta</a></p>
      </div>
    </div>
  );
};

export default Login;
