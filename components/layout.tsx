import Header from "./header";
import Footer from "./footer";
import type { ReactNode } from "react";
import Separator from "./separator";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4">
      <Header />
      <main className="py-4">{children}</main>
      <Separator />
      <Footer />
    </div>
  );
}
