// CONFIG
const DEFAULT_SIZE_NUMBER = 10;
const DEFAULT_FILL_COEF = 0.3;
const SPEED = 500;

const DEFAULT_POINT_SIZE_PX = 20; // px
const DEFAULT_GAP_SIZE_PX = 1; // px
const BORDER_PX = 1; // px

// MAP SYMBOLS
const DISABLED_SYMBOLS = [1];
const EMPTY = 0;
const FINISH = 2;
const PLAYER = 4;

// TEXT SWAP MAP
const TXTtypes = {
    empty: "",
    finish: "⚑",
    player: "◈",
    blocked: "",
};
const TXTswap = {
    [EMPTY]: "empty",
    [FINISH]: "finish",
    [PLAYER]: "player",
};
DISABLED_SYMBOLS.forEach((i) => {
    TXTswap[i] = "blocked";
});

// PLAYER
const PATTERNS = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
];

// INPUT LIMITS
const INPUT_SIZE_LIMIT_BOTTOM = 8;
const INPUT_SIZE_LIMIT_TOP = 100;
const INPUT_COEF_LIMIT = 1;
const INPUT_SPEED_LIMIT = 10000;

export {
    INPUT_SIZE_LIMIT_BOTTOM,
    INPUT_SIZE_LIMIT_TOP,
    INPUT_COEF_LIMIT,
    INPUT_SPEED_LIMIT,
    DEFAULT_POINT_SIZE_PX,
    DEFAULT_GAP_SIZE_PX,
    BORDER_PX,
    DEFAULT_SIZE_NUMBER,
    DEFAULT_FILL_COEF,
    SPEED,
    DISABLED_SYMBOLS,
    PLAYER,
    EMPTY,
    FINISH,
    TXTswap,
    TXTtypes,
    PATTERNS,
};
