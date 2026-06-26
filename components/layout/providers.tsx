"use client";

import { AppProvider } from "@/components/lumora/app-context";
import { PageLoader } from "@/components/lumora/page-loader";
import { Header } from "@/components/lumora/header";
import { NavMenu } from "@/components/lumora/nav-menu";
import { RequestModal } from "@/components/lumora/request-modal";
import { ScrollProgress } from "./scroll-progress";
import { Footer } from "./footer";
import { AmbientBg } from "./ambient-bg";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AmbientBg />
      <ScrollProgress />
      <a href="#main" className="skip-link">Skip to content</a>
      <PageLoader />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <NavMenu />
      <RequestModal />
    </AppProvider>
  );
}
