import type { Event } from "../types/event.types";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));



export const mockEventApi = {
  createEvent: async (data: Event) => {
    await delay(400);
    return {
      id: "evt_" + Math.random().toString(36).slice(2),
      ...data,
    };
  },

  uploadImage: async (file: File) => {
    await delay(300);
    return URL.createObjectURL(file);
  },

  fetchModules: async () => {
    await delay(300);
    return [
      {
        id: "mod_cta",
        type: "cta",
        label: "RSVP Now",
      },
      {
        id: "mod_link",
        type: "link",
        label: "Visit Website",
        url: "https://example.com",
      },
    ];
  },
};
