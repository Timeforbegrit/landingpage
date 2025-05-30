import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          position: 'relative',
        }}
      >
        {/* Буква П */}
        <div
          style={{
            color: 'white',
            fontSize: '20px',
            fontFamily: 'system-ui',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '7px',
            top: '6px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '3px',
                backgroundColor: 'white',
                borderRadius: '1px',
                marginBottom: '2px',
              }}
            />
            <div
              style={{
                display: 'flex',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '13px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                }}
              />
              <div
                style={{
                  width: '3px',
                  height: '13px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Акцентная точка */}
        <div
          style={{
            position: 'absolute',
            right: '7px',
            top: '8px',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#60a5fa',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
} 