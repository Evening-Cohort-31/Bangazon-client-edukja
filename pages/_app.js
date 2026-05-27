import '../global.css'
import {
  HydrationBoundary, QueryClient, QueryClientProvider
} from "@tanstack/react-query"
import { ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {useState} from "react"


export default function Bangazon({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const [queryClient] = useState(() => new QueryClient())

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
