import React from 'react';

import { Button } from './ui/button';
import {GridList, Item, MenuTrigger, Menu, Popover} from 'react-aria-components';

export interface SearchResult {
  username: string;
  price: number;
  isRegistered: boolean;
}

interface SearchResultsProps {
    results: SearchResult[];
    selectedUsername: SearchResult | undefined;
    setSelectedUsername: React.Dispatch<React.SetStateAction<SearchResult | undefined>>;
    showSearchResultsFiltersAndSorts: boolean;
    usernameIsAvailable: boolean | null;
    setUsernameIsAvailable: React.Dispatch<React.SetStateAction<boolean | null>>
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, selectedUsername, setSelectedUsername, showSearchResultsFiltersAndSorts, usernameIsAvailable, setUsernameIsAvailable }) => {

  const handleSelect = (item: SearchResult) => {
    setSelectedUsername(item)
    setUsernameIsAvailable(null)
  }

  const filteredResults = [...results];
  const selectedIndex = filteredResults.findIndex((item) => item.username === selectedUsername?.username);
  if (selectedIndex !== -1) {
    filteredResults.splice(selectedIndex, 1);
  }
  
  return (
    <div>

      {
        usernameIsAvailable === true && (
          <h1 className='mb-5 font-bold'>Great News, this username is available</h1>
        )
      }
      {
        usernameIsAvailable === false && (
          <h1 className='mb-5 font-bold'>Unfortunately, this username is not available</h1>
        )
      }
      
      {selectedUsername && (
          <GridList aria-label='Selected Result GridList'>
            <Item textValue={selectedUsername.username} key={selectedUsername.username}>
              <div className="flex space-x-10">
                <div>{selectedUsername.username}</div>
                <div>{selectedUsername.isRegistered ? 'Already registered' : 'Unregistered'}</div>
                <div>{selectedUsername.price + ' USDT'}</div>
                <Button onClick={() => handleSelect(selectedUsername)} className='ml-64'>Select</Button>
              </div>
            </Item>
          </GridList>
      )}

      {showSearchResultsFiltersAndSorts && (
        <>
          <h1 className='mb-5 font-bold'>Similar to your search</h1>
          <div className='mb-5'>
          {/* Render your search buttons here */}
          <Button>Suggested</Button>
          <Button>Paid Only</Button>
          <Button>Free Only</Button>
          <Button>Randomize Suggestions</Button>
          <MenuTrigger>
            <Button aria-label="Filter Menu">☰ Filter</Button>
            <Popover>
              <Menu onAction={alert}>
                <Item id="open">Open</Item>
                <Item id="rename">Rename…</Item>
                <Item id="duplicate">Duplicate</Item>
                <Item id="share">Share…</Item>
                <Item id="delete">Delete…</Item>
              </Menu>
            </Popover>
          </MenuTrigger>
          </div>
        </>
      )}

      <GridList aria-label='Search Results GridList'>
        {filteredResults.map((item: SearchResult) => (
          <Item textValue={item.username} key={item.username}>
            <div className="flex space-x-10">
              <div>{item.username}</div>
              <div>{item.isRegistered ? 'Already registered' : 'Unregistered'}</div>
              <div>{item.price + ' USDT'}</div>
              <Button onClick={() => handleSelect(item)} className='ml-64'>Select</Button>
            </div>
          </Item>
        ))}
      </GridList>
    </div>
  );
};

export default SearchResults;