// components/icons/FacebookLogo.tsx
import clsx from 'clsx'
import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

export function Facebook({ className, size = 32, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="3 2 9 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('text-white', className)}
      {...props}
    >
      <path
        d="M11.4772 12.9381L11.9793 9.66604H8.83967V7.5215C8.83967 6.62633 9.27825 5.75375 10.6844 5.75375H12.0372V2.98912C12.0372 2.98912 11.1696 2.76807 10.2162 2.76807C7.63056 2.76807 5.93167 4.33524 5.93167 7.17226V9.66604H3.88V12.9381H5.93167V20.8481H9.47V12.9381H11.4772Z"
        fill="currentColor"
      />
    </svg>
  )
}
