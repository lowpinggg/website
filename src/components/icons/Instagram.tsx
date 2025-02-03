// components/icons/InstagramLogo.tsx
import { type ComponentProps } from 'react'

type IconProps = {
  className?: string
  size?: number | string
} & Omit<ComponentProps<'svg'>, 'width' | 'height'>

export function Instagram({ className, size = 32, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="90 2 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M99.9643 6.7687C97.2216 6.7687 95.0093 8.9767 95.0093 11.7238C95.0093 14.4708 97.2216 16.6831 99.9643 16.6831C102.707 16.6831 104.919 14.4751 104.919 11.7238C104.919 8.97239 102.707 6.7687 99.9643 6.7687ZM99.9643 14.79C98.2566 14.79 96.8636 13.397 96.8636 11.6893C96.8636 9.98152 98.2566 8.58858 99.9643 8.58858C101.672 8.58858 103.065 9.98152 103.065 11.6893C103.065 13.397 101.672 14.79 99.9643 14.79ZM106.278 6.41077C106.278 7.05333 105.76 7.57083 105.118 7.57083C104.475 7.57083 103.958 7.05333 103.958 6.41077C103.958 5.7682 104.475 5.2507 105.118 5.2507C105.76 5.2507 106.278 5.7682 106.278 6.41077Z"
        fill="currentColor"
      />
      <path
        d="M109.56 7.58377C109.486 6.06145 109.133 4.70733 107.999 3.58608C106.864 2.46483 105.523 2.09827 104.001 2.02495C102.427 1.93439 97.7175 1.93439 96.1435 2.02495C94.6211 2.09827 93.267 2.45189 92.1458 3.58608C91.0245 4.72027 90.658 6.06145 90.5846 7.58377C90.4941 9.15783 90.4941 13.8671 90.5846 15.4411C90.658 16.9635 91.0116 18.3176 92.1458 19.4388C93.28 20.5601 94.6211 20.9266 96.1435 21C97.7175 21.0905 102.427 21.0905 104.001 21C105.523 20.9266 106.877 20.573 107.999 19.4388C109.12 18.3046 109.486 16.9635 109.56 15.4411C109.65 13.8671 109.65 9.15783 109.56 7.58377ZM107.485 17.1273C107.149 17.9726 106.498 18.6669 105.648 18.9645C104.376 19.469 101.362 19.3526 99.9212 19.3526C98.4808 19.3526 95.4621 19.4647 94.1942 18.9645C93.349 18.6281 92.6546 17.9769 92.3571 17.1273C91.8525 15.8551 91.969 12.8407 91.969 11.4003C91.969 9.95995 91.8568 6.9412 92.3571 5.67333C92.6935 4.82808 93.3446 4.13377 94.1942 3.8362C95.4664 3.33164 98.4808 3.44808 99.9212 3.44808C101.362 3.44808 104.38 3.33595 105.648 3.8362C106.493 4.17258 107.188 4.82377 107.485 5.67333C107.99 6.94552 107.873 9.95995 107.873 11.4003C107.873 12.8407 107.986 15.8595 107.485 17.1273Z"
        fill="currentColor"
      />
    </svg>
  )
}
