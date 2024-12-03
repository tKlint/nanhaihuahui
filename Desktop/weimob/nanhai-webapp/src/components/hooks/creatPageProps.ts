import { useEffect } from 'react'

export default function creatPageProps<T extends Record<string, any>>(defaultProps: T) {
  let pageProps = defaultProps || {}
  function usePageProps() {
    useEffect(
      () => () => {
        pageProps = defaultProps
      },
      []
    )
    return pageProps
  }

  function setPageProps(props: Partial<T>) {
    pageProps = {
      ...pageProps,
      ...props
    }
  }

  return {
    usePageProps,
    setPageProps
  }
}
