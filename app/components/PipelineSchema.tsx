export default function PipelineSchema() {
  return (
    <svg className="syn-schema" viewBox="0 0 480 244" role="img" aria-label="Reference block diagram of the sensor-to-actuation path with a deterministic safety wrapper">
      <defs>
        <pattern id="syn-schema-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="480" height="244" fill="#0d0d10" />
      <rect x="0" y="0" width="480" height="244" fill="url(#syn-schema-grid)" />

      <line x1="16" y1="140" x2="464" y2="140" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="16" y1="140" x2="464" y2="140" stroke="#ff2d2d" strokeWidth="1.5" strokeDasharray="2 6" />

      <polyline
        points="16,196 60,174 92,188 130,152 168,168 210,120 252,150 296,108 340,128 380,88 420,102 464,70"
        fill="none"
        stroke="#ff2d2d"
        strokeWidth="1.5"
        opacity="0.9"
      />

      <g fontFamily="'IBM Plex Mono', monospace" fontSize="10">
        <rect x="16" y="96" width="104" height="34" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
        <text x="28" y="116" fontSize="11" fill="#c9cacb" letterSpacing="0.08em">SENSOR INTAKE</text>
        <text x="28" y="126" fontSize="8" fill="#9d9ea2" letterSpacing="0.04em">RATE BOUNDED · STAMPED</text>

        <line x1="128" y1="113" x2="148" y2="113" stroke="rgba(255,255,255,0.4)" strokeWidth="1" markerEnd="url(#syn-schema-arrow)" />
        <defs>
          <marker id="syn-schema-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 z" fill="rgba(255,255,255,0.6)" />
          </marker>
        </defs>

        <rect x="160" y="96" width="104" height="34" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
        <text x="172" y="116" fontSize="11" fill="#c9cacb" letterSpacing="0.08em">POLICY INFERENCE</text>
        <text x="172" y="126" fontSize="8" fill="#9d9ea2" letterSpacing="0.04em">FIXED COMPUTE BUDGET</text>

        <line x1="272" y1="113" x2="292" y2="113" stroke="rgba(255,255,255,0.4)" strokeWidth="1" markerEnd="url(#syn-schema-arrow)" />

        <rect x="304" y="88" width="130" height="50" fill="rgba(255,45,45,0.06)" stroke="#ff2d2d" strokeWidth="1.5" />
        <text x="316" y="108" fontSize="11" fill="#fff" letterSpacing="0.08em">SAFETY WRAPPER</text>
        <text x="316" y="118" fontSize="8" fill="#ff7b7b" letterSpacing="0.04em">ENVELOPE · RATE LIMIT · WATCHDOG</text>
        <text x="316" y="128" fontSize="8" fill="#ff7b7b" letterSpacing="0.04em">NO LEARNING INSIDE THIS BOX</text>

        <text x="28" y="166" fontSize="11" fill="#c9cacb" letterSpacing="0.08em">ACTUATION &amp; LOG</text>
        <text x="28" y="176" fontSize="8" fill="#9d9ea2" letterSpacing="0.04em">FAIL-SAFE DEFINED · REPLAYABLE ON HIL</text>

        <text x="354" y="96" fontSize="23" fill="#fff" fontFamily="'Barlow Condensed', sans-serif" transform="rotate(-28 370 92)">
          BOUNDED
        </text>

        <line x1="320" y1="138" x2="320" y2="174" stroke="#ff2d2d" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="320" y1="174" x2="140" y2="174" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeDasharray="2 4" />

        <text x="16" y="222" fontSize="8" fill="#9d9ea2" letterSpacing="0.12em">LATENCY PROFILE · MEASURED ON THE TARGET, NOT ESTIMATED</text>
        <text x="16" y="234" fontSize="8" fill="#9d9ea2" letterSpacing="0.12em">THE ENVELOPE SPEC IS THE ARTEFACT A REVIEWER CAN SIGN</text>
      </g>
    </svg>
  );
}