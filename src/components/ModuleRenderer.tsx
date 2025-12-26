
import BasicEventForm from './BasicEventForm'
import type { Event } from '../types/event.types';


interface ModuleRendererProps {
  eventData: Event;
  photos: string[];
  backgroundImage: string;
  onChange: (field: string, value: string) => void;
  onSaveDraft: () => void;
  onAddPhoto?: (url: string) => void;
  onRemovePhoto?: (index: number) => void;
  onUploadBackground: (url: string) => void;
}

export default function ModuleRenderer({
  eventData,
  onChange,
  onSaveDraft,
}: ModuleRendererProps) {

  return (
    <div className="space-y-4">
      <BasicEventForm
        eventData={eventData}
        onChange={onChange}
        onSaveDraft={onSaveDraft}
      />
     

    </div>
  );
}
