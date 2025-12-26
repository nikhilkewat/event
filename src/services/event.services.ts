
import { useRecoilState } from 'recoil';
import { eventAtom } from '../state/event.atom';


export const useEventService = () => {
    const [event, setEvent] = useRecoilState(eventAtom);
    return {
        event,

    }
}

