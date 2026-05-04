import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import About from "@/src/components/About";
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
