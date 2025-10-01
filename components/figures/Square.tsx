export default function Square() {
    return (
        <>
            {/* Blue Square - Back Layer */}
            <svg 
            className="absolute top-28 left-[-50px] lg:left-16 lg:w-80 lg:h-80 w-40 h-40 transform rotate-45" 
            viewBox="0 0 320 320"
            >
            <defs>
                <pattern id="squarePattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="12" height="12" fill="#FFFFFF" opacity="0.8"/>
                <rect x="12" y="12" width="12" height="12" fill="#FFFFFF" opacity="0.8"/>
                </pattern>
            </defs>
            <rect x="0" y="0" width="320" height="320" fill="url(#squarePattern)"/>
            </svg>
            
            {/* Blue Square - Front Layer */}
            <div 
            className="absolute top-20 left-[-50px] lg:left-12 lg:w-80 lg:h-80 w-40 h-40 transform rotate-45" 
            style={{
                border: '8px solid #3B82F6',
                backgroundColor: 'transparent'
            }}
            ></div>
        </>
    );
}