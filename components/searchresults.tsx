import React from 'react';

import { Item } from 'react-stately';
import { List } from './ui/List';
import { Button } from './ui/button';

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
            
        <List items={results} aria-label="Search Results">
              {(item: SearchResult) => (
                <Item textValue = { item.username } key={ item.username }>
                {item.username}
                <Button>Select</Button>
                </Item>
              )}
        </List>
    </div>
  );
};

export default SearchResults;