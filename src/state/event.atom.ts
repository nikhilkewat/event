import { atom } from 'recoil';
import type { Event } from '../types/event.types';


export const eventAtom = atom<Event>({
    key: 'eventAtom',
    default: {
        id: 'temp-event-id',
        name: '',
        phone_number: '',
        date_time: '',
        location: '',
        cost_per_person: 0,
        description: '',
        capacity: null,
       photo_gallery: [{ id: crypto.randomUUID(), value: '' }],
    links: [{ id: crypto.randomUUID(), value: '' }],
        modules: [],
        background_style: {
            type: 'gradient',
            value: 'from-[#1B2A29] via-[#AC6887]  to-[#1C2929]',
        },
        flyer_style: {
            type: 'gradient',
            value: 'from-[#1B2A29] via-[#AC6887]  to-[#1C2929]',
        },
        is_published: false,
        slug: '',
    },
});