"use client";

import { ReactNode } from "react";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { BookingProvider } from "@/lib/booking-context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CookieBanner } from "@/components/CookieBanner";
import { BookingModal } from "@/components/booking/BookingModal";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <SmoothScrollProvider>
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
        <CookieBanner />
        <BookingModal />
      </SmoothScrollProvider>
    </BookingProvider>
  );
}
