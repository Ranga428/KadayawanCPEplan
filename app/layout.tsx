import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Culture to Circuit | Kadayawan Kodex Booth",
  description:
    "Bridging Mindanao Heritage with Computer Engineering Innovation - Interactive booth experience connecting traditional culture to modern technology",
  keywords: "Kadayawan, Computer Engineering, Mindanao Culture, Technology, Heritage, Innovation",
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
