/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MenuHighlights from "./components/MenuHighlights";
import FullMenu from "./components/FullMenu";
import TrustSection from "./components/TrustSection";
import Reservation from "./components/Reservation";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import About from "./components/About";
import WhatsAppWidget from "./components/WhatsAppWidget";

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminRoute(window.location.hash === "#admin");
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (isAdminRoute) {
    return <AdminDashboard onClose={() => (window.location.hash = "")} />;
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans selection:bg-brand-neon selection:text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MenuHighlights />
        <FullMenu />
        <Reservation />
        <Gallery />
        <Testimonials />
        <TrustSection />
        <FAQ />
        <About />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
