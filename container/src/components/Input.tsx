import 'tailwindcss/tailwind.css'
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({ label, name, placeholder, type, register, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-800">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border-gray-300 border-[1px] h-10 p-2 shadow-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default Input;

/*
  Fabinho: 
    Creme 2.89 ✅
    Leite 5.59 ✅
    Mussarela 33.90 
    Bacon 28.79 ✅

  Bispo: 
    Farinha venturelli 4,66 ✅
    Presunto 21,90 seara ✅
    Mussarela ✅

*/