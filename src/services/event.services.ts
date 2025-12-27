
import { useRecoilCallback, useRecoilState } from 'recoil';
import { eventAtom } from '../state/event.atom';
import { mockEventApi } from '../api/event.api';
import type { Event, EventModuleType, LinkItem } from '../types/event.types';


export const useEventService = () => {
    const [event, setEvent] = useRecoilState(eventAtom);

    const updateEventField = (field: string, value: string | number | null): void => {
        setEvent((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    const updateBackground = (field: string, value: { type: 'gradient' | 'image' | 'color'; value: string }): void => {
        setEvent(prev => ({
            ...prev,
            [field]: value,
        }));
    }
    const uploadFlyer = async (file: File) => {
        const imageUrl = await mockEventApi.uploadImage(file);
        setEvent(prev => ({
            ...prev,
            flyer_style: { type: 'image', value: imageUrl },
        }));
    };

    const addNewRow = (field: string) => {
        setEvent(prev => ({
            ...prev,
            [field]: [
                ...(prev[field as 'links' | 'photo_gallery'] ?? []),
                { id: crypto.randomUUID(), value: "" }
            ]
        }));
    }

    const removeRow = (field: string, id: string) => {
        setEvent(prev => ({
            ...prev,
            [field]: prev[field as 'links' | 'photo_gallery']?.filter((i: LinkItem) =>
                i.id !== id),
        }));
    };

    const updateRowValue = (field: string, id: string, value: string) => {
        setEvent(prev => ({
            ...prev,
            [field]: prev[field as 'links' | 'photo_gallery']?.map((i: LinkItem) =>
                i.id === id ? { ...i, value } : i
            ) ?? [],
        }));
    };

    const addModule = (type: EventModuleType): void => {
        setEvent(prev => ({
            ...prev,
            modules: [...(prev.modules ?? []), { type }]
        }));
    };

    const createEvent = useRecoilCallback(({ set }) => async (postData: Event) => {
        try {
            const response = await mockEventApi.createEvent(postData);
            if (!response) {
                throw new Error('Network response was not ok');
            }
            const newPost = response
            set(eventAtom, newPost);
            return newPost;
        } catch (error) {
            console.error("Error creating post:", error);
            // Handle the error, possibly by setting an error state atom
            throw error;
        }
    }, []);
    return {
        event,
        updateEventField,
        updateBackground,
        addNewRow,
        removeRow,
        updateRowValue,
        uploadFlyer,
        addModule,
        createEvent
    }
}

