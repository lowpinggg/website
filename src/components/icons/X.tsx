import clsx from 'clsx'
import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

// components/icons/X.tsx
export function X({ className, size = 32, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="59 3 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('text-white', className)}
      {...props}
    >
      <path
        d="M72.9003 3.89648H75.5586L69.7525 10.5309L76.5827 19.56H71.236L67.0453 14.0853L62.2559 19.56H59.5938L65.8028 12.4625L59.2549 3.89648H64.7372L68.5213 8.90053L72.9003 3.89648ZM71.9665 17.9711H73.4387L63.9352 5.40259H62.3538L71.9665 17.9711Z"
        fill="currentColor"
      />
    </svg>
  )
}
