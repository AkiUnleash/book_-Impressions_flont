import Head from 'next/head'
import Image from 'next/image'
import styles from '../assets/styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/templates/MyLayout'

export default function Home() {
  return (

    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </main>
      </div>
    </Layout>

  )
}
