import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timerState, roundsCompletedState, goalsCompletedState } from '../atom/atom.tsx';
import { motion, PanInfo, useAnimation, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import SlideBoxes from './Slider.tsx';
import FormatTime from './FormatTime.tsx';
import { CreateTypes } from "canvas-confetti";
import ReactCanvasConfetti from './Canvas/Canvas.tsx';
import {
    CardWrapper,
    Button,
    TextWrapper,
    CountdownCircleTimerWrapper,
    RoundCircle,
    GoalWrapper,
    GoalInfo,
    GoalText
} from './timerStyle.ts';

const Timer: React.FC = () => {
    const [timer, setTimer] = useRecoilState(timerState);
    const [selectedTimer, setSelectedTimer] = useState(25);
    const [goalInputValue, setGoalInputValue] = useState("");

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const roundsCompleted = useRecoilValue(roundsCompletedState);
    const setRoundsCompleted = useSetRecoilState(roundsCompletedState);
    const goalsCompleted = useRecoilValue(goalsCompletedState);
    const setGoalsCompleted = useSetRecoilState(goalsCompletedState);

    const isAnimationEnabledRef = useRef(false);
    const animationInstanceRef = useRef<CreateTypes | null>(null);


    useEffect(() => {
        if (roundsCompleted > 0) {
            handlerFire();
        }
    }, [roundsCompleted]);

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

    const makeShot = (particleRatio: number, opts: object) => {
        animationInstanceRef.current &&
            animationInstanceRef.current({
                ...opts,
                origin: { y: 0.8 },
                particleCount: Math.floor(200 * particleRatio),
            });
    };

    const fire = () => {
        makeShot(0.3, {
            spread: 26,
            startVelocity: 55,
        });
        makeShot(0.4, {
            spread: 20,
        });

        makeShot(0.5, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.7, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.7, {
            spread: 120,
            startVelocity: 45,
            gravity: 0.2,
        });
        makeShot(0.7, {
            spread: 150,
            startVelocity: 95,
            gravity: 0.2,
        });
        makeShot(0.7, {
            spread: 150,
            startVelocity: 95,
            gravity: 0.2,
        });
    };

    const handlerFire = () => {
        if (!isAnimationEnabledRef.current) {
            isAnimationEnabledRef.current = true;
        }
        requestAnimationFrame(fire);
        fire();
    };
    const getInstance = (instance: CreateTypes | null) => {
        animationInstanceRef.current = instance;
    };

    const buttonVariants = {
        initial: { scale: 1 },
        animate: { scale: 1.2 },
    };




    const handleToggle = () => {
        setIsPlaying((prev) => !prev);
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

    }


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

    return (

        <div>
            <ReactCanvasConfetti refConfetti={getInstance} className="canvas" />
            <FormatTime timeInSeconds={timer} setIsPlaying={setIsPlaying} setTimer={setTimer} />
            <SlideBoxes
                timerOptions={[15, 20, 25, 30, 35, 40, 45, 50]}
                selectedTimer={selectedTimer}
                handleTimerSelection={handleTimerSelection}

            />
            <CountdownCircleTimerWrapper>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={Number(selectedTimer)}
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
                    </GoalInfo>
                    <GoalText>GOAL</GoalText>
                </GoalWrapper>

            </TextWrapper>

        </div>
    );
};

export default Timer;


