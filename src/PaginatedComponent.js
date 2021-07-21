import React, { useState } from 'react';
import { useQuery } from 'react-query';

const PaginatedComponent = () => {
  const [page, setPage] = useState(1);

  const fetchPosts = (page = 1) => fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`).then((res) => res.json());

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
  } = useQuery(['post', page], () => fetchPosts(page), {
    keepPreviousData: true,
    staleTime: 10000,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Post Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(post => (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.postId}</td>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.body}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
      <div>Current Page: {page}</div>
      {
        [1,2,3,4,5,6,7,8,9,10].map(index => (
          <button
            key={index}
            onClick={() => setPage(index)}
            style={index === page ? { backgroundColor: 'red' } : {}}
          >
            {index}
          </button>
        ))
      }
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
}

export default PaginatedComponent;
