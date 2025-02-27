import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />

      <footer className="text-center text-gray-500 py-4 mt-8 border-t">
        Developed by Shaily Fadadu © 2025
      </footer>
    </main>
  );
}
