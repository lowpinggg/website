// hooks/use-lockscroll.ts

const resetScroll = () => {
  const resetStyles = {
    overflow: '',
    height: '',
    position: '',
    width: '',
    left: '',
  }
  Object.assign(document.documentElement.style, resetStyles)
  Object.assign(document.body.style, resetStyles)
}

export const setScrollLock = (lock: boolean, clearDelay = 400) => {
  if (typeof window === 'undefined') return

  if (lock) {
    const styles = {
      overflow: 'hidden',
      height: '100vh',
      position: 'fixed',
      width: '100%',
      left: '0',
    }
    Object.assign(document.documentElement.style, styles)
    Object.assign(document.body.style, styles)
  } else {
    setTimeout(() => {
      resetScroll()
      window.scrollTo(0, 0)
    }, clearDelay)
  }
}
