import { rndRangedInt } from "../random";

export default function generateRangedRndCoordinates(min, max) {
    return [rndRangedInt(min, max), rndRangedInt(min, max)];
}
