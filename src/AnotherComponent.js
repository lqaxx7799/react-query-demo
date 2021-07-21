import React from 'react';
import { useQuery } from 'react-query';

export default function AnotherComponent() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(
          "https://api.github.com/repos/tannerlinsley/react-query"
        ).then((res) => res.json())
        .then((res) => resolve(res));
      }, 2000);
    }),
    {
      staleTime: 20000,
    }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
