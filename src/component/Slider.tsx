import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SliderWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 30vw;
`;

const SliderBox = styled(motion.div) <{ selectedTimer }>`
  min-width: 70px;
  border-radius: 5px;
  height: 45px;
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

const SlideBoxes = ({ timerOptions, selectedTimer, handleTimerSelection }) => {
    const slideWidth = 300;
    const slideGap = 10;

    return (
        <div style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
        }}>
            <div>
                <SliderWrapper
                    drag="x"
                    dragConstraints={{ left: -slideWidth, right: slideWidth + 50 }}
                >
                    {timerOptions.map((time, i) => (
                        <motion.div
                            key={time}
                            onClick={() => handleTimerSelection(time)}
                            style={{
                                width: slideWidth,
                                marginRight: slideGap,
                                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            <SliderBox selectedTimer={selectedTimer === time}>
                                <p>{time}</p>
                            </SliderBox>
                        </motion.div>
                    ))}
                </SliderWrapper>
            </div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 50,
                    pointerEvents: "none",
                    background: "linear-gradient(to left, rgba(255, 255, 255, 0), #FE5858",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: 50,
                    pointerEvents: "none",
                    background: "linear-gradient(to right, rgba(255, 255, 255, 0), #FE5858",
                }}
            />
        </div>
    );
};

export default SlideBoxes;