import './App.css';
import styled from "styled-components";
import { motion } from 'framer-motion'
import Timer from './component/timer.tsx';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;



function App() {
  return (
    <Wrapper>
      {/* <Box /> */}
      <Timer />
    </Wrapper>
    // {/* <header className="App-header">
    //   <img src={logo} className="App-logo" alt="logo" />
    //   <p>
    //     Edit <code>src/App.js</code> and save to reload.
    //   </p>
    //   <a
    //     className="App-link"
    //     href="https://reactjs.org"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     Learn React
    //   </a>
    // </header> */}
  );
}

export default App;
