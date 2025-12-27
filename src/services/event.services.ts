
import { useRecoilState } from 'recoil';
import { eventAtom } from '../state/event.atom';
import { mockEventApi } from '../api/event.api';


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

    return {
        event,
        updateEventField,
        updateBackground,
        uploadFlyer,
    }
}

