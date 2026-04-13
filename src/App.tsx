import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { toPng } from 'html-to-image';
import { Upload, Download, User, Award, Heart, RefreshCcw, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mongolian patterns as SVG paths or components
const MongolianPattern = ({ className }: { className?: string; key?: any }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M10,50 L30,50 L30,30 L50,30 L50,10 L70,10 L70,30 L90,30 L90,50 L70,50 L70,70 L90,70 L90,90 L70,90 L70,70 L50,70 L50,90 L30,90 L30,70 L10,70 L10,50 Z M40,50 L50,40 L60,50 L50,60 L40,50 Z" />
  </svg>
);

const UlziiPattern = ({ className }: { className?: string; key?: any }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M50,10 L90,50 L50,90 L10,50 Z M30,30 L70,30 L70,70 L30,70 Z M50,20 L80,50 L50,80 L20,50 Z" />
  </svg>
);

export default function App() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState('Н.БУМАННАНЗАД');
  const [title, setTitle] = useState('ТАРИАЛАН СУМЫН УУГУУЛ, БАРУУН БҮСИЙН ЭРЧИМ ХҮЧНИЙ СИСТЕМ ТӨХК-НЫ ШУУРХАЙ ҮЙЛЧИЛГЭЭНИЙ ЭЛЖИЙН ИНЖЕНЕР');
  const [amount, setAmount] = useState('1,000,000');
  const [isGenerating, setIsGenerating] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadFrame = useCallback(async () => {
    if (frameRef.current === null) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(frameRef.current, { cacheBust: true, quality: 1 });
      const link = document.createElement('a');
      link.download = `baruunturuun-80-anniversary-${name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
      setIsGenerating(false);
    }
  }, [name]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-[#006633] selection:text-white">
      <header className="bg-white border-b border-gray-200 py-6 px-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#006633] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Award size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Баруунтуруун 80 Жил</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Frame Generator</p>
            </div>
          </div>
          <button
            onClick={downloadFrame}
            disabled={isGenerating}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#006633] hover:bg-[#004d26] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-green-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? <RefreshCcw className="animate-spin" size={20} /> : <Download size={20} />}
            {isGenerating ? 'Боловсруулж байна...' : 'Татаж авах'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
              <Type className="text-[#006633]" size={18} />
              <h2 className="font-bold text-gray-800">Мэдээлэл оруулах</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Зураг оруулах</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-gray-200 group-hover:border-[#006633] rounded-xl p-8 transition-colors flex flex-col items-center gap-3 bg-gray-50/50">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#006633] transition-colors">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Зураг сонгох</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">80 жилийн лого</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-gray-200 group-hover:border-[#006633] rounded-xl p-4 transition-colors flex items-center gap-3 bg-gray-50/50">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#006633] transition-colors">
                      <Award size={16} />
                    </div>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Лого солих (заавал биш)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Овог нэр</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006633] focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium"
                    placeholder="Нэрээ оруулна уу"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Албан тушаал / Тодорхойлолт</label>
                  <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006633] focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium text-sm leading-relaxed"
                    placeholder="Тодорхойлолт оруулна уу"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Хандивын дүн (Төгрөг)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-4 pr-16 py-3 rounded-xl border border-gray-200 focus:border-[#006633] focus:ring-2 focus:ring-green-100 outline-none transition-all font-bold text-lg text-[#006633]"
                      placeholder="1,000,000"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">₮</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8 flex justify-center items-start">
          <div className="sticky top-32 w-full max-w-[600px]">
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Урьдчилсан харагдац</h3>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div 
                ref={frameRef}
                className="relative aspect-[4/5] w-full bg-white overflow-hidden flex flex-col items-center"
                style={{ 
                  backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f0f4f2 100%)'
                }}
              >
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 gap-4 p-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <MongolianPattern key={i} className="w-full h-auto" />
                    ))}
                  </div>
                </div>

                {/* Top Logo & Anniversary */}
                <div className="absolute top-8 left-8 z-20 flex flex-col items-start gap-2">
                  {logo ? (
                    <img src={logo} alt="80 Logo" className="h-20 w-auto object-contain" />
                  ) : (
                    <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center border-2 border-[#006633]/20">
                      <Award className="text-[#006633]" size={40} />
                    </div>
                  )}
                </div>

                {/* Main Frame Circle */}
                <div className="relative mt-16 z-10">
                  <div className="w-[320px] h-[320px] rounded-full border-[12px] border-white shadow-2xl relative overflow-hidden bg-gray-100">
                    {photo ? (
                      <img src={photo} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                        <User size={80} />
                        <p className="text-xs font-bold uppercase tracking-widest">Зураггүй</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Circular Pattern Border */}
                  <div className="absolute -inset-8 border-[2px] border-[#006633]/10 rounded-full pointer-events-none"></div>
                  <div className="absolute -inset-12 border-[1px] border-[#006633]/5 rounded-full pointer-events-none"></div>
                  
                  {/* Ulzii Patterns around circle */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <div 
                      key={deg}
                      className="absolute w-8 h-8 text-[#006633]/20"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-185px)`
                      }}
                    >
                      <UlziiPattern className="w-full h-full" />
                    </div>
                  ))}
                </div>

                {/* Content Area */}
                <div className="mt-8 px-12 text-center z-20 w-full space-y-4">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-[#006633] uppercase tracking-[0.2em] leading-tight max-w-[400px] mx-auto opacity-80">
                      {title}
                    </p>
                    <h2 className="text-2xl font-black text-[#1a3a2a] tracking-tight uppercase">
                      {name}
                    </h2>
                  </div>

                  {/* Amount Badge */}
                  <div className="relative inline-block mt-2">
                    <div className="bg-[#e63946] text-white px-10 py-3 rounded-xl shadow-lg shadow-red-900/20 relative z-10">
                      <p className="text-3xl font-black tracking-tighter flex items-center justify-center gap-2">
                        {amount} <span className="text-xl opacity-80">ТӨГРӨГ</span>
                      </p>
                    </div>
                    <div className="absolute -inset-1 bg-white/50 blur-sm rounded-xl"></div>
                  </div>

                  {/* Footer Text */}
                  <div className="pt-4 space-y-1">
                    <h3 className="text-4xl font-black text-[#1a3a2a] tracking-widest uppercase italic transform scale-y-110">
                      ХАНДИВЛАЛАА
                    </h3>
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#006633]/20"></div>
                      <Heart className="text-[#e63946] fill-[#e63946]" size={20} />
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#006633]/20"></div>
                    </div>
                    <p className="text-3xl font-bold text-[#006633] tracking-[0.3em] uppercase opacity-90">
                      БАЯРЛАЛАА
                    </p>
                  </div>
                </div>

                {/* Bottom Decorative Wave */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#006633]/10 to-transparent flex items-end justify-center pb-2">
                  <div className="flex gap-4 opacity-20">
                    <UlziiPattern className="w-6 h-6" />
                    <UlziiPattern className="w-6 h-6" />
                    <UlziiPattern className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-center text-xs text-gray-400 font-medium leading-relaxed">
              * Зураг татаж авахад өндөр чанартайгаар хадгалагдах болно.<br/>
              Баруунтуруун сум дундын эмнэлэгийн 80 жилийн ойд зориулав.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-8 opacity-20">
            <MongolianPattern className="w-12 h-12" />
            <UlziiPattern className="w-12 h-12" />
            <MongolianPattern className="w-12 h-12" />
          </div>
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">
            © 2026 Баруунтуруун Эрүүл Мэндийн Төв
          </p>
        </div>
      </footer>
    </div>
  );
}
