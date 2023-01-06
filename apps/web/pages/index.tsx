import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const hello = trpc.greet.useQuery("Matt Rybin");
  console.log(hello.data)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div data-test="home">
          <h1>Welcome</h1>
          <div data-test="header">{hello.data?.greeting}</div>
        </div>
      </main>
    </>
  )
}
