import React from "react";
import { Header } from "../Component/Header.jsx";
import { HeroSection } from "../Component/HeroSection.jsx";
import { LoanCalculator } from "../Component/LoanCalculator.jsx";
import Footer from "../Component/Footer.jsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background ">
      <Header />

      {/* Hero Section */}
      <div className="">
        <section id="home">
          <HeroSection />
        </section>
        {/* Loan Calculator Section */}
        {/* <section id="calculator" className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <LoanCalculator />
          </div>
        </section> */}

        {/* Footer */}
        <section className="mb-1">
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Index;
