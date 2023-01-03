import { FunctionComponent } from "react"
import { trpc } from "../utils/trpc"

export const Header: FunctionComponent = () => {
    const { data } = trpc.greet.useQuery("hello", { onError: (err) => console.error(err) })
    console.log("works", data)
    return (<div data-test="header">{data?.greeting}</div>)
  }
  