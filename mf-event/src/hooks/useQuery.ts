import { useLocation } from "react-router-dom";

function useQuery(param: string) {
  const searchParams = new URLSearchParams(useLocation().search);

  return searchParams.get(`${param}`)
}

export { useQuery };