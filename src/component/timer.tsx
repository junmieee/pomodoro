import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerState, roundsCompletedState, goalsCompletedState } from '../atom/atom.tsx';
import { motion } from 'framer-motion';

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

    React.useEffect(() => {
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

    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleCompleteRound = () => {
        if (roundsCompleted === 3) {
            setRoundsCompleted(0);
            setGoalsCompleted((prevGoalsCompleted) => prevGoalsCompleted + 1);
        } else {
            setRoundsCompleted((prevRoundsCompleted) => prevRoundsCompleted + 1);
        }
        setTimer(25 * 60);
        setIsPlaying(false);
    };

    const buttonVariants = {
        playing: { scale: 1.2 },
        paused: { scale: 1 },
    };

    return (
        <div>
            <div>{formatTime(timer)}</div>
            <motion.button
                onClick={handleToggle}
                variants={buttonVariants}
                animate={isPlaying ? 'playing' : 'paused'}
            >
                {isPlaying ? 'Pause' : 'Start'}
            </motion.button>
            <div>
                Rounds Completed: {roundsCompleted}
            </div>
            <div>
                Goals Completed: {goalsCompleted}
            </div>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;