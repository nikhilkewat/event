import { Users } from "lucide-react";
import { useEventService } from "../services/event.services";

const CapacityForm = () => {
    const { event, updateEventField } = useEventService();
    const onChange = (field: string, value: string) => {
        updateEventField(field, value);
    }
    return (
        <div className="relative">
            <input
                type="number"
                min={1}
                max={10000}
                placeholder="Capacity"
                value={event?.capacity ?? ''}
                onChange={(e) => onChange('capacity', e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-2xl bg-gray-800/30 backdrop-blur-md text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
            <Users size={20} className="text-green-400 font-extrabold absolute left-5 top-1/2 -translate-y-1/2" />
        </div>
    )
}

export default CapacityForm;