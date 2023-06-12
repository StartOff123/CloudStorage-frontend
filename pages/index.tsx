import React from 'react'
import Head from 'next/head'
import styles from "@/styles/Home.module.scss"

export default function Home() {
    return (
        <>
            <Head>
                <title>Cloud Storage</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <h1>Hello World</h1>
            </main>
        </>
    )
}