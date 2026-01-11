import Navbar from "@/components/Navbar/Navbar"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}