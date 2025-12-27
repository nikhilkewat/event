
import BasicEventForm from './BasicEventForm'
import type { Event, LinkItem } from '../types/event.types';
import QuickLinkButtons from './QuicklinkButtons';
import CapacityForm from './CapacityForm';
import CustomModule from './CustomModule';
import { useEventService } from '../services/event.services';


interface ModuleRendererProps {
  eventData: Event;
  photos: LinkItem[];
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
      {eventData?.modules?.map(module => {
        switch (module.type) {
          case 'capacity':
            return <CapacityForm key="capacity" />;

          case 'photoGallery':
            return <CustomModule
              key="photoGallery"
              module={module}
              buttonLabel="Add more Photo"
              eventData={eventData}
            />;

          case 'links':
            return <CustomModule
              key="links"
              module={module}
              buttonLabel="Add Link"
              eventData={eventData}
            />;

          case 'privacy':
            return null;
          default:
            return null;
        }
      })}
      <QuickLinkButtons />
    </div>
  );
}
