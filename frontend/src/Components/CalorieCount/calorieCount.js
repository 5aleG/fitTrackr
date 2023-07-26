import React, { useEffect, useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  CalorieCountSquare,
  CalorieCountInfo,
  DailyCalorie,
  BigCalories,
  Kcal,
  CircularProgressbarWrapper,
  AverageContainer,
  AverageLabel,
  AverageValue,
  DateLabel,
  ExpandableText,
} from "./calorieCountStyled";
import { PiBowlFoodDuotone } from "react-icons/pi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const CalorieCount = () => {
  const [expanded, setExpanded] = useState(false);
  const [calories, setCalories] = useState(0);
  const dailyCalories = 1856; // Dummy data
  const dailyaCaloriesGoal = 2500; //Dummy data

  const handleCalorieCountClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    let startValue = 0;
    const animationDuration = 600;
    const step = (dailyCalories / animationDuration) * 10;

    const timer = setInterval(() => {
      startValue += step;
      if (startValue >= dailyCalories) {
        clearInterval(timer);
      }
      setCalories(Math.floor(startValue));
    }, 10);
    return () => clearInterval(timer);
  }, [dailyCalories]);

  // Dummy data for the caloric intake of the previous 7 days
  const previousDaysData = [
    { date: "2023-07-21", calories: 1850 },
    { date: "2023-07-20", calories: 2200 },
    { date: "2023-07-19", calories: 2100 },
    { date: "2023-07-18", calories: 1950 },
    { date: "2023-07-17", calories: 1800 },
    { date: "2023-07-16", calories: 1900 },
    { date: "2023-07-15", calories: 2000 },
  ];

  // Calculate the average of the last 7 days (excluding "Today")
  const averageCalories = previousDaysData.slice(1).reduce((sum, dayData) => sum + dayData.calories, 0) / 6;

  let progressPercentage = (calories / dailyaCaloriesGoal) * 100;
  if (calories > dailyaCaloriesGoal) {
    progressPercentage = 100;
  }

  return (
    <CalorieCountSquare onClick={handleCalorieCountClick} expanded={expanded}>
      <CalorieCountInfo>
        <DailyCalorie>Daily Calorie</DailyCalorie>
        <BigCalories>
          {calories} <Kcal>Cal</Kcal>
        </BigCalories>
        {expanded && (
          <AverageContainer>
            <AverageLabel>Average of the Last 7 Days:</AverageLabel>
            <AverageValue>{Math.round(averageCalories)} Cal</AverageValue>
          </AverageContainer>
        )}
        <ExpandableText expanded={expanded}>
          {previousDaysData.map((dayData, index) => (
            <div key={index}>
              <PiBowlFoodDuotone style={{ color: "#78C4D3", marginRight: "5px" }} />
              <DateLabel>{formatDate(dayData.date)}:</DateLabel> {dayData.calories} Cal
            </div>
          ))}
        </ExpandableText>
      </CalorieCountInfo>
      {!expanded && <CircularProgressbarWrapper>
          <CircularProgressbar
            value={progressPercentage}
            text={`${dailyCalories} / ${dailyaCaloriesGoal} cal`}
            styles={{
              path: {
                stroke: `#78C4D3`,
                strokeWidth: 7,
                strokeLinecap: 'round',
              },
              trail: {
                stroke: '#EBF5F8',
                strokeWidth: 7,
              },
              text: {
                fill: 'var(--primary-text-color)',
                fontSize: '10px',
                fontWeight: 'bold',
              },
            }}
          />
        </CircularProgressbarWrapper>}
    </CalorieCountSquare>
  );
};

export default CalorieCount;
