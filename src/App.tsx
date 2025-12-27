import { useState } from 'react';
import InvitationCard from './components/InvitationCard';
import EventForm from './components/EventForm';

import { useEventService } from './services/event.services';
import type { Event } from './types/event.types';
import BackgroundPicker from './components/BackgroundPicker';



function App() {
  const { event, updateBackground, updateEventField,createEvent } = useEventService()

  // const [event, setEvent] = useState<Event>({
  //   name: '',
  //   phone_number: '',
  //   date_time: '',
  //   location: '',
  //   cost_per_person: 0,
  //   description: '',
  //   capacity: null,
  //   photo_gallery: [],
  //   links: [],
  //   modules: [],
  //   background_style: {
  //     type: 'gradient',
  //     value: 'from-[#1B2A29] via-[#AC6887]  to-[#1C2929]',
  //   }
  // });

  const [backgroundImage, setBackgroundImage] = useState('');

  const [showBackgroundPicker, setShowBackgroundPicker] = useState({ show: false, type: 'inviationCard' as 'inviationCard' | 'background' });


  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    updateEventField(field, value);
  };

  const handleUploadBackground = (url: string) => {
    setBackgroundImage(url);
  };
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Math.random().toString(36).substring(2, 8);
  };
  const handleSaveDraft = async () => {
    if (!event.phone_number) {
      showNotification('Please enter a phone number to save the draft', 'error');
      return;
    }


    try {
      const eventPayload: Event = {
        ...event,
        is_published: false,
        slug: generateSlug(event.name || 'event'),
      };

      await createEvent(eventPayload);
    } catch (error) {
      console.error('Error saving draft:', error);
      showNotification('Failed to save draft. Please try again.', 'error');
    }
  };

  const handlePublish = async () => {
    if (!event.phone_number) {
      showNotification('Please enter a phone number before publishing', 'error');
      return;
    }

    if (!event.name) {
      showNotification('Please enter an event name before publishing', 'error');
      return;
    }

    try {
      const eventPayload = {
        ...event,
        is_published: true,
        slug: generateSlug(event.name),
      };

      createEvent(eventPayload as Event);
      alert(JSON.stringify(event));
      showNotification('Event published successfully!', 'success');
    } catch (error) {
      console.error('Error publishing event:', error);
      showNotification('Failed to publish event. Please try again.', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };  
  return (
    <div className={`min-h-screen bg-linear-to-br ${event?.background_style?.value} relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-linear-to-br ${event?.background_style?.value} backdrop-blur-3xl`}></div>

      <div className="relative z-10">
        <div className=" bg-transparent shadow-lg flex justify-start items-center py-4 px-6 mb-8">
          <h1 className="text-white text-3xl font-light px-24 tracking-widest">let's hang</h1>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <div className="">
              <InvitationCard
                backgroundStyle={event?.flyer_style!!}
                type={'inviationCard'}
                onChangeBackground={() => setShowBackgroundPicker({ show: true, type: 'inviationCard' })}
                onChangeBackgroundImage={() => setShowBackgroundPicker({ show: true, type: 'background' })}
              />
            </div>

            <div className="">
              <EventForm
                eventData={event}
                photos={event.photo_gallery || []}
                backgroundImage={backgroundImage}
                onChange={handleChange}
                onUploadBackground={handleUploadBackground}
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}

              />
            </div>
          </div>
        </div>
      </div>

      <BackgroundPicker
        isOpen={showBackgroundPicker.show}
        onClose={() => setShowBackgroundPicker({ show: false, type: 'background' })}
        onSelect={(onselectedStyle) => {
          console.log("Selected Style:", onselectedStyle, showBackgroundPicker);
          if (showBackgroundPicker.type === 'background') {
            updateBackground('flyer_style', onselectedStyle);
            // setBackgroundStyleFlyer(onselectedStyle);
          } else {
            updateBackground('background_style', onselectedStyle);
          }
        }}
        currentStyle={event?.background_style ?? event?.background_style!!}
      />

      {notification && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-xl backdrop-blur-md border ${notification.type === 'success'
              ? 'bg-green-500/90 border-green-400 text-white'
              : 'bg-red-500/90 border-red-400 text-white'
              }`}
          >
            {notification.message}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
