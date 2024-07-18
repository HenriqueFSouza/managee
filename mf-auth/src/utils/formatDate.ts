
export const formatDateToLong = (date: string) => {
  return new Date(date).toLocaleString('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' })
}