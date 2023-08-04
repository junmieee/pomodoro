import './App.css';
import styled from "styled-components";
import { motion } from 'framer-motion'
import Timer from './component/timer.tsx';

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
margin: 50px;
`;




function App() {
  return (
    <Wrapper >
      <Timer />
    </Wrapper>

  );
}

export default App;
