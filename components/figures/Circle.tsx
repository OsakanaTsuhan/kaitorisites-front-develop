export default function Circle() {
  return (
    <>
    {/* Green Circle - Back Layer */}
    <svg 
          className="absolute top-1/2 right-[-140px] lg:right-[-240px] transform -translate-x-1/2 lg:w-80 lg:h-80 w-40 h-40 " 
          viewBox="0 0 320 320"
        >
          <defs>
            <pattern id="circlePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="30" y2="30" stroke="#F8FAFC" strokeWidth="8" opacity="0.6"/>
              <line x1="0" y1="15" x2="30" y2="45" stroke="#F1F5F9" strokeWidth="6" opacity="0.4"/>
              <line x1="0" y1="30" x2="30" y2="60" stroke="#F8FAFC" strokeWidth="4" opacity="0.3"/>
            </pattern>
          </defs>
          <circle cx="160" cy="160" r="160" fill="url(#circlePattern)"/>
        </svg>
    {/* Green Circle - Front Layer */}
    <div 
        className="absolute top-1/2  right-[-150px] lg:right-[-250px] transform -translate-x-1/2 lg:w-80 lg:h-80 w-40 h-40 rounded-full rotate-45" 
        style={{
        border: '8px solid #10B981',
        backgroundColor: 'transparent'
        }}
    ></div>
    </>
  );
}