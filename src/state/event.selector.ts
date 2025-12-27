import { selector, useRecoilCallback } from "recoil";
import { eventAtom } from "./event.atom";
import { mockEventApi } from "../api/event.api";
import type { Event } from "../types/event.types";

export const createEventSelector = selector<Event>({
    key: "createEventSelector",
    get: async () => {
        throw new Error("createEventSelector is write-only");

    },
    set: async ({ set, get }) => {
        console.log("Creating event...",eventAtom);
        const event = get(eventAtom);
        const savedEvent = await mockEventApi.createEvent(event);
        set(eventAtom, savedEvent);
    }
});

export const fetchModulesSelector = selector({
    key: "fetchModulesSelector",
    get: async () => {
        return mockEventApi.fetchModules();
    },
});
 
