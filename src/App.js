import React, { useState } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import UserProfile from './user';
import './App.css';

const client = new ApolloClient({
  uri: 'https://leetcode.com/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can add validation or further logic here if needed
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>My LeetCode Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter LeetCode Username:
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <UserProfile username={username} />
      </div>
    </ApolloProvider>
  );
};

export default App;
