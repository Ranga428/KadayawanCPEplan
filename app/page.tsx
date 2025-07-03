import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Culture to Circuit | Kadayawan Kodex Interactive Booth",
  description:
    "Experience the bridge between Mindanao heritage and modern Computer Engineering through interactive activities, cultural storytelling, and hands-on technology demonstrations.",
}

export default function Home() {
  return <ClientPage />
}
