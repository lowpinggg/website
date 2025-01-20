// components/icons/Thunder.tsx
import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

export function Thunder({ className, size = 32, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.09523 1.16595C8.09523 0.92113 7.93712 0.703513 7.7042 0.627848C7.47128 0.552191 7.21626 0.634649 7.07176 0.833563L0.108026 10.4087C-0.016934 10.5804 -0.0347851 10.8082 0.0612731 10.9978C0.15818 11.1874 0.352836 11.3072 0.56536 11.3072H5.22279V16.8342C5.22279 17.0791 5.38006 17.2967 5.61383 17.3723C5.84674 17.448 6.10177 17.3655 6.24627 17.1666L13.21 7.5915C13.335 7.41978 13.3528 7.19197 13.2568 7.00241C13.1598 6.81284 12.9652 6.69298 12.7518 6.69298H8.09525L8.09523 1.16595Z"
        fill="currentColor"
      />
    </svg>
  )
}
