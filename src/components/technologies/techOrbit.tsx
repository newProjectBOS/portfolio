import { WHEEL } from "./techStack";

const CENTER = WHEEL.viewBox / 2;

export default ({ className }: { className?: string }) => (
  <svg
    viewBox={`0 0 ${WHEEL.viewBox} ${WHEEL.viewBox}`}
    aria-hidden="true"
    className={className}
  >
    <circle
      cx={CENTER}
      cy={CENTER}
      r={WHEEL.radius}
      fill="none"
      className="stroke-gray-200"
      strokeDasharray="4 8"
    />
  </svg>
);
