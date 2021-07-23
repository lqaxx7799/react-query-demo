import React from 'react';
import useData from './hooks/useData';
import withQuery from './wrappers/withQuery';

class ClassComponent extends React.Component {
  render() {
    const { data, isLoading, isFetching } = this.props.query;

    if (isLoading) {
      return <h1>Loading</h1>;
    }

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
}

export default withQuery(useData)(ClassComponent);
