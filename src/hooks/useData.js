import { useQuery } from "react-query";

function useData() {
  return useQuery(
    "repoData",
    () => fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) => res.json()),
    {
      staleTime: 20000,
    }
  );
}

export default useData;
