export default function Triangle() {
    return (
        <>
            {/* Yellow Triangle - Back Layer */}
            <svg 
            className="absolute bottom-20 left-10 lg:left-24 lg:w-80 lg:h-80 w-40 h-40 transform rotate-45" 
            viewBox="0 0 320 320"
            >
            <defs>
                <pattern id="trianglePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="7" fill="#FFFFFF" opacity="0.9"/>
                </pattern>
            </defs>
            <polygon 
                points="160,20 20,300 300,300" 
                fill="url(#trianglePattern)" 
                stroke="none"
            />
            </svg>
            
            {/* Yellow Triangle - Front Layer */}
            <svg 
            className="absolute bottom-10 left-14 lg:left-20 lg:w-80 lg:h-80 w-40 h-40 transform rotate-45" 
            viewBox="0 0 320 320"
            >
            <polygon 
                points="160,20 20,300 300,300" 
                fill="transparent" 
                stroke="#FFD32E" 
                strokeWidth="8"
            />
            </svg>
        </>
    );
}