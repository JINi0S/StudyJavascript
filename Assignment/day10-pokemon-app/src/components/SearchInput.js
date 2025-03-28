import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SearchInput({ searchValue, setSearchValue }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
    
  };

  return (
    <SearchInputStyled
      value={searchValue}
      onChange={handleChange}
      type="text"
      placeholder="포켓몬을 검색해주세요"
    />
  );
}

const SearchInputStyled = styled.input`
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background: #4c5c68;
  border-radius: 30px;
  color: white;
  padding: 10px 20px;
  width: 30%;
  border: none;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 10;

  :focus {
    outline: none;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
    background: #353a4d;
  }

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }

  :hover {
    background: #151235;
    cursor: pointer;
  }
`;