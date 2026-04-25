import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import About from "@/src/components/About";
import Partners from "@/src/components/Partners";
import Contact from "@/src/components/Contact";
import Footer from "@/src/components/Footer";
import Strengths from "../components/Strengths";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Strengths />
      <Portfolio />
    </main>
  );
}
