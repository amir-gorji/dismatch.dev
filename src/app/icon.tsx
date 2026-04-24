import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

const TEAL = '#1ca6a4';
const TEAL_DEEP = '#147876';
const FG = '#1d2330';
const BG = '#fafbfc';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'transparent',
        }}
      >
        <svg width='64' height='64' viewBox='0 0 64 64'>
          <defs>
            <clipPath id='ic-frame'>
              <rect x='0' y='0' width='64' height='64' rx='14' ry='14' />
            </clipPath>
          </defs>
          <g clipPath='url(#ic-frame)'>
            <rect
              x='0'
              y='0'
              width='64'
              height='64'
              fill={BG}
            />
            <polygon points='0,0 64,0 64,28 28,64 0,64' fill={TEAL} />
            <polygon
              points='34,64 64,34 64,64'
              fill={FG}
              fillOpacity='0.92'
            />
            <circle
              cx='42'
              cy='22'
              r='3.4'
              fill={BG}
              stroke={TEAL_DEEP}
              strokeWidth='1.4'
            />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
