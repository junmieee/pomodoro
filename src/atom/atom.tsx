import { atom } from 'recoil';

// 타이머 상태를 나타내는 atom
export const timerState = atom<number>({
    key: 'timerState',
    default: 25 * 60, // 25분을 초 단위로 표현
});

// 완료된 라운드 수를 나타내는 atom
export const roundsCompletedState = atom<number>({
    key: 'roundsCompletedState',
    default: 0,
});

// 완료된 목표 수를 나타내는 atom
export const goalsCompletedState = atom<number>({
    key: 'goalsCompletedState',
    default: 0,
});

// 사용자가 설정한 목표를 나타내는 atom
export const goalState = atom<number>({
    key: 'goalState',
    default: 0,
});