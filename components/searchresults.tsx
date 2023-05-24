import React from 'react';

export interface SearchResult {
  username: string;
  price: number;
  isRegistered: boolean;
}

interface SearchResultsProps {
    results: SearchResult[];
    selectedUsername: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, selectedUsername }) => {
  // Extract the username availability and data
  const selectedUser = results.find((result) => result.username === selectedUsername);

  return (
    <div>
      {selectedUser && (
        <div className="selected-username">
          <h2>Selected Username: {selectedUser.username}</h2>
          <p>Price: {selectedUser.price}</p>
          <p>Registered: {selectedUser.isRegistered ? 'Yes' : 'No'}</p>
        </div>
      )}
      <div className="other-usernames">
        {results.map((result) => (
          <div key={result.username} className="username">
            <h2>{result.username}</h2>
            <p>Price: {result.price}</p>
            <p>Registered: {result.isRegistered ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;