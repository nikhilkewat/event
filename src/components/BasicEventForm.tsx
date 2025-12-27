import { ArrowRight, Calendar, DollarSign, Lock, MapPin, Phone, PhoneIcon, Smartphone } from 'lucide-react';
import type { Event } from '../types/event.types';

interface BasicEventFormProps {
  eventData: Event;
  onChange: (field: string, value: string) => void;
  onSaveDraft: () => void;
}

export default function BasicEventForm({ eventData, onChange, onSaveDraft }: BasicEventFormProps) {
  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Name your event"
        value={eventData.name}
        onChange={(e) => onChange('name', e.target.value)}
        className="w-full text-4xl font-bold bg-transparent border-b-2 border-white/40 focus:border-white text-white placeholder-white/40 focus:outline-none transition-all pb-2"
      />


      <div className="relative">


        <input
          type="tel"
          placeholder="Enter phone number to save the draft"
          value={eventData.phone_number}
          onChange={(e) => onChange('phone_number', e.target.value)}
          className="w-full px-6 py-4 pl-12 rounded-2xl bg-gray-800/30 backdrop-blur-md text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
        <Smartphone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60" />
        <button
          onClick={onSaveDraft}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-lg p-2 transition-all"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-md rounded-3xl p-6 space-y-2 border border-white/10 shadow-xl">
        <div className="flex items-center gap-3 pb-3">
          <Calendar size={20} className="text-white/70 font-extrabold" />
          <input
            type="datetime-local"
            value={eventData?.date_time?.toString()}
            onChange={(e) => onChange('date_time', e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 py-3 border-t border-white/40">
          <MapPin size={20} className="text-red-400 font-extrabold" />
          <input
            type="text"
            placeholder="Location"
            value={eventData.location}
            onChange={(e) => onChange('location', e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-white/40">
          <DollarSign size={20} className="text-green-400 font-extrabold" />
          <input
            type="number"
            placeholder="Cost per person"
            value={eventData.cost_per_person}
            onChange={(e) => onChange('cost_per_person', e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none"
          />
        </div>
      </div>

      <textarea
        placeholder="Describe your event"
        rows={4}
        onChange={(e) => onChange('description', e.target.value)}
        className="w-full px-6 py-4 rounded-3xl bg-gray-800/30 backdrop-blur-md text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none transition-all"
      />
     
    </div>
  );
}
