import 'dotenv/config'
import { Models } from '@/@types/models';
import { transporter } from '../lib/mail';
import { formatDateToLong } from './formatDate';

export const sendRegistrationEmail = async (email: string, event: Models.IEvent, token: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `[CONFIRMAÇÃO ${event.title.split(' ')[0].toUpperCase()}]`,
    html: `
      <h1>Confirmação de Inscrição</h1>
      <p>Confirme a sua inscrição no evento:</p>
      <h2>${event.title}</h2>
      <p><strong>Data:</strong> ${formatDateToLong(event.date.toString())}</p>
      <p><strong>Horário:</strong> ${event.startTime} - ${event.endTime}</p>
      <p><strong>Local:</strong> ${event.isOnline ? `<a href="${event.location}">Online</a>` : event.location}</p>
      <a href='${process.env.WEBSITE_URL}/eventos/confirmar-inscricao?token=${token}'>Confirmar minha inscrição!</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};
