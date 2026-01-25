import { Outlet } from "react-router-dom";
import { Header } from "./Component/Header";
import { useEffect, useState } from "react";

const Layout = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN
        setShowHeader(false);
      } else {
        // Scrolling UP
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Header wrapper with animation */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
      </div>

      {/* Page content */}
      <main className="pt-[80px]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
