// components/icons/DiscordLogo.tsx
import clsx from 'clsx'

import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

export function TeamfightTactics({
  className,
  size = 44,
  ...props
}: IconProps) {
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
        d="M4.2 26C4.5 26.3 5.1 26.7 6.1 27.3V30.9L18.1 37.9V36.2C21.7 37.8 24.5 38.8 26.5 39.1H26.6L21.5 42L4.2 31.9V26ZM21.5 2L38.8 12V27.2C40.5 28.4 41.9 29.9 43.1 31.7C42.8 31.6 42.2 31.3 41.3 30.9C42.4 33.4 42.6 37.2 38.5 38.1C28.7 40.4 15.9 34 11.1 30.8C13.6 31.8 15.9 32.7 18.1 33.4V31.8C15.8 31 11.8 29.4 7.5 26.5C3.5 23.8 0.4 20.5 0 19.9C0.7 20.1 1.2 20.2 1.7 20.2C0.200001 17.5 1.8 14.6 4.3 13.5V12L21.5 2ZM21.5 4.1L6.1 13V20.2C5.4 19.6 4.4 17.9 4.2 16.9C3.5 17.4 3.4 18.4 3.8 19.5C5.6 24.1 13.2 29 18 31.6V19.4H10.5L7.9 13.5H35.1L32.5 19.5H25V35.2C27.2 35.6 29.3 35.9 31.2 36C39.5 36.4 40.1 34 38.7 32L33.9 34.8C32.6 34.9 31.4 34.9 30.3 34.7L36.9 30.9V13L21.5 4.1Z"
        fill="currentColor"
      />
    </svg>
  )
}
