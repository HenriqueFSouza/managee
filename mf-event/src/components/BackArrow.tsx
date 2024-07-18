import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const BackArrow: React.FC<Props> = ({ className, ...props }) => {
  const navigate = useNavigate();

  const baseClasses = 'ml-2 md:m-0 py-2 outline-none bg-trasparent ';

  return (
    <button
      className={`${className} ${baseClasses}`} {...props}
      onClick={() => navigate(-1)}
    >
      <FaArrowLeft className='h-6 w-6' />
    </button>
  );
};

export default BackArrow;
