// значеие 0 или 1
function rndInt(persent) {
    return Math.random() > persent ? 0 : 1;
}
// знак -1 или 1
function rndSign(persent) {
    return Math.random() > persent ? 1 : -1;
}
// рандомное число в диапазоне
function rndRangedInt(min, max) {
    const rnd = min + Math.random() * (max + 1 - min);
    return Math.floor(rnd);
}

export { rndInt, rndSign, rndRangedInt };
