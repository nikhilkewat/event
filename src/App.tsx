import { useState } from 'react';
import InvitationCard from './components/InvitationCard';
import EventForm from './components/EventForm';

import { useEventService } from './services/event.services';



function App() {
  //const { event} = useEventService()

  const [event,setEvent] = useState<Event>({

    name: '',
    phone_number: '',
    date_time: '',
    location: '',
    cost_per_person: 0,
    description: '',    
    capacity: null,    
    photo_gallery: [],    
    links: [],    
    modules: [],    
    background_style: {
        type: 'gradient',
        value: 'from-[#1B2A29] via-[#AC6887]  to-[#1C2929]',
    }
  });

  const [backgroundImage, setBackgroundImage] = useState('');

  const [showBackgroundPicker, setShowBackgroundPicker] = useState({ show: false, type: 'inviationCard' as 'inviationCard' | 'background' });
  const [showCustomize, setShowCustomize] = useState(false);

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

 

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
                onChangeBackground={() => {}}
                onChangeBackgroundImage={() => {}}
              />
            </div>

            <div className="">
              <EventForm
                eventData={event}
                photos={event.photo_gallery || []}
                backgroundImage={backgroundImage}
               
              />
            </div>
          </div>
        </div>
      </div>


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
