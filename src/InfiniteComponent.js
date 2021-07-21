import React from 'react';
import { useInfiniteQuery } from 'react-query';

const InfiniteComponent = () => {
  const fetchPosts = ({ pageParam = 1 }) =>
    fetch(`https://jsonplaceholder.typicode.com/comments?_page=${pageParam}&_limit=20`).then(res => res.json());

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('post', fetchPosts, {
    staleTime: 10000,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.length) {
        return null;
      }
      return pages.length + 1;
    },
  });

  return (
    <div>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
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
                data.pages.map(item => 
                  item.map(post =>
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>{post.postId}</td>
                      <td>{post.name}</td>
                      <td>{post.email}</td>
                      <td>{post.body}</td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
}

export default InfiniteComponent;
