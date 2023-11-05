import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DISABLED_SYMBOLS, FINISH, PLAYER, EMPTY } from "../utils/consts";
import { setWorkingValue, setVictory } from "../store/configSlice";
import { setPointValue } from "../store/mapSlice";
import {
    setPlayerPosition,
    addStep,
    setPrevPosition,
    addStepPath,
} from "../store/playerSlice";
import { rndRangedInt } from "../utils/random";
//import generateRangedRndCoordinates from "../../utils/coordinates/generateRangedRndCoordinates";

export default function useTimedStep() {
    const dispatch = useDispatch();
    const [tick, setTick] = useState(0);
    // CONFIG
    const working = useSelector((state) => state.config.working);
    const win = useSelector((state) => state.config.victory);
    const speed = useSelector((state) => state.config.speed);
    //const size = useSelector((state) => state.config.size);
    const limit = useSelector((state) => state.config.limit);
    // MAP
    const field = useSelector((state) => state.map.field);
    // PLAYER
    const PL = useSelector((state) => state.player);
    const position = useSelector((state) => state.player.position);
    const prevpos = useSelector((state) => state.player.prevpos);
    const patterns = useSelector((state) => state.player.patterns);
    //const steps = useSelector((state) => state.player.steps);
    const stepsPath = useSelector((state) => state.player.stepsPath);

    console.log("useTimedStep", tick);
    console.log("working", working);

    function getMapPoint([x, y]) {
        return field[y][x];
    }

    function lookAround() {
        const ways = patterns;
        let free_slots = [];
        const full_slots = [];
        const past_slots = [];

        // создаём строку паттерном для дальнейшей проверки регуляркой
        const prevsStringValue = prevpos ? prevpos.join(";") : "";

        for (let i = 0; i < ways.length; i++) {
            const local_pos = [...position];
            local_pos[0] = local_pos[0] + ways[i][0];
            local_pos[1] = local_pos[1] + ways[i][1];
            const next_coords = [local_pos[0], local_pos[1]];

            console.log(`${i} next_coords`, next_coords);

            // проверка на выход за поле
            if (
                local_pos[0] < 0 ||
                local_pos[0] > limit ||
                local_pos[1] < 0 ||
                local_pos[1] > limit
            ) {
                console.log("ВЫХОД ЗА ПОЛЕ");
                continue;
            }

            // проверка на нахождение выхода
            if (getMapPoint(next_coords) === FINISH) {
                dispatch(setWorkingValue(false));
                dispatch(setVictory(true));
                return { victory: true };
            }

            // проверка на блок символы
            if (!DISABLED_SYMBOLS.includes(getMapPoint(next_coords))) {
                full_slots.push(next_coords);

                // проверка на пересечение с прошлым шагом
                const regExp = new RegExp(String(next_coords));
                // console.log(
                //     "REGEXP",
                //     regExp,
                //     prevsStringValue,
                //     regExp.test(prevsStringValue)
                // );
                if (regExp.test(prevsStringValue)) {
                    past_slots.push(next_coords);
                    continue;
                }
                console.log("REGEXP FALSE");
                // чек на пересечение с полным путём

                // const fullpathStringArray = player.steps.join(";"); //.split(";");

                //   const countIdenticStepsIndexArray = fullpathStringArray
                //     .map((str, index) => {
                //       if (str === String(next_coords)) return index;
                //     })
                //     .filter((value) => value).reverse();
                //   const countIdenticStepsLength = countIdenticStepsIndexArray.length;

                //   if (regExp.test(fullpathStringArray)) {
                //     console.log("CROSS PAST WAY", String(next_coords), player.stepsPath);
                //     free_slots = [...player.stepsPath[String(next_coords)]];
                //     break;
                //   }

                free_slots.push(next_coords);
            }
        }

        // Если нет фри слотов для хода, даём пересечиния с прошлого хода
        if (!free_slots.length) {
            return { free: past_slots, full: full_slots };
        }

        // Находим наилучшие вектора движения (топ3)
        let vectors = [];
        if (prevpos) {
            for (let i = 0; i < free_slots.length; i++) {
                const [prev_x, prev_y] = prevpos[0];
                const x_diff = Math.abs(free_slots[i][0] - prev_x);
                const y_diff = Math.abs(free_slots[i][1] - prev_y);
                const sum = x_diff + y_diff;
                vectors.push({ value: sum, coords: free_slots[i] });
            }
        }
        console.log("vectors", vectors);
        if (vectors.length) {
            vectors.sort((a, b) => a.value - b.value);
            if (vectors.length > 3) vectors.splice(3);
            vectors = vectors.map((v) => v.coords);
            console.log("sort vectors", vectors);
        }

        const free = vectors.length ? vectors : free_slots;
        console.log("free/full", { free, full: full_slots });
        return { free, full: full_slots };
    }

    // Сохранение хеша пути
    function saveStepPath(posa, freeSlotsArray) {
        const hashPath = [posa, ...freeSlotsArray];
        if (!stepsPath[String(posa)]) {
            //player.stepsPath[String(position)] = hashPath;
            dispatch(addStepPath({ position: posa, hash: hashPath }));
        }
        //player.prevpos = hashPath;
        dispatch(setPrevPosition(hashPath));
    }
    // Изменение поля + изменение состояния
    function makeStep(coordinates) {
        //setMapPointValue(FREE_SLOT, player.position);
        //setMapPointValue(PLAYER, coordinates);

        //dispatch(setPointValue({ coords: position, value: EMPTY }));
        //dispatch(setPointValue({ coords: coordinates, value: PLAYER }));

        //player.steps.push(player.position);
        dispatch(addStep(position));
        //player.position = coordinates;
        dispatch(setPlayerPosition(coordinates));
        console.log("makeStep", coordinates);
    }

    function pause(ms) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }

    useEffect(() => {
        (async function () {
            if (!working || win) return;
            await pause(speed);

            const { free, full, victory } = lookAround() || {};
            console.log("victory", victory);
            console.clear();
            console.log(PL);
            if (victory) {
                setTick(0);
                return;
            }
            const freeIndex = rndRangedInt(0, free.length - 1);
            console.log("free", free);
            console.log("freeIndex", freeIndex);
            const selected_slot_coords = free[freeIndex];
            console.log("selected_slot_coords", selected_slot_coords);
            saveStepPath(position, full);
            makeStep(selected_slot_coords);

            setTick((t) => t + 1);
        })();
    }, [tick, working]);

    // useEffect(()=>{

    // },[])
}
