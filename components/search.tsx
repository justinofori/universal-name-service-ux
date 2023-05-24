import React, { useState } from 'react';
import Image from 'next/image';
import SearchBar from './searchbar';
import SearchResults from './searchresults';
import { SearchResult } from './searchresults';

const Search = () => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [selectedUsername, setSelectedUsername] = useState('');

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
      setSelectedUsername(foundUser.username);
    } else {
      setSelectedUsername('');
    }

    // Set the search results data in state
    setSearchResults(results);
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
        />}
    </main>
  );
};

export default Search;