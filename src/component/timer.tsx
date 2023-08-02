import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerState, roundsCompletedState, goalsCompletedState } from '../atom/atom.tsx';
import { motion, PanInfo, useAnimation, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useCountdown } from 'react-countdown-circle-timer'



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

const Text = styled.div`
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


const SliderContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  margin: 10px 0;
  padding: 10px;
`;

const SliderWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SliderBox = styled(motion.div) <{ selectedTimer }>`
  min-width: 70px;
  border-radius: 5px;
  height: 45px;
  /* background-color: #FE5858; */
  background-color: ${(props) => props.selectedTimer ? '#fff' : '#FE5858'};

  border: 2px solid #fff;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
      font-size: 30px;
      font-weight: bold;
     color: ${(props) => props.selectedTimer ? '#FE5858' : '#fff'};
  }
`;


const boxVariants = {
    entry: (back: boolean) => ({
        x: back ? -500 : 500,
        opacity: 0,
        scale: 0
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { duration: 0.5 }
    },
    exit: (back: boolean) => ({
        x: back ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: { duration: 0.5 }
    })
};


const BoxVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        transition: {
            //bouncing 방지
            type: "tween",
            delay: 0.3,
            duration: 0.2,
        },
    },
};


const rowVariants = {
    hidden: (right: number) => {
        return {
            x: right === 1 ? window.innerWidth + 5 : -window.innerWidth - 5,
        };
    },
    visible: {
        x: 0,
        y: 0,
    },
    exit: (right: number) => {
        return {
            x: right === 1 ? -window.innerWidth - 5 : window.innerWidth + 5,
        };
    },
};


const Timer: React.FC = () => {
    const [timer, setTimer] = useRecoilState(timerState);
    const [selectedTimer, setSelectedTimer] = useState(25);

    const [isPlaying, setIsPlaying] = useState(false);
    const roundsCompleted = useRecoilValue(roundsCompletedState);
    const goalsCompleted = useRecoilValue(goalsCompletedState);
    const setRoundsCompleted = useSetRecoilState(roundsCompletedState);
    const setGoalsCompleted = useSetRecoilState(goalsCompletedState);
    const circleAnimation = useAnimation();



    useEffect(() => {
        if (isPlaying && timer > 0) {
            circleAnimation.start({
                opacity: 1,
                rotate: -90,
                transition: { duration: timer, ease: 'linear' },
            });
        } else {
            circleAnimation.stop();
        }
    }, [isPlaying, timer, circleAnimation]);

    const handleToggle = () => {
        setIsPlaying((prev) => !prev);
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
            <>
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
                    <Colon>:</Colon>
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

    const handleCompleteRound = () => {
        if (roundsCompleted === 3) {
            setRoundsCompleted(0);
            if (goalsCompleted === 5) {
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

    const renderSlideBoxes = () => {
        const timerOptions = [15, 20, 25, 30, 35, 40, 45, 50];


        const handleTimerSelection = (time: number) => {
            setTimer(time * 60);
            setSelectedTimer(time);
        };

        return timerOptions.map((time, i) => (
            <div key={i}>
                <motion.div
                    key={time}
                    onClick={() => handleTimerSelection(time)}
                    whileTap={{ scale: 0.9 }}
                    drag="x"
                    variants={boxVariants}
                    initial="entry"
                    animate="center"
                    exit="exit"
                // transition={{
                //     x: { type: "spring", stiffness: 300, damping: 30 },
                //     opacity: { duration: 0.2 }
                // }}
                >
                    <SliderBox selectedTimer={selectedTimer === time}>
                        <p>{time}</p>
                    </SliderBox>
                </motion.div>

            </div>

        ));
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
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', margin: '0 auto' }}>
                {renderSlideBoxes()}
            </div>
            <CountdownCircleTimerWrapper>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={Number(timer)}
                    colors={[['#fff']]}
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


            <Text>
                <div>Rounds Completed: {roundsCompleted}</div>
                <div>Goals Completed: {goalsCompleted}</div>
            </Text>

            <ResetButton onClick={handleReset}>Reset</ResetButton>
        </div>
    );
};

export default Timer;