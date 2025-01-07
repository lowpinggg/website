/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const SUPABASE_URL = 'https://oroqkwktxvuxkwoszubb.supabase.co'

function getFullPosterUrl(posterPath: string | null) {
  if (!posterPath) return null
  if (posterPath.startsWith('http')) return posterPath
  return `${SUPABASE_URL}${posterPath}`
}

async function loadGoogleFont(font: string, text: string, weights: number[]) {
  const fonts = await Promise.all(
    weights.map(async (weight) => {
      const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`
      const css = await (await fetch(url)).text()
      const resource = css.match(
        /src: url\((.+?)\) format\('(opentype|truetype)'\)/,
      )

      if (resource) {
        const response = await fetch(resource[1])
        if (response.status === 200) {
          return await response.arrayBuffer()
        }
      }
      throw new Error(`Failed to load font data for weight ${weight}.`)
    }),
  )
  return fonts
}

const BrandLogo = ({ size = 140 }: { size: number }) => {
  const aspectRatio = 208 / 1218
  const width = size
  const height = size * aspectRatio

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1218 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M158.16 207.27H120.16C120.16 178.44 128.32 150.85 144.41 125.29C154.14 109.83 166.63 95.2 182.4 80.82H117.59V42.82H196.69C209.78 42.82 221.24 51.04 225.87 63.76C230.85 77.43 226.92 92.72 216.1 101.82C177.11 134.58 158.16 169.07 158.16 207.27Z"
        fill="white"
      />
      <path
        d="M110.4 168.09H31.3C18.35 168.09 7.29 159.81 2.43 146.49C-3.01 131.57 0.880003 114.7 11.88 105.45C50.88 72.7 69.83 38.2 69.83 0H107.83C107.83 28.83 99.67 56.42 83.58 81.98C73.03 98.75 59.23 114.54 41.52 130.09H110.4V168.09Z"
        fill="white"
      />
      <path
        d="M268.01 34.475H308.99V138.315H366.92V172.595H268.01V34.475Z"
        fill="white"
      />
      <path
        d="M444.59 31.915C455.49 31.915 465.47 33.685 474.54 37.235C483.73 40.785 491.68 45.775 498.38 52.205C505.21 58.645 510.47 66.195 514.14 74.865C517.95 83.535 519.85 92.995 519.85 103.235C519.85 113.475 517.95 123.065 514.14 132.005C510.46 140.805 505.21 148.425 498.38 154.865C491.68 161.305 483.73 166.355 474.54 170.035C465.48 173.585 455.49 175.355 444.59 175.355C433.69 175.355 423.64 173.585 414.44 170.035C405.38 166.355 397.43 161.295 390.6 154.865C383.9 148.425 378.65 140.805 374.84 132.005C371.16 123.205 369.32 113.615 369.32 103.235C369.32 92.855 371.16 83.335 374.84 74.665C378.65 65.995 383.9 58.505 390.6 52.205C397.43 45.765 405.38 40.775 414.44 37.235C423.63 33.685 433.68 31.915 444.59 31.915ZM445.19 66.005C440.59 66.005 436.19 66.925 431.99 68.765C427.92 70.605 424.31 73.235 421.15 76.645C418.13 80.065 415.7 84.065 413.86 88.665C412.15 93.135 411.3 98.055 411.3 103.445C411.3 108.835 412.22 113.825 414.06 118.415C415.9 123.015 418.33 127.015 421.35 130.435C424.5 133.855 428.11 136.545 432.19 138.515C436.26 140.355 440.6 141.275 445.19 141.275C449.78 141.275 453.86 140.355 457.8 138.515C461.74 136.545 465.22 133.855 468.24 130.435C471.26 127.015 473.63 123.015 475.33 118.415C477.04 113.815 477.89 108.825 477.89 103.445C477.89 98.065 477.04 93.135 475.33 88.665C473.62 84.065 471.26 80.065 468.24 76.645C465.22 73.225 461.74 70.605 457.8 68.765C453.86 66.925 449.66 66.005 445.19 66.005Z"
        fill="white"
      />
      <path
        d="M517.1 34.475H560.84L590 147.175H581.33L610.3 34.475H650.3L679.46 147.175H670.79L699.55 34.475H741.52L694.82 172.595H652.65L624.87 67.185H633.93L605.36 172.595H563.39L517.1 34.475Z"
        fill="white"
      />
      <path
        d="M811.23 34.475C829.09 34.475 842.89 38.745 852.61 47.285C862.46 55.825 867.39 67.845 867.39 83.345C867.39 99.895 862.46 112.765 852.61 121.965C842.89 131.025 829.1 135.565 811.23 135.565H771.63L789.56 117.635V172.605H748.58V34.475H811.24H811.23ZM809.26 103.835C815.43 103.835 820.16 102.195 823.45 98.905C826.87 95.625 828.57 90.825 828.57 84.525C828.57 78.615 826.86 74.085 823.45 70.925C820.17 67.645 815.44 65.995 809.26 65.995H771.63L789.56 48.265V121.755L771.63 103.825H809.26V103.835Z"
        fill="white"
      />
      <path d="M879.13 34.475H920.11V172.595H879.13V34.475Z" fill="white" />
      <path
        d="M939.46 34.475H974.34L1043.89 125.895L1033.05 129.635V34.475H1070.49V172.595H1035.61L966.26 81.565L977.1 77.825V172.595H939.47V34.475H939.46Z"
        fill="white"
      />
      <path
        d="M1194.07 81.175C1189.34 76.575 1183.76 72.895 1177.32 70.145C1171.02 67.385 1164.84 66.005 1158.8 66.005C1153.81 66.005 1149.14 66.995 1144.81 68.965C1140.61 70.805 1136.93 73.435 1133.78 76.845C1130.76 80.125 1128.33 84.065 1126.49 88.665C1124.78 93.135 1123.93 98.055 1123.93 103.445C1123.93 108.835 1124.78 113.825 1126.49 118.415C1128.33 123.015 1130.83 127.015 1133.98 130.435C1137.13 133.855 1140.88 136.545 1145.21 138.515C1149.55 140.355 1154.21 141.275 1159.2 141.275C1163.8 141.275 1169.12 140.095 1175.16 137.725C1181.33 135.365 1186.98 132.275 1192.1 128.465L1215.35 157.235C1210.36 160.785 1204.51 163.935 1197.81 166.695C1191.11 169.455 1184.15 171.555 1176.93 173.005C1169.7 174.585 1162.81 175.365 1156.24 175.365C1145.6 175.365 1135.75 173.595 1126.69 170.045C1117.76 166.365 1109.88 161.305 1103.05 154.875C1096.35 148.435 1091.16 140.815 1087.48 132.015C1083.8 123.215 1081.96 113.695 1081.96 103.445C1081.96 93.195 1083.87 83.745 1087.67 75.075C1091.48 66.405 1096.87 58.855 1103.83 52.415C1110.79 45.845 1118.94 40.795 1128.26 37.245C1137.59 33.695 1147.83 31.925 1159 31.925C1166.09 31.925 1173.19 32.775 1180.28 34.485C1187.37 36.195 1194.07 38.625 1200.38 41.775C1206.82 44.925 1212.46 48.735 1217.33 53.205L1194.08 81.185L1194.07 81.175ZM1180.08 101.075H1215.35V157.225H1180.08V101.075Z"
        fill="white"
      />
    </svg>
  )
}

export async function GET() {
  const textContent =
    'Portail Événementiel Calendrier officiel des tournois et inscriptions'
  const [font200, font300, font400, font700, font900] = await loadGoogleFont(
    'Alexandria',
    textContent,
    [200, 300, 400, 700, 900],
  )

  // TODO: Dynamic poster for events
  const posterUrl = getFullPosterUrl(
    '/storage/v1/object/public/assets/banner-hero.png',
  )

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(13, 13, 14)',
        }}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt="Banner"
            style={{
              display: 'block',
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            padding: '40px',
            paddingBottom: '60px',
            background:
              'linear-gradient(45deg, rgba(15,17,21,1) 0%, rgba(15,17,21,0.3) 100%)',
          }}
        >
          <BrandLogo size={260} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                fontWeight: 700,
                fontSize: '64px',
                margin: '0',
                color: 'white',
              }}
            >
              Portail Événementiel
            </h1>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '26px',
                fontWeight: 300,
                margin: '0',
              }}
            >
              Calendrier officiel des tournois et inscriptions
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Alexandria', data: font200, weight: 200, style: 'normal' },
        { name: 'Alexandria', data: font300, weight: 300, style: 'normal' },
        { name: 'Alexandria', data: font400, weight: 400, style: 'normal' },
        { name: 'Alexandria', data: font700, weight: 700, style: 'normal' },
        { name: 'Alexandria', data: font900, weight: 900, style: 'normal' },
      ],
    },
  )
}
