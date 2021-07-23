const withQuery = (useQuery) => {
  return (WrappedComponent) => {
    const Wrapper = (props) => {
      const query = useQuery();
      return (
        <WrappedComponent {...props} query={query} />
      );
    }
    return Wrapper;
  }
}

export default withQuery;
