import { Link, Plus, Wallpaper, X } from "lucide-react";
import type { Event, EventModule } from "../types/event.types";
import { useEventService } from "../services/event.services";
import { useState } from "react";



type CustomModuleProps = {
    module: EventModule;
    buttonLabel: string;
    eventData?: Event;
}
const CustomModule = ({ module, buttonLabel, eventData }: CustomModuleProps) => {
    const { addNewRow, removeRow } = useEventService();
    const addNewRowForLinks = (type: EventModule['type']) => {
        switch (type) {
            case 'links':
                addNewRow('links');
                break;
            case 'photoGallery':
                addNewRow('photo_gallery');
                break;
            default:
                return;
        }
    }

    return <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl p-2 space-y-2 border border-white/10 shadow-xl">
        {
            module.type === 'links' && eventData?.links?.map((link) => {
                return (<div className="flex items-center gap-3 " key={Math.random()}>
                    <Link size={20} className="text-white/70 font-extrabold" />
                    <LinkInputRow
                        key={link.id}
                        id={link.id}
                        initial={link.value}
                        field="links"
                        placeholder="Add link"
                    />
                    {eventData?.links?.length && eventData.links.length > 1 && <button onClick={() => removeRow('links', link.id)}>
                        <X className="w-4 h-4 text-white" />
                    </button>}
                </div>)
            })
        }

        {
            module.type === 'photoGallery' && eventData?.photo_gallery?.map((link) => {
                return (<div className="flex items-center gap-3 ">
                    <Wallpaper size={20} className="text-white/70 font-extrabold" />
                    <LinkInputRow
                        key={link.id}
                        id={link.id}
                        initial={link.value}
                        field="photo_gallery"
                        placeholder="Add photo link"
                    />
                    {eventData?.photo_gallery?.length && eventData?.photo_gallery.length > 1 && <button onClick={() => removeRow('photo_gallery', link.id)}>
                        <X className="w-4 h-4 text-white" />
                    </button>}
                </div>)
            })
        }

        <div className="flex justify-center items-center gap-3 py-3 border-t border-white/40">
            <button
                onClick={() => addNewRowForLinks(module.type)}
                className="flex gap-2 items-center justify-center bg-transparent text-white placeholder-white/60 focus:outline-none "
            >
                <Plus className="w-6 h-6 text-white" />
                {buttonLabel}
            </button>
        </div>
    </div>;
}

export default CustomModule;



function LinkInputRow({ field, id, initial, placeholder }: { field: string; id: string; initial: string, placeholder: string }) {
    const { updateRowValue } = useEventService();
    const [draft, setDraft] = useState(initial);

    return (
        <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={() => updateRowValue(field, id, draft.trim())}
            onKeyDown={e =>
                e.key === "Enter" && updateRowValue(field, id, draft.trim())
            }
            className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
            placeholder={placeholder}
        />

    );
}