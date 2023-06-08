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
            if (goalsCompleted === 12) {
                setRoundsCompleted(0);
                setGoalsCompleted(0)
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
            <motion.div
                variants={timerVariants}
                initial="initial"
                animate="animate"
                key={timer}
            >
                {formatTime(timer)}
            </motion.div>
            <motion.button
                onClick={handleToggle}
                variants={buttonVariants}
                whileTap={{ scale: 0.9 }}
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