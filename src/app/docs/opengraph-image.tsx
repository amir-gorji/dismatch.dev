import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'dismatch documentation — type-safe discriminated unions for TypeScript';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TEAL = '#1ca6a4';
const TEAL_DEEP = '#147876';
const FG = '#1d2330';
const MUTED = '#5b6577';
const BG = '#fafbfc';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          color: FG,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 540,
            height: 540,
            background: `radial-gradient(circle at top left, ${TEAL}33, transparent 60%)`,
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <BrandTile />
          <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
            dismatch
          </span>
          <span
            style={{
              fontSize: 26,
              color: MUTED,
              fontWeight: 400,
              marginLeft: 4,
            }}
          >
            / docs
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 980,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <span>Discriminated unions,&nbsp;</span>
            <span style={{ color: TEAL_DEEP }}>without the boilerplate.</span>
          </div>

          <div
            style={{
              fontSize: 26,
              color: MUTED,
              fontFamily: 'monospace',
              display: 'flex',
              gap: 16,
            }}
          >
            <span>createUnion</span>
            <span>·</span>
            <span>match</span>
            <span>·</span>
            <span>is</span>
            <span>·</span>
            <span>fold</span>
            <span>·</span>
            <span>InferUnion</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 80,
            fontSize: 22,
            color: MUTED,
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ color: TEAL_DEEP, fontWeight: 600 }}>~2 kB</span>
          <span>·</span>
          <span>zero deps</span>
          <span>·</span>
          <span>dismatch.dev</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, ${TEAL_DEEP}, ${TEAL}, ${TEAL_DEEP})`,
          }}
        />
      </div>
    ),
    { ...size },
  );
}

function BrandTile() {
  return (
    <svg width='80' height='80' viewBox='0 0 64 64'>
      <defs>
        <clipPath id='og-docs-frame'>
          <rect x='0' y='0' width='64' height='64' rx='14' ry='14' />
        </clipPath>
      </defs>
      <g clipPath='url(#og-docs-frame)'>
        <rect x='0' y='0' width='64' height='64' fill={FG} fillOpacity='0.06' />
        <polygon points='0,0 64,0 64,28 28,64 0,64' fill={TEAL} />
        <polygon points='34,64 64,34 64,64' fill={FG} fillOpacity='0.92' />
        <circle cx='42' cy='22' r='3.4' fill={BG} stroke={TEAL_DEEP} strokeWidth='1.4' />
      </g>
      <rect
        x='0.5'
        y='0.5'
        width='63'
        height='63'
        rx='14'
        ry='14'
        fill='none'
        stroke={FG}
        strokeOpacity='0.18'
      />
    </svg>
  );
}
