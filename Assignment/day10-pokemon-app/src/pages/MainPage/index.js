import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import styled from "styled-components";
import PokemonCardComponent from "../../components/PokemonCardComponent";
import requests from "../../api/requests";
import SearchInput from "../../components/SearchInput";

export default function MainPage({ searchValue, setSearchValue }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1); // 페이지 번호 상태 추가

  // 데이터 가져오기
  const fetchData = async () => {
    const allPokemonData = [];
    const start = (page - 1) * 40 + 1; // 현재 페이지에 맞는 시작 포켓몬 번호
    const end = page * 40; // 현재 페이지에 맞는 끝 포켓몬 번호

    for (let i = start; i <= end; i++) {
      try {
        const response = await axios.get(`${requests.fetchPokemon}${i}`);
        const speciesResponse = await axios.get(
          `${requests.fetchPokemonSpecies}${i}`
        );
        const pokemonColor = speciesResponse.data.color.name;

        allPokemonData.push({ ...response.data, color: pokemonColor });
      } catch (error) {
        console.error(`Error fetching Pokemon ${i}:`, error);
      }
    }

    setPokemonData((prevData) => [...prevData, ...allPokemonData]); // 기존 데이터에 추가
  };

  useEffect(() => {
    fetchData();
  }, [page]); // 페이지 번호가 변경될 때마다 데이터를 다시 불러옵니다.

  return (
    <Container>
      <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />

      <PokemonContainer>
        {pokemonData.map((pokemon) => (
          <PokemonCardComponent key={pokemon.id} pokemon={pokemon} />
        ))}
      </PokemonContainer>

      <LoadMoreButton onClick={() => setPage(page + 1)}>더보기</LoadMoreButton>
    </Container>
  );
}

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 40px;
  z-index: -10;
  // margin-top: 70px; /* Nav 높이만큼 띄우기 */
`;

const Container = styled.div`
  position: relative;
  padding: 8px;
  margin-top: 70px; /* Nav 높이만큼 띄우기 */
`;

const LoadMoreButton = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  background: ${({ theme }) => `
      ${theme.primary} 
  `};
  font-weight: 700;
  font: 22px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;

  &:hover {
    opacity: 0.6;
  }
`;