import React, { useRef, useState, useEffect } from "react";
import "./DamageRelationModal.css";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import requests from "../../api/requests";
import axios from "../../api/axios";
import styled from "styled-components";

export default function DamageRelationModal({ type, color, setModalOpen }) {
  const ref = useRef();
  const [damageRelations, setDamageRelations] = useState({
    weak: [],
    resistant: [],
    immune: [],
  });

  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  useEffect(() => {
    fetchTypeRelations();
  }, [type]);

  const fetchTypeRelations = async () => {
    try {
      const response = await axios.get(`${requests.fetchTypeRelations}${type}`);
      console.log(response.data);
      // 데미지 관계 분류
      const weak = response.data.damage_relations.double_damage_from || [];
      const resistant = response.data.damage_relations.half_damage_from || [];
      const immune = response.data.damage_relations.no_damage_from || [];

      setDamageRelations({
        weak,
        resistant,
        immune,
      });
    } catch (error) {
      console.error("Error fetching type relations:", error);
    }
  };

  const renderChip = (items) => {
    if (items.length === 0) {
      return <Chip>none</Chip>;
    }
    return items.map((item, index) => (
      <Chip key={index} color={color}>
        {item.name}
      </Chip>
    ));
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <Container>
            <p>데미지 관계</p>

            <Category>
              <CategoryTitle>Weak</CategoryTitle>
              <CategoryContent>
                {renderChip(damageRelations.weak)}
              </CategoryContent>
            </Category>

            <Category>
              <CategoryTitle>Resistant</CategoryTitle>
              <CategoryContent>
                {renderChip(damageRelations.resistant)}
              </CategoryContent>
            </Category>

            <Category>
              <CategoryTitle>Immune</CategoryTitle>
              <CategoryContent>
                {renderChip(damageRelations.immune)}
              </CategoryContent>
            </Category>
          </Container>
        </div>
      </div>
    </div>
  );
}

const Container = styled.div`
  padding: 30px;
  maring-top: 50px;
`;

const Category = styled.div`
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Chip = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  background-color: ${({ color }) =>
    color === "white" ? "#d3d3d3" : color || "gray"};
  color: ${({ color }) => (color === "white" ? "gray" : "#fff")};
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
`;
