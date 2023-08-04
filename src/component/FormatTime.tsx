import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { BiReset } from "react-icons/bi";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 4rem;
  color: #fff;
`;

const CardWrapper = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const TimeCard = styled.div`
  width: 180px;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const TimeNumber = styled(motion.div)`
  font-size: 80px;
  color: #FE5858;
  font-weight: bold;
`;

const ColonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const Colon = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.4;

`

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    cursor: pointer;
    svg {
        color: #fff;
        width: 40px;
        height: 40px;
        opacity: 0.6;
    }
    
`

const FormatTime = ({ timeInSeconds, setTimer, setIsPlaying }) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');

    const handleReset = () => {
        setIsPlaying(false);
        setTimer(25 * 60);

    };

    const timerVariants = {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
    };

    const buttonVariants = {
        initial: { scale: 1 },
        animate: { scale: 1.2 },
    };

    return (
        <>
            <Title>POMOTIMER</Title>
            <IconWrapper>
                <motion.div
                    variants={buttonVariants}
                    onClick={handleReset}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    <BiReset />
                </motion.div>
            </IconWrapper>
            <CardWrapper>
                <motion.div
                    variants={timerVariants}
                    initial="initial"
                    animate="animate"
                    key={minutes}
                >
                    <TimeCard>
                        <motion.div
                            style={{ color: '#000' }}
                            key={minutes}
                        >
                            <TimeNumber
                                variants={timerVariants}
                                initial="initial"
                                animate="animate"
                                key={minutes}
                            >
                                {minutes}
                            </TimeNumber>
                        </motion.div>
                    </TimeCard>
                </motion.div>
                <ColonWrapper>
                    <Colon />
                    <Colon />
                </ColonWrapper>
                <motion.div
                    variants={timerVariants}
                    initial="initial"
                    animate="animate"
                    key={seconds}
                >
                    <TimeCard>
                        <motion.div
                            style={{ color: '#000' }}
                            key={seconds}
                        >
                            <TimeNumber
                                variants={timerVariants}
                                initial="initial"
                                animate="animate"
                                key={minutes}
                            >
                                {seconds}
                            </TimeNumber>
                        </motion.div>
                    </TimeCard>
                </motion.div>
            </CardWrapper>
        </>
    );
};


export default FormatTime;
