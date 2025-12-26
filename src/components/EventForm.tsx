import { Palette } from 'lucide-react';
import ModuleRenderer from './ModuleRenderer';
import type { Event } from '../types/event.types';

interface EventFormProps {
    eventData: Event;
    photos: string[];
    backgroundImage: string;
    onChange?: (field: string, value: string) => void;
    onSaveDraft?: () => void;
    onPublish?: () => void;
    onShowCustomize?: () => void;
    onAddPhoto?: (url: string) => void;
    onRemovePhoto?: (index: number) => void;
    onUploadBackground?: (url: string) => void;
}

export default function EventForm({
    eventData,
    photos,
    backgroundImage,
    onChange,
    onSaveDraft,
    onPublish,
    onShowCustomize,
    onAddPhoto,
    onRemovePhoto,
    onUploadBackground
}: EventFormProps) {
    return (
        <div className="space-y-6">
            <ModuleRenderer
                eventData={eventData}
                photos={photos}
                backgroundImage={backgroundImage}
                onChange={onChange!!}
                onSaveDraft={onSaveDraft!!}
                onUploadBackground={onUploadBackground!!}
            />

            <div className="bg-gray-800/30 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-white/40 text-2xl">🎤</div>
                    <div className="text-white/40 text-2xl">📸</div>
                    <div className="text-white/40 text-2xl">🎨</div>
                    <div className="text-white/40 text-2xl">🔗</div>
                    <div className="text-white/40 text-2xl">💰</div>
                </div>
                <p className="text-center text-white/80 text-lg font-medium mb-6">
                    Customize your<br />event your way
                </p>
                <button
                    onClick={onShowCustomize}
                    className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2"
                >
                    <Palette className="w-5 h-5" />
                    Customize
                </button>
            </div>

            <button
                onClick={onPublish}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-xl text-white font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                <span className="text-2xl">🎉</span>
                Go live
            </button>
        </div>
    );
}
