interface MacbookMockupProps {
  imageSrc: string;
}

const MacbookMockup = ({ imageSrc }: MacbookMockupProps) => {
  return (
    <div className="relative device-mockup">
      {/* MacBook Pro Frame */}
      <div className="relative mx-auto" style={{ maxWidth: "100%" }}>
        {/* Screen bezel */}
        <div className="relative rounded-t-xl bg-gray-900 px-3 pt-3">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-xl" />
          
          {/* Screen */}
          <div className="relative rounded-t-lg overflow-hidden bg-gray-800">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={imageSrc} 
                alt="Project screenshot" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* MacBook base */}
        <div className="relative bg-gray-800 h-4 rounded-b-xl">
          {/* MacBook notch/opening */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
};

export default MacbookMockup;