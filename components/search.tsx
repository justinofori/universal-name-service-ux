import React, { useState } from 'react';
import SearchBar from './searchbar';
import SearchResults from './searchresults';
import { SearchResult } from './searchresults';

const Search = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedUsername, setSelectedUsername] = useState<SearchResult>();
  const [showSearchResultsFiltersAndSorts, setShowSearchResultsFiltersAndSorts] = useState<boolean>(false);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState<boolean | null>(null);
  
  const handleSearchSubmit = (value: string) => {
    console.log('Search value:', value);
      
    // Perform search logic and set the search results data
    const results: SearchResult[] = [
      {
        username: 'john.0x',
        price: 500,
        isRegistered: true,
      },
      {
        username: 'jane.0x',
        price: 200,
        isRegistered: false,
      },
      {
        username: 'alex.0x',
        price: 300,
        isRegistered: true,
      },
    ];
      
    // Check if the submitted username exists in the results
    const foundUser = results.find((result) => result.username === value);
    if (foundUser) {
      setSelectedUsername(foundUser);
      setUsernameIsAvailable(true);
    } else {
      setSelectedUsername(undefined)
      setUsernameIsAvailable(false);
    }

    // Set the search results data in state
    setSearchResults(results);

    // Set showSearchButtons to true when a search is performed
    setShowSearchResultsFiltersAndSorts(true);
  };

  return (
    <main>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-2 lg:text-left">
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>

        {searchResults &&
              <SearchResults
              results={searchResults}
              selectedUsername={selectedUsername}
              setSelectedUsername={setSelectedUsername}
              showSearchResultsFiltersAndSorts={showSearchResultsFiltersAndSorts}
              usernameIsAvailable={usernameIsAvailable}
              setUsernameIsAvailable={setUsernameIsAvailable}
        />}
    </main>
  );
};

export default Search;