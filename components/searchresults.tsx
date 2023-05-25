import React from 'react';

import { Button } from './ui/button';
import {GridList, Item} from 'react-aria-components';

export interface SearchResult {
  username: string;
  price: number;
  isRegistered: boolean;
}

interface SearchResultsProps {
    results: SearchResult[];
    selectedUsername: SearchResult | undefined;
    setSelectedUsername: React.Dispatch<React.SetStateAction<SearchResult | undefined>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, selectedUsername, setSelectedUsername }) => {
  // Extract the username availability and data
  // const selectedUser = results.find((result) => result.username === selectedUsername);

  const handleSelect = (item: SearchResult) => {
    setSelectedUsername(item)
  }

  const filteredResults = [...results];
  const selectedIndex = filteredResults.findIndex((item) => item.username === selectedUsername?.username);
  if (selectedIndex !== -1) {
    filteredResults.splice(selectedIndex, 1);
  }
  
  return (
    <div>
      <GridList>
        {selectedUsername && (
          <Item textValue={selectedUsername.username} key={selectedUsername.username}>
            {selectedUsername.username}
            <Button onClick={() => handleSelect(selectedUsername)}>Select</Button>
          </Item>
        )}
        {filteredResults.map((item: SearchResult) => (
          <Item textValue={item.username} key={item.username}>
            {item.username}
            <Button onClick={() => handleSelect(item)}>Select</Button>
          </Item>
        ))}
      </GridList>
    </div>
  );
};

export default SearchResults;