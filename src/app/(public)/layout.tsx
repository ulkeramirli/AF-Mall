import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIWidget } from "@/components/ui/AIWidget";
import { PageTransition } from "@/components/ui/PageTransition";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <AIWidget />
    </>
  );
}
