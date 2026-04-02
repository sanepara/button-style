import { PixelButton } from './components/PixelButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 space-y-12 font-sans">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          The Interactive <span className="text-indigo-600">Pixel Button</span>
        </h1>
        <p className="text-lg text-gray-600">
          A high-performance Canvas particle engine for modern web interfaces.
          Hover to reveal, click to ripple.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center w-full max-w-4xl">
        {/* Upwork Style Button */}
        <div className="flex flex-col items-center space-y-4 col-span-full">
          <PixelButton 
            text="Hire me on Upwork"
            pixelColors={["#14a800", "#3cba24", "#60d950"]}
            beamColors={["#14a800", "#60d950"]}
            backgroundColor="#ffffff"
            textColor="#14a800"
            enableTextOutline={false}
            pixelSize={5}
            pixelGap={5}
            enableInnerGlow={true}
            padding="20px 56px"
            fontSize="20px"
            fontWeight={600}
          />
          <span className="text-xs font-mono text-green-600 uppercase tracking-widest font-bold">Upwork Professional Style</span>
        </div>

        {/* Primary CTA - Indigo Theme */}
        <div className="flex flex-col items-center space-y-4">
          <PixelButton 
            text="Get unlimited access"
            pixelColors={["#4F46E5", "#818CF8", "#C7D2FE"]}
            beamColors={["#4F46E5", "#818CF8"]}
            backgroundColor="#ffffff"
            textColor="#111827"
            outlineColor="#ffffff"
          />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Primary CTA</span>
        </div>

        {/* Success Theme - Green */}
        <div className="flex flex-col items-center space-y-4">
          <PixelButton 
            text="Launch Project"
            pixelColors={["#10B981", "#34D399", "#A7F3D0"]}
            beamColors={["#10B981", "#6EE7B7"]}
            backgroundColor="#ffffff"
            textColor="#064E3B"
            outlineColor="#ffffff"
            pixelGap={4}
            pixelSize={3}
          />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Success State</span>
        </div>

        {/* Always-On Ambient Mode */}
        <div className="flex flex-col items-center space-y-4">
          <PixelButton 
            text="Explore Features"
            pixelAnimation="always"
            pixelColors={["#F59E0B", "#FBBF24", "#FEF3C7"]}
            beamColors={["#F59E0B", "#FCD34D"]}
            backgroundColor="#ffffff"
            textColor="#78350F"
            outlineColor="#ffffff"
            borderRadius="12px"
            padding="12px 32px"
          />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Ambient Mode</span>
        </div>

        {/* Dark Mode Variant */}
        <div className="flex flex-col items-center space-y-4 p-8 bg-gray-900 rounded-3xl w-full">
          <PixelButton 
            text="Join the waitlist"
            pixelColors={["#EC4899", "#F472B6", "#FBCFE8"]}
            beamColors={["#EC4899", "#F9A8D4"]}
            backgroundColor="#111827"
            textColor="#ffffff"
            outlineColor="#111827"
            outlineWidth={2}
          />
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Dark Variant</span>
        </div>
      </div>

      <footer className="mt-20 text-sm text-gray-400 font-mono">
        Built with React + Framer Motion + HTML5 Canvas
      </footer>
    </div>
  );
}
