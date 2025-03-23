"use client";
import React, { useEffect, useState } from "react";
import IntroduceView from "../components/introduce/introduce-view";
import { useTheme } from "@/lib/provider/app-context-provider";

export default function Home() {
  const { themeColor } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 text-gray-900">
      <div className="max-w-screen-lg w-full px-5">
        <section
          id="about"
          className={`transition-all duration-500 ease-in-out ${
            activeSection === "about" ? "active" : ""
          }`}
        >
          <IntroduceView themeColor={themeColor} />
        </section>
      </div>
    </div>
  );
}
