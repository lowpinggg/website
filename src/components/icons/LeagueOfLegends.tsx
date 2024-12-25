// components/icons/LeagueOfLegends.tsx
import clsx from 'clsx'
import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

export function LeagueOfLegends({ className, size = 44, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('text-white', className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.93767 2H15.6359V34.1975H31.7164L29.4911 41.9999H4.93767L6.95833 37.8785V6.1231L4.93767 2ZM17.336 5.04581C18.7528 4.71126 20.2286 4.52764 21.7503 4.52764C32.1046 4.52764 40.4997 12.78 40.5031 22.9635C40.5031 29.2755 37.2727 34.8457 32.3506 38.1661L33.3558 34.6479L33.8082 33.0571C36.1965 30.3326 37.6434 26.7883 37.6434 22.9132C37.6434 14.3075 30.5275 7.33435 21.7503 7.33435C20.2173 7.33435 18.7381 7.55109 17.336 7.94616V5.04581ZM3 22.9601C3 19.7842 3.81886 16.7964 5.25812 14.1881V31.7366C3.81886 29.1265 3 26.1369 3 22.9601ZM17.336 32.5265H32.0316C34.4651 30.0256 35.9641 26.6409 35.9641 22.9131C35.9641 15.2182 29.6004 8.98164 21.7503 8.98164C20.2088 8.98164 18.727 9.2268 17.336 9.66965V32.5265Z"
        fill="currentColor"
      />
    </svg>
  )
}
