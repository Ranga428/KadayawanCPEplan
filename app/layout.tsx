import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Culture to Circuit | Kadayawan Kodex Booth",
  description: "Bridging Mindanao heritage with modern technology - Interactive booth planning for Kadayawan Kodex",
  keywords: "Kadayawan, Kodex, Culture, Technology, Mindanao, Heritage, Computer Engineering, Booth",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
