import { Upload } from 'lucide-react';

interface BackgroundUploadProps {
  backgroundImage: string;
  onUpload: (url: string) => void;
}

export default function BackgroundUpload({ backgroundImage, onUpload }: BackgroundUploadProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        onUpload(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Background Image</h3>

      <label className="block cursor-pointer">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Upload className="w-5 h-5 text-white/60" />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl px-12 py-4 text-white/60 hover:text-white transition-all flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <span>Click to upload background image</span>
          </div>
        </div>
      </label>

      {backgroundImage && (
        <div className="relative w-full rounded-xl overflow-hidden border border-white/20">
          <img
            src={backgroundImage}
            alt="Background preview"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}
    </div>
  );
}
