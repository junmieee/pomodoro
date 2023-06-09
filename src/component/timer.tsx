import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerState, roundsCompletedState, goalsCompletedState } from '../atom/atom.tsx';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PauseCircleIcon } from "@heroicons/20/solid";

const CardWrapper = styled(motion.div)`
  display: flex;
  gap: 20px;
`;

const TimeCard = styled.div`
  width: 180px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const TimeNumber = styled(motion.div)`
  font-size: 80px;
  color: #d0e;
  font-weight: bold;

`;

const Button = styled(motion.div)`
    

`



const Timer: React.FC = () => {
    const [timer, setTimer] = useRecoilState(timerState);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const roundsCompleted = useRecoilValue(roundsCompletedState);
    const goalsCompleted = useRecoilValue(goalsCompletedState);
    const setRoundsCompleted = useSetRecoilState(roundsCompletedState);
    const setGoalsCompleted = useSetRecoilState(goalsCompletedState);

    const handleToggle = () => {
        setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setTimer(25 * 60);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isPlaying && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            handleCompleteRound();
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, timer]);

    const formatTime = (timeInSeconds: number): JSX.Element => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return (
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
        );
    };


    const handleCompleteRound = () => {
        if (roundsCompleted === 3) {
            setRoundsCompleted(0);
            if (goalsCompleted === 12) {
                setRoundsCompleted(0);
                setGoalsCompleted(0);
            } else {
                setGoalsCompleted((prev) => prev + 1);
            }
        } else {
            setRoundsCompleted((prev) => prev + 1);
        }
        setTimer(25 * 60);
        setIsPlaying(false);
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
        <div>
            {formatTime(timer)}
            <Button
                onClick={handleToggle}
                variants={buttonVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isPlaying ? <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"></path>
                </svg> : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"></path>
                </svg>}
            </Button>
            <div>Rounds Completed: {roundsCompleted}</div>
            <div>Goals Completed: {goalsCompleted}</div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;