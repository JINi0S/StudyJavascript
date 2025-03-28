import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
import requests from "../../api/requests";
import PokemonCardComponent from "../../components/PokemonCardComponent";
import SearchInput from "../../components/SearchInput";

export default function SearchPage({ searchValue, setSearchValue }) {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null); // 초기값 null로 설정

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchPokemon(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]); // 텀이 변할때마다 함수 요청

  const fetchSearchPokemon = async (searchTerm) => {
    try {
      const response = await axios.get(`${requests.fetchPokemon}${searchTerm}`);
      const speciesResponse = await axios.get(
        `${requests.fetchPokemonSpecies}${searchTerm}`
      );
      const pokemonColor = speciesResponse.data.color.name;

      setSearchResults({ ...response.data, color: pokemonColor });
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchResults = () => {
    if (!searchResults) {
      return (
        <div>
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />

          <section className="no-results">
            <div className="no-results__text">
              <p>
                찾고자 하는 검색어 "{debouncedSearchTerm}"에 해당하는 포켓몬이
                없습니다.
              </p>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <section className="search-container">
          <div className="pokemon">
            <PokemonCardComponent
              key={searchResults.id}
              pokemon={searchResults}
              onClick={() => navigate(`/${searchResults.id}`)}
            />
          </div>
        </section>
      </div>
    );
  };

  return renderSearchResults();
}
