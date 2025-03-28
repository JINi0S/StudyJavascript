import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function PokemonCardComponent({ pokemon }) {
  const navigate = useNavigate(); // 네비게이션 훅
  return (
    <PokemonCard
      color={pokemon.color}
      key={pokemon.id}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <p className="id">#{pokemon.id}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.korean_name} />
      <p className="title">{pokemon.name.toUpperCase()}</p>
    </PokemonCard>
  );
}

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  border: none;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer; /* 클릭 가능하게 변경 */
  transition: transform 0.2s ease-in-out;
  position: relative; /* ID를 오른쪽 상단에 배치하기 위해 position 추가 */
  background: ${({ theme }) => `
      ${theme.background} 30%
  `};

  &:hover {
    transform: scale(1.05);
  }

  /* ID 스타일 */
  .id {
    position: absolute; /* 오른쪽 상단에 위치시키기 위해 absolute 사용 */
    top: 8px;
    right: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${({ color }) =>
      color === "white" ? "#d3d3d3" : color !== "unknown" ? color : "#f5f5f5"};
  }

  /* 이미지 스타일 */
  img {
    width: 100px;
    height: 100px;
    margin-top: 20px; /* 이미지 위쪽 여백 */
  }

  /* Title 스타일 */
  .title {
    margin-top: 12px; /* 이미지와 제목 사이의 여백 */
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    height: 24px;
    align-items: center;
    padding: 8px 0px;
    background-color: ${({ color }) =>
      color === "white" ? "#d3d3d3" : color !== "unknown" ? color : "#f5f5f5"};
    color: white; /* 제목 텍스트 색상 */
    border-bottom-left-radius: 12px; /* 좌측 하단 둥근 모서리 */
    border-bottom-right-radius: 12px; /* 우측 하단 둥근 모서리 */
  }
`;
