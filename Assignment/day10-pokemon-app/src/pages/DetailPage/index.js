import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../../api/axios";
import requests from "../../api/requests";
import DamageRelationModal from "../../components/DamageModal";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${requests.fetchPokemon}${id}`);
        console.log("포켓몬 정보", response.data);
        const speciesResponse = await axios.get(
          `${requests.fetchPokemonSpecies}${id}`
        );
        console.log("speciesResponse 정보", speciesResponse.data);
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        );

        // 이미지들
        const spriteImages = response.data.sprites;

        const abilities = response.data.abilities.map(
          (ability) => ability.ability.name
        );
        const type = response.data.types[0].type.name

        const types = response.data.types
          .map((type) => type.type.name)
          .join(", ");
        const weight = response.data.weight;
        const height = response.data.height;

        const stats = response.data.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        }));

        // 한글 도감 설명 가져오기
        const koreanFlavorTextEntry =
          speciesResponse.data.flavor_text_entries.find(
            (entry) => entry.language.name === "ko"
          );
        const flavor = koreanFlavorTextEntry
          ? koreanFlavorTextEntry.flavor_text
          : "설명 없음";

        // 포켓몬 색상
        const pokemonColor = speciesResponse.data.color.name;
        setPokemon({
          ...response.data,
          color: pokemonColor,
          korean_name: koreanName?.name ?? "이름 없음",
          abilities,
          type,
          types,
          weight,
          height,
          stats,
          flavor,
          spriteImages,
        });
      } catch (error) {
        console.error(`Error fetching Pokemon ${id}:`, error);
      }
    };

    fetchPokemon();
  }, [id]);


  const handleClick = () => {
    setModalOpen(true);
};
  if (!pokemon) return <LoadingText>Loading...</LoadingText>;

  return (
    <PokedexContainer color={pokemon.color}>
      <PokedexHeader>
        <BackButton onClick={() => navigate("/")}>←</BackButton>
        <Title>{pokemon.name.toUpperCase()}</Title>
        <PokedexID>#{pokemon.id}</PokedexID>
      </PokedexHeader>

      <PokemonCard>
        <NavigationButtons>
          <NavButton
            onClick={() => navigate(`/pokemon/${Math.max(1, Number(id) - 1)}`)}
          >{`<`}</NavButton>
          <NavButton
            onClick={() => navigate(`/pokemon/${Number(id) + 1}`)}
          >{`>`}</NavButton>
        </NavigationButtons>
        <PokemonImage
          src={pokemon.sprites.front_default}
          alt={pokemon.korean_name}
          onClick={handleClick}
        />
        <PokemonTypeChip color={pokemon.color}>
          {capitalizeWords(pokemon.types)}
        </PokemonTypeChip>

        <PokemonInfo color={pokemon.color}>
          <h3>{pokemon.korean_name}</h3>
          <h4 className="title">정보</h4>

          <PokemonCharacteristicContainer>
            <PokemonCharacteristic>
              <p className="subtitle">무게</p>
              <p>{pokemon.weight / 10}kg</p>
            </PokemonCharacteristic>
            <PokemonCharacteristic>
              <p className="subtitle">키</p>
              <p>{pokemon.height / 10}m</p>
            </PokemonCharacteristic>
            <PokemonCharacteristic>
              <p className="subtitle">능력</p>
              {pokemon.abilities.map((ability) => {
                return (
                  <p key={ability}>
                    {capitalizeWords(ability).replace("-", " ")}
                  </p>
                );
              })}
            </PokemonCharacteristic>
          </PokemonCharacteristicContainer>

          <h4 className="title">기본 능력치</h4>
          <StatsList>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                {capitalizeWords(String(stat.name)).replace("-", " ")}:{" "}
                {stat.base_stat}
              </li>
            ))}
          </StatsList>

          <h4 className="title">설명</h4>
          <p>{pokemon.flavor}</p>
        </PokemonInfo>

        {/* Displaying sprite images */}
        <SpriteImages>
          <div className="sprite-container">
            {pokemon.spriteImages.front_default && (
              <img
                src={pokemon.spriteImages.front_default}
                alt="Front Default"
              />
            )}
            {pokemon.spriteImages.front_female && (
              <img src={pokemon.spriteImages.front_female} alt="Front Female" />
            )}
            {pokemon.spriteImages.front_shiny && (
              <img src={pokemon.spriteImages.front_shiny} alt="Front Shiny" />
            )}
            {pokemon.spriteImages.front_shiny_female && (
              <img
                src={pokemon.spriteImages.front_shiny_female}
                alt="Front Shiny Female"
              />
            )}
            {pokemon.spriteImages.back_default && (
              <img src={pokemon.spriteImages.back_default} alt="Back Default" />
            )}
            {pokemon.spriteImages.back_female && (
              <img src={pokemon.spriteImages.back_female} alt="Back Female" />
            )}
            {pokemon.spriteImages.back_shiny && (
              <img
                src={pokemon.spriteImages.back_shiny}
                alt="Back Shiny"
                width="100"
              />
            )}
            {pokemon.spriteImages.back_shiny_female && (
              <img
                src={pokemon.spriteImages.back_shiny_female}
                alt="Back Shiny Female"
              />
            )}
          </div>
        </SpriteImages>
      </PokemonCard>

      {modalOpen && (
        <DamageRelationModal type={pokemon.type} color={pokemon.color} setModalOpen={setModalOpen} />
      )}
    </PokedexContainer>
  );
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

const PokedexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background: ${({ theme, color }) => `
    linear-gradient(
      to bottom,
      ${color !== "unknown" ? color : theme.background} 30%,
      ${theme.background} 30%
    )
  `};
  height: 100vh;
  width: 100%;
  color: white;
  margin-top: 70px; /* Nav 높이만큼 띄우기 */
`;

const PokedexHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  padding: 10px;
`;

const Title = styled.h2`
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const PokedexID = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to bottom,
    ${({ color }) => (color !== "unknown" ? color : "#f5f5f5")} 33%,
    #1a1b25 33%
  );
  width: 80%;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
`;

const PokemonImage = styled.img`
  width: 180px;
  height: 180px;
`;

// todo chip.map으로 여러개일 경우 대응 하기 (12번 확인))
const PokemonTypeChip = styled.div`
  padding: 6px 15px;
  color: rgb(26, 27, 37);
  background-color: ${({ color }) => (color !== "unknown" ? color : "#f5f5f5")};
  font-size: 16px;
  font-weight: bold;
  border-radius: 30px;
`;

const PokemonInfo = styled.div`
  text-align: center;
  margin-top: 10px;
  color: white;
  width: 80%; /* 부모 컨테이너의 전체 너비 사용 */

  .title {
    color: ${({ color }) => (color !== "unknown" ? color : "#f5f5f5")};
    margin: 10px;
    margin-top: 14px;
  }
`;

const PokemonCharacteristicContainer = styled.div`
  display: flex;
  //   flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 100%; /* 부모 컨테이너의 전체 너비 사용 */
`;

const PokemonCharacteristic = styled.div`
  flex: 1; /* 각 요소가 동일한 너비를 가지도록 설정 */
  text-align: center;
  padding: 4px;

  .subtitle {
    font-size: 12px;
    font-weight: 700;
    margin: 5px 0;
  }

  p {
    font-size: 13px;
    font-weight: 500;
  }
`;

const StatsList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 14px;
  text-align: left;

  li {
    margin: 5px 0;
  }
`;

const SpriteImages = styled.div`
  margin-top: 20px;

  .sprite-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
  }

  img {
    width: 70px;
  }
`;

const BackButton = styled.button`
  padding: 4px 8px;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border-radius: 30px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  padding: 12px 20px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  color: white;

  &:hover {
    color: rgb(123, 123, 123);
  }
`;