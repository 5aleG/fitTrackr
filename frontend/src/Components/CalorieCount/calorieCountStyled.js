import styled from "styled-components";

export const CalorieCountSquare = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 30px;
  padding: 20px;
  color: var(--primary-text-color);
  cursor: pointer;
  transition: height 0.3s;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  box-shadow: 0 0 18px var(--box-shadow-color);
`;

export const CalorieCountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DailyCalorie = styled.p`
  font-size: 14px;
  font-weight: normal;
  padding-bottom: 5px;
`;

export const BigCalories = styled.p`
  font-size: 28px;
  font-weight: bold;
`;

export const Kcal = styled.span`
  font-size: 12px;
  font-weight: normal;
`;

export const CalorieImage = styled.img`
  width: 110px;
  height: 70px;
  margin-left: auto;
`;
