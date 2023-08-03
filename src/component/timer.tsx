import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerState, roundsCompletedState, goalsCompletedState } from '../atom/atom.tsx';
import { motion, PanInfo, useAnimation, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import SlideBoxes from './Slider.tsx';
import FormatTime from './FormatTime.tsx';


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

const Button = styled(motion.div)`
    display: flex;
    width: 90px;
    height: 90px;
    margin: 0 auto;
    color: black;
    opacity: 0.4;
`

const Colon = styled.p`
    font-weight: bold;
    font-size: 50px;
    color: #485460;
`

const TextWrapper = styled.div`
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

const ResetButton = styled.button`
    
`

const CountdownCircleTimerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;

`


const RoundCircle = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ completed }) => (completed ? '#BD4235' : 'transparent')};
  border: 2px solid #BD4235;
  margin: 5px;
`;

const GoalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;;
    align-items: center;
  
`

const GoalInfo = styled.span`
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    opacity: 0.5;
`;

const GoalText = styled.span`
 color: #fff;
    font-size: 20px;
    font-weight: bold;
`;


const GoalInput = styled.input`
    width: 35px;
    height: 30px;
    border-radius: 10px;
    border: none;
    
`


const Timer: React.FC = () => {
    const [timer, setTimer] = useRecoilState(timerState);
    const [selectedTimer, setSelectedTimer] = useState(25);
    const [goalInputValue, setGoalInputValue] = useState("");
    const [showCongrats, setShowCongrats] = useState(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const roundsCompleted = useRecoilValue(roundsCompletedState);
    const setRoundsCompleted = useSetRecoilState(roundsCompletedState);
    const goalsCompleted = useRecoilValue(goalsCompletedState);
    const setGoalsCompleted = useSetRecoilState(goalsCompletedState);
    const circleAnimation = useAnimation();

    // useEffect(() => {
    //     setTimer(selectedTimer * 60);
    //     if (isPlaying && timer > 0) {
    //         circleAnimation.start({
    //             opacity: 1,
    //             rotate: -90,
    //             transition: { duration: timer, ease: 'linear' },
    //         });
    //     }
    // }, [selectedTimer, isPlaying, timer]);

    // useEffect(() => {
    //     if (isPlaying && timer > 0) {
    //         circleAnimation.start({
    //             opacity: 1,
    //             rotate: -90,
    //             transition: { duration: timer, ease: 'linear' },
    //         });
    //     } else {
    //         circleAnimation.stop();
    //     }
    // }, [isPlaying, timer, circleAnimation]);

    const handleToggle = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleGoalInputChange = (event) => {
        setGoalInputValue(event.target.value);
    };

    // const handleSetGoalCompleted = () => {
    //     const newGoalsCompleted = parseInt(goalInputValue, 10);
    //     if (!isNaN(newGoalsCompleted)) {
    //         setGoalsCompleted(newGoalsCompleted);
    //     }
    // };

    const handleTimerSelection = (time: number) => {
        setTimer(time * 60);
        setSelectedTimer(time);
        if (isPlaying && timer > 0) {
            circleAnimation.start({
                opacity: 0.8,
                rotate: -360,
                transition: { duration: timer, ease: 'linear' },
            });
        }
    }




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


    const handleCompleteRound = () => {
        if (roundsCompleted === 3) {
            setRoundsCompleted(0);
            if (goalsCompleted === goalInputValue) {
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
        setShowCongrats(true);
        setTimeout(() => {
            setShowCongrats(false);
        }, 2000); // 축하 효과가 보여지는 시간 (2초)
    };

    const renderRoundCircles = () => {
        const maxRounds = 3;
        const completedRounds = roundsCompleted;

        return (
            <CardWrapper>
                {Array.from({ length: maxRounds }).map((_, index) => (
                    <RoundCircle
                        key={index}
                        completed={index < completedRounds || index >= maxRounds}
                    />
                ))}
            </CardWrapper>
        );
    };


    const buttonVariants = {
        initial: { scale: 1 },
        animate: { scale: 1.2 },
    };

    return (

        <div>
            {showCongrats && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                >
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="yellow"
                            strokeWidth="4"
                            stroke="gold"
                        />
                        <text x="30" y="55" fontSize="28" fontWeight="bold">
                            Congrats!
                        </text>
                    </svg>
                </motion.div>
            )}
            <FormatTime timeInSeconds={timer} setIsPlaying={setIsPlaying} setTimer={setTimer} />
            <SlideBoxes
                timerOptions={[15, 20, 25, 30, 35, 40, 45, 50]}
                selectedTimer={selectedTimer}
                handleTimerSelection={handleTimerSelection}

            />
            <CountdownCircleTimerWrapper>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={Number(timer)}
                    colors={'#fff'}
                    trailColor="#FE5858"
                    strokeWidth={6}
                    strokeLinecap="round"
                    size={100}
                    onComplete={handleCompleteRound}
                >
                    {() => (
                        <Button
                            onClick={handleToggle}
                            variants={buttonVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isPlaying ? (
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm5-2.25A.75.75 0 017.75 7h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5zm4 0a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75v-4.5z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                                    ></path>
                                </svg>
                            )}
                        </Button>
                    )}
                </CountdownCircleTimer>
            </CountdownCircleTimerWrapper>
            <TextWrapper>
                <CardWrapper>{renderRoundCircles()}</CardWrapper>
                <GoalWrapper>
                    <GoalInfo>
                        {goalsCompleted} / 4
                        {/* <GoalInput value={goalInputValue} onChange={handleGoalInputChange} />
                        <button >Set Goal Completed</button> */}
                    </GoalInfo>
                    <GoalText>GOAL</GoalText>
                </GoalWrapper>

            </TextWrapper>

        </div>
    );
};

export default Timer;