import { rndInt } from "../random";

/**
 * @param {number} size 0-?
 * @param {number} coef 0-1
 * @returns {[[],[], ...]}Array<[rnd,rnd, ...]>
 */
export default function createMap(size, coef) {
    return Array.from(new Array(size), () =>
        new Array(size).fill().map(() => rndInt(coef))
    );
}
