import React from 'react';
import { PixelButton } from './components/PixelButton';

export default function App() {
  const upworkGreen = "#16A700";
  const textPrimary = "#3A453A";
  const cardBg = "#F1F7F4";

  const [theme, setTheme] = React.useState<'upwork' | 'tech'>('upwork');

  const sizes = [
    { label: "Hero (56px)", padding: "14px 48px", fontSize: "16px", height: "56px" },
    { label: "Large (48px)", padding: "10px 36px", fontSize: "16px", height: "48px" },
    { label: "Medium (36px)", padding: "6px 24px", fontSize: "14px", height: "36px" },
    { label: "Small (32px)", padding: "4px 20px", fontSize: "12px", height: "32px" },
    { label: "Extra Small (24px)", padding: "2px 16px", fontSize: "11px", height: "24px" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'upwork' ? 'bg-white' : 'bg-[#F8FAFC]'} font-sans text-[#3A453A]`}>
      {/* Theme Toggle */}
      <div className="fixed top-6 right-8 z-50">
        <button 
          onClick={() => setTheme(theme === 'upwork' ? 'tech' : 'upwork')}
          className={`px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
            theme === 'upwork' 
              ? 'bg-white border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-600' 
              : 'bg-white border-slate-200 text-slate-500 hover:border-blue-500 hover:text-blue-600'
          }`}
        >
          Switch to {theme === 'upwork' ? 'Modern Tech' : 'Upwork Style'}
        </button>
      </div>

      {/* Hero Section */}
      <section className={`py-24 px-8 flex flex-col items-center text-center space-y-8 transition-colors duration-700 ${theme === 'upwork' ? 'bg-[#F1F7F4]' : 'bg-[#F1F5F9]'}`}>
        <h1 className={`text-[56px] font-bold leading-tight tracking-tight max-w-4xl transition-colors duration-700 ${theme === 'upwork' ? 'text-[#3A453A]' : 'text-slate-900'}`}>
          {theme === 'upwork' ? (
            <>Hire the world's best <span className="text-[#16A700]">freelance talent</span> for your next project.</>
          ) : (
            <>Experience the next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">interactive UI</span>.</>
          )}
        </h1>
        <p className={`text-xl max-w-2xl transition-colors duration-700 ${theme === 'upwork' ? 'text-[#7A907A]' : 'text-slate-500'}`}>
          {theme === 'upwork' 
            ? "The Upwork Professional Style button system. High-impact, interactive, and built for conversion."
            : "A comparison of professional brand styles vs. modern tech gradients. Choose the vibe that fits your product."}
        </p>
        <div className="pt-4">
          {theme === 'upwork' ? (
            <PixelButton 
              text="Hire me on Upwork"
              pixelColors={["#ffffff", "#A7F1E1", "#33D399"]}
              beamColors={["#F1F131", "#16A700"]}
              backgroundColor={upworkGreen}
              textColor="#ffffff"
              enableTextOutline={false}
              padding="14px 56px"
              fontSize="16px"
              fontWeight={500}
            />
          ) : (
            <PixelButton 
              text="Get Started with Gemini"
              pixelColors={["#4285F4", "#9B72CB", "#D96570", "#ffffff"]}
              beamColors={["#4285F4", "#ffffff"]}
              backgroundColor="linear-gradient(135deg, #4285F4, #9B72CB, #D96570)"
              textColor="#ffffff"
              enableTextOutline={false}
              padding="14px 56px"
              fontSize="16px"
              fontWeight={500}
            />
          )}
        </div>
      </section>

      {/* Button Variants Grid */}
      <section className="max-w-7xl mx-auto py-20 px-8 space-y-20">
        
        {theme === 'upwork' ? (
          <>
            {/* White Background Variant */}
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold">White Background (Primary)</h2>
                <p className="text-[#7A907A]">Clean, professional look for light sections.</p>
              </div>
              <div className="flex flex-wrap items-end gap-8">
                {sizes.map((s) => (
                  <div key={`white-${s.label}`} className="flex flex-col items-center space-y-3">
                    <PixelButton 
                      text="Hire me on Upwork"
                      pixelColors={["#16A700", "#1ABC26", "#56D956"]}
                      beamColors={[upworkGreen, "#F1F7F4"]}
                      backgroundColor="#ffffff"
                      textColor={upworkGreen}
                      enableTextOutline={false}
                      padding={s.padding}
                      fontSize={s.fontSize}
                      fontWeight={500}
                    />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Green Background Variant */}
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold">Upwork Green Background</h2>
                <p className="text-[#7A907A]">High-contrast variant for maximum visibility.</p>
              </div>
              <div className="flex flex-wrap items-end gap-8">
                {sizes.map((s) => (
                  <div key={`green-${s.label}`} className="flex flex-col items-center space-y-3">
                    <PixelButton 
                      text="Hire me on Upwork"
                      pixelColors={["#ffffff", "#A7F1E1", "#33D399"]}
                      beamColors={["#F1F131", upworkGreen]}
                      backgroundColor={upworkGreen}
                      textColor="#ffffff"
                      enableTextOutline={false}
                      padding={s.padding}
                      fontSize={s.fontSize}
                      fontWeight={500}
                    />
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Gemini Style */}
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Gemini AI Gradient</h2>
                <p className="text-slate-500">Multi-color fluid gradient with dynamic particles.</p>
              </div>
              <div className="flex flex-wrap items-end gap-8">
                {sizes.map((s) => (
                  <div key={`gemini-${s.label}`} className="flex flex-col items-center space-y-3">
                    <PixelButton 
                      text="Generate with AI"
                      pixelColors={["#4285F4", "#9B72CB", "#D96570", "#ffffff"]}
                      beamColors={["#4285F4", "#ffffff"]}
                      backgroundColor="linear-gradient(135deg, #4285F4, #9B72CB, #D96570)"
                      textColor="#ffffff"
                      enableTextOutline={false}
                      padding={s.padding}
                      fontSize={s.fontSize}
                      fontWeight={500}
                    />
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Apple Style */}
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Apple Vibrant Blue</h2>
                <p className="text-slate-500">High-contrast solid blue with soft glow interaction.</p>
              </div>
              <div className="flex flex-wrap items-end gap-8">
                {sizes.map((s) => (
                  <div key={`apple-${s.label}`} className="flex flex-col items-center space-y-3">
                    <PixelButton 
                      text="Download App"
                      pixelColors={["#ffffff", "#8E8E93", "#007AFF"]}
                      beamColors={["#ffffff", "#007AFF"]}
                      backgroundColor="#007AFF"
                      textColor="#ffffff"
                      enableTextOutline={false}
                      padding={s.padding}
                      fontSize={s.fontSize}
                      fontWeight={500}
                    />
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge Style */}
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Microsoft Edge Fluent</h2>
                <p className="text-slate-500">Vibrant teal gradient inspired by Fluent Design.</p>
              </div>
              <div className="flex flex-wrap items-end gap-8">
                {sizes.map((s) => (
                  <div key={`edge-${s.label}`} className="flex flex-col items-center space-y-3">
                    <PixelButton 
                      text="Browse Web"
                      pixelColors={["#0078D4", "#00BCF2", "#ffffff"]}
                      beamColors={["#00BCF2", "#ffffff"]}
                      backgroundColor="linear-gradient(135deg, #0078D4, #00BCF2)"
                      textColor="#ffffff"
                      enableTextOutline={false}
                      padding={s.padding}
                      fontSize={s.fontSize}
                      fontWeight={500}
                    />
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge Highlight Variants */}
            <div className="space-y-12">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Edge Highlight Variants (75/25 Split)</h2>
                <p className="text-slate-500">Specific gradient distributions with smooth merged edge highlights.</p>
              </div>

              {/* Gemini Ultra Vibrant (75/25) */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-700">Gemini Ultra Vibrant (75/25)</h3>
                <div className="flex flex-wrap items-end gap-8">
                  {sizes.map((s) => (
                    <div key={`gemini-ultra-vibrant-${s.label}`} className="flex flex-col items-center space-y-3">
                      <PixelButton 
                        text="Ultra Vibrant"
                        pixelColors={["#FBBC05", "#D96570", "#4285F4", "#ffffff"]}
                        beamColors={["#FBBC05", "#D96570"]}
                        backgroundColor="linear-gradient(135deg, #FBBC05 0%, #D96570 10%, #9B72CB 25%, #4285F4 50%)"
                        textColor="#ffffff"
                        enableTextOutline={false}
                        padding={s.padding}
                        fontSize={s.fontSize}
                        fontWeight={500}
                      />
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apple Edge */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-700">Apple Blue with 25% Top-Left Highlight</h3>
                <div className="flex flex-wrap items-end gap-8">
                  {sizes.map((s) => (
                    <div key={`apple-edge-${s.label}`} className="flex flex-col items-center space-y-3">
                      <PixelButton 
                        text="Apple Edge"
                        pixelColors={["#5AC8FA", "#007AFF", "#ffffff"]}
                        beamColors={["#5AC8FA", "#007AFF"]}
                        backgroundColor="linear-gradient(135deg, #5AC8FA 0%, #007AFF 50%)"
                        textColor="#ffffff"
                        enableTextOutline={false}
                        padding={s.padding}
                        fontSize={s.fontSize}
                        fontWeight={500}
                      />
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemini Edge */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-700">Gemini with 75/25 Top-Right Highlight</h3>
                <div className="flex flex-wrap items-end gap-8">
                  {sizes.map((s) => (
                    <div key={`gemini-edge-${s.label}`} className="flex flex-col items-center space-y-3">
                      <PixelButton 
                        text="Gemini Edge"
                        pixelColors={["#4285F4", "#9B72CB", "#ffffff"]}
                        beamColors={["#9B72CB", "#4285F4"]}
                        backgroundColor="linear-gradient(225deg, #9B72CB 0%, #4285F4 50%)"
                        textColor="#ffffff"
                        enableTextOutline={false}
                        padding={s.padding}
                        fontSize={s.fontSize}
                        fontWeight={500}
                      />
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemini Ultra Edge */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-700">Gemini Ultra with 75/25 Top-Left Highlight</h3>
                <div className="flex flex-wrap items-end gap-8">
                  {sizes.map((s) => (
                    <div key={`gemini-ultra-edge-${s.label}`} className="flex flex-col items-center space-y-3">
                      <PixelButton 
                        text="Ultra Edge"
                        pixelColors={["#FBBC05", "#D96570", "#4285F4", "#ffffff"]}
                        beamColors={["#FBBC05", "#D96570"]}
                        backgroundColor="linear-gradient(135deg, rgba(251, 188, 5, 0.5) 0%, rgba(251, 188, 5, 0.5) 5%, rgba(217, 101, 112, 0.5) 25%, #4285F4 50%)"
                        textColor="#ffffff"
                        enableTextOutline={false}
                        padding={s.padding}
                        fontSize={s.fontSize}
                        fontWeight={500}
                      />
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gemini Ultra Dual Highlight */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-slate-700">Gemini Ultra Dual Highlight (Top-Left Vibrant / Bottom-Left 10% Green)</h3>
                <div className="flex flex-wrap items-end gap-8">
                  {sizes.map((s) => (
                    <div key={`gemini-dual-${s.label}`} className="flex flex-col items-center space-y-3">
                      <PixelButton 
                        text="Dual Highlight"
                        pixelColors={["#FBBC05", "#D96570", "#4285F4", "#16A700", "#ffffff"]}
                        beamColors={["#FBBC05", "#16A700"]}
                        backgroundColor="linear-gradient(135deg, #FBBC05 0%, #D96570 20%, transparent 50%), linear-gradient(225deg, transparent 90%, #16A700 100%), #4285F4"
                        textColor="#ffffff"
                        enableTextOutline={false}
                        padding={s.padding}
                        fontSize={s.fontSize}
                        fontWeight={500}
                      />
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-white/30' : 'text-slate-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Tertiary (No Border) Variant */}
        <div className="space-y-8">
          <div className={`border-b pb-4 ${theme === 'upwork' ? 'border-gray-100' : 'border-slate-200'}`}>
            <h2 className={`text-2xl font-bold ${theme === 'upwork' ? 'text-[#3A453A]' : 'text-slate-900'}`}>Tertiary (No Border)</h2>
            <p className={`${theme === 'upwork' ? 'text-[#7A907A]' : 'text-slate-500'}`}>Subtle interaction for secondary actions.</p>
          </div>
          <div className="flex flex-wrap items-end gap-8">
            {sizes.map((s) => (
              <div key={`tertiary-${s.label}`} className="flex flex-col items-center space-y-3">
                <PixelButton 
                  text="Learn more"
                  enableBeam={false}
                  enableInnerGlow={false}
                  enableHoverGlow={false}
                  enableParticles={false}
                  enableRipple={false}
                  enableUnderline={true}
                  enableHoverOpacity={true}
                  backgroundColor="transparent"
                  textColor={theme === 'upwork' ? upworkGreen : '#3B82F6'}
                  enableTextOutline={false}
                  padding="4px 0"
                  fontSize={s.fontSize}
                  fontWeight={500}
                />
                <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'upwork' ? 'text-gray-400' : 'text-slate-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer className={`py-12 border-t text-center text-sm font-mono ${theme === 'upwork' ? 'border-gray-100 text-[#7A907A]' : 'border-slate-200 text-slate-400'}`}>
        Upwork Professional Button System • Built with React & Canvas
      </footer>
    </div>
  );
}
