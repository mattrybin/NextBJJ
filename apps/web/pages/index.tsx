/* eslint-disable react/hook-use-state */
/* eslint-disable react/jsx-max-depth */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { useState } from "react"
import { trpc } from "../utils/trpc"
import { Header } from "../components/Header"


export default function Web() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:2022",
        }),
      ],
    })
  )
  console.log()
  return (
    <trpc.Provider 
        client={trpcClient} 
        queryClient={queryClient}
    >
    <QueryClientProvider client={queryClient}>
      <div data-test="home">
      <Header />
      </div>
    </QueryClientProvider>
    </trpc.Provider>

  )
}