import { PixelButton } from './components/PixelButton';

export default function App() {
  const upworkGreen = "#16A700";
  const textPrimary = "#3A453A";
  const cardBg = "#F1F7F4";

  const sizes = [
    { label: "Hero (56px)", padding: "14px 48px", fontSize: "16px", height: "56px" },
    { label: "Large (48px)", padding: "10px 36px", fontSize: "16px", height: "48px" },
    { label: "Medium (36px)", padding: "6px 24px", fontSize: "14px", height: "36px" },
    { label: "Small (32px)", padding: "4px 20px", fontSize: "12px", height: "32px" },
    { label: "Extra Small (24px)", padding: "2px 16px", fontSize: "11px", height: "24px" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#3A453A]">
      {/* Hero Section */}
      <section className="py-24 px-8 flex flex-col items-center text-center space-y-8 bg-[#F1F7F4]">
        <h1 className="text-[56px] font-bold leading-tight tracking-tight max-w-4xl">
          Hire the world's best <span className="text-[#16A700]">freelance talent</span> for your next project.
        </h1>
        <p className="text-xl text-[#7A907A] max-w-2xl">
          The Upwork Professional Style button system. High-impact, interactive, and built for conversion.
        </p>
        <div className="pt-4">
          <PixelButton 
            text="Hire me on Upwork"
            pixelColors={["#ffffff", "#A7F1E1", "#33D399"]}
            beamColors={["#ffffff", "#16A700"]}
            backgroundColor={upworkGreen}
            textColor="#ffffff"
            enableTextOutline={false}
            padding="14px 56px"
            fontSize="16px"
            fontWeight={500}
          />
        </div>
      </section>

      {/* Button Variants Grid */}
      <section className="max-w-7xl mx-auto py-20 px-8 space-y-20">
        
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
                  beamColors={["#ffffff", upworkGreen]}
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

        {/* Tertiary (No Border) Variant */}
        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-2xl font-bold">Tertiary (No Border)</h2>
            <p className="text-[#7A907A]">Subtle interaction for secondary actions.</p>
          </div>
          <div className="flex flex-wrap items-end gap-8">
            {sizes.map((s) => (
              <div key={`tertiary-${s.label}`} className="flex flex-col items-center space-y-3">
                <PixelButton 
                  text="Hire me on Upwork"
                  enableBeam={false}
                  enableInnerGlow={false}
                  enableHoverGlow={false}
                  enableParticles={false}
                  enableRipple={false}
                  enableUnderline={true}
                  enableHoverOpacity={true}
                  backgroundColor="transparent"
                  textColor={upworkGreen}
                  enableTextOutline={false}
                  padding="4px 0"
                  fontSize={s.fontSize}
                  fontWeight={500}
                />
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-sm text-[#7A907A] font-mono">
        Upwork Professional Button System • Built with React & Canvas
      </footer>
    </div>
  );
}
