import Circle from "./Circle";
import Square from "./Square";
import Triangle from "./Triangle";

export default function BackGroundPattern() {
    return (
        <div className="absolute inset-0 opacity-30">
            {/* Yellow Triangle*/}
            <Triangle />
            {/* Blue Square*/}
            <Square />
            {/* Green Circle*/}
            <Circle />
      </div>
    );
}