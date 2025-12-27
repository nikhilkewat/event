import { X } from 'lucide-react';

interface BackgroundPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (style: { type: 'gradient' | 'image' | 'color'; value: string }) => void;
  currentStyle: { type: 'gradient' | 'image' | 'color'; value: string };
}

export default function BackgroundPicker({ isOpen, onClose, onSelect, currentStyle }: BackgroundPickerProps) {
  if (!isOpen) return null;

  const gradients = [
    { name: 'default', value: 'from-[#1B2A29] via-[#AC6887]  to-[#1C2929]' },
    { name: 'Pink Purple Blue', value: 'from-pink-400 via-purple-400 to-blue-400' },
    { name: 'Sunset', value: 'from-orange-400 via-red-400 to-pink-500' },
    { name: 'Ocean', value: 'from-cyan-400 via-blue-500 to-indigo-600' },
    { name: 'Forest', value: 'from-green-400 via-emerald-500 to-teal-600' },
    { name: 'Golden Hour', value: 'from-yellow-400 via-orange-400 to-red-500' },
    { name: 'Lavender', value: 'from-purple-300 via-pink-300 to-rose-400' },
    { name: 'Mint', value: 'from-emerald-300 via-teal-400 to-cyan-500' },
    { name: 'Peach', value: 'from-orange-300 via-pink-300 to-rose-400' },

  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Choose Background</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gradients.map((gradient) => (
            <button
              key={gradient.value}
              onClick={() => {
                onSelect({ type: 'gradient', value: gradient.value });
                onClose();
              }}
              className={`w-32 h-32 aspect-square rounded-xl bg-gradient-to-br ${gradient.value} hover:scale-105 transition-all shadow-lg hover:shadow-xl ${currentStyle.type === 'gradient' && currentStyle.value === gradient.value
                  ? 'ring-4 ring-white'
                  : ''
                }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm bg-black/20 px-3 py-1 rounded-full">
                  {gradient.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
