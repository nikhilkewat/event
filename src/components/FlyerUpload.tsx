import { Image, X } from 'lucide-react';
import { useState } from 'react';

interface FlyerUploadProps {
  photos: string[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
}

export default function FlyerUpload({ photos, onAdd, onRemove }: FlyerUploadProps) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  const handleAddPhoto = () => {
    if (!photoUrl.trim()) {
      setError('Please enter a photo URL');
      return;
    }

    try {
      new URL(photoUrl);
      onAdd(photoUrl);
      setPhotoUrl('');
      setError('');
    } catch {
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Photo Gallery</h3>

      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Image className="w-5 h-5 text-white/60" />
          </div>
          <input
            type="url"
            placeholder="Enter photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
          />
        </div>

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button
          onClick={handleAddPhoto}
          className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all"
        >
          Add Photo
        </button>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Gallery ${index}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button
                onClick={() => onRemove(index)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
