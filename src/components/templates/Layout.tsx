import { ReactNode } from "react";
import Header from '../organisms/Header'
import Head from 'next/head'

type props = {
  children: ReactNode,
  title: string,
  Header: boolean
}

const Layout = (props: props) => {

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta
          name="description"
          content="技術書籍の感想文を残すためのサイトです。"
        />
      </Head>
      {props.Header && <Header />}
      {props.children}
    </div>
  )
}

export default Layout