/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MyComponent from "./MyComponent";
import AnotherComponent from "./AnotherComponent";
import PaginatedComponent from "./PaginatedComponent";
import InfiniteComponent from "./InfiniteComponent";
import ClassComponent from "./ClassComponent";

const queryClient = new QueryClient();

function App() {
  const currentPath = window.location.pathname;

  return (
    <QueryClientProvider client={queryClient}>
      {
        currentPath === '/' ? (
          <>
            <MyComponent />
            <hr />
            <AnotherComponent />
          </>
        ) : currentPath === '/class' ? (
          <ClassComponent />
        ) : currentPath === '/paginated' ? (
          <PaginatedComponent />
        ) : currentPath === '/infinite' ? (
          <InfiniteComponent />
        ) : null
      }
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
