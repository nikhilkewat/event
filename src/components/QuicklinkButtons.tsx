import { Palette } from "lucide-react";
import type { EventModuleType, QuickLink } from "../types/event.types";
import { useState } from "react";
import {useRecoilValue} from 'recoil'
import { eventAtom } from "../state/event.atom";
import { useEventService } from "../services/event.services";



const VISIBLE_COUNT = 3;

const ALL_MODULES: QuickLink[] = [
    { label: 'Capacity', type: 'capacity' },
    { label: 'Photo Gallery', type: 'photoGallery' },
    { label: 'Links', type: 'links' },
    { label: 'Privacy', type: 'privacy' },
    { label: 'Schedule', type: 'schedule' },
];

export default function QuickLinkButtons() {
    const { event,addModule } = useEventService();
   // console.log(useRecoilValue(eventAtom));
    // console.log(event);
    const [showAll, setShowAll] = useState<boolean>(false);

    
    const addedTypes = event?.modules?.map(m => m.type);

     const availableModules = ALL_MODULES.filter(m => !addedTypes?.includes(m.type));



    if (availableModules.length === 0) return null;

    const visibleModules = showAll
        ? availableModules
        : availableModules.slice(0, VISIBLE_COUNT);

    

    return (
        <div className="max-w-2xl">
            <div className="flex gap-2">
                {visibleModules.map(({ type, label }) => (
                    <button
                        key={type}
                       onClick={() => addModule(type)}
                        className="flex items-center gap-1 border border-gray-200 px-3 py-1.5 rounded-full text-sm  bg-gray-200 hover:bg-gray-100"
                    >
                        <span className="text-lg leading-none">+</span>
                        {label}
                    </button>
                ))}

                {availableModules.length > VISIBLE_COUNT && (
                    <button
                        onClick={() => setShowAll(prev => !prev)}
                        className="text-sm text-gray-600 underline px-2"
                    >
                        {showAll ? 'Show less' : 'Show more'}
                    </button>
                )}
            </div>
        </div>

    );
}