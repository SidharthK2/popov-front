import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from "@/app/footer";
import Header from "@/app/header";
import styles from "@/app/page.module.css";
import Container from "@/app/container";
import {Divider} from "@mui/material";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className={styles.main}>
          {children}
          <Divider />
          <Container paddingY={4}>
            <Footer />
          </Container>
        </main>
      </body>
    </html>
  )
}
