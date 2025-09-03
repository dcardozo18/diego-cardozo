interface IphoneMockupProps {
  imageSrc: string;
}

const IphoneMockup = ({ imageSrc }: IphoneMockupProps) => {
  return (
    <div className="relative device-mockup max-w-[200px] mx-auto">
      {/* iPhone Frame */}
      <div className="relative">
        {/* Phone body */}
        <div className="relative bg-gray-900 rounded-[2.5rem] p-2">
          {/* Screen bezel */}
          <div className="relative bg-black rounded-[2.2rem] p-3">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10" />
            
            {/* Screen */}
            <div className="relative rounded-[2rem] overflow-hidden">
              <div className="relative aspect-[9/19.5]">
                <img 
                  src={imageSrc} 
                  alt="Mobile app screenshot" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute right-[-2px] top-24 w-1 h-8 bg-gray-800 rounded-r-sm" />
        <div className="absolute right-[-2px] top-36 w-1 h-12 bg-gray-800 rounded-r-sm" />
        <div className="absolute right-[-2px] top-52 w-1 h-12 bg-gray-800 rounded-r-sm" />
        <div className="absolute left-[-2px] top-32 w-1 h-16 bg-gray-800 rounded-l-sm" />
      </div>
    </div>
  );
};

export default IphoneMockup;