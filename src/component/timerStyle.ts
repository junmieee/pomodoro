
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardWrapper = styled(motion.div)`
display: flex;
gap: 20px;
justify-content: center;
align-items: center;

`;

export const Button = styled(motion.div)`
  display: flex;
  width: 90px;
  height: 90px;
  margin: 0 auto;
  color: black;
  opacity: 0.4;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
      font-weight: 300;
      font-size: 30px;
      margin-bottom: 10px;
  }
`;

export const CountdownCircleTimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;

`


export const RoundCircle = styled(motion.div)`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: ${({ completed }) => (completed ? '#BD4235' : 'transparent')};
border: 2px solid #BD4235;
margin: 5px;
`;

export const GoalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;;
  align-items: center;

`

export const GoalInfo = styled.span`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
  opacity: 0.5;
`;

export const GoalText = styled.span`
color: #fff;
  font-size: 20px;
  font-weight: bold;
`;


