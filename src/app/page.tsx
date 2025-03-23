"use client";
import React, { useEffect, useState } from "react";
import IntroduceView from "../components/introduce/introduce-view";
import { useTheme } from "@/lib/provider/app-context-provider";
import HighlightedProjectCard from "@/components/highlighted-projects/highlighted-project-card";
import { Project } from "@/lib/model/project.model";
import { fetchHighlightedProjects } from "@/lib/modules/projects/project.action";

export default function Home() {
  const { themeColor } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const highlighProjects = await fetchHighlightedProjects();
      setProjects(highlighProjects);
      setLoading(false);
    };

    fetchData();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 text-gray-900">
      <div className="max-w-screen-lg w-full px-5">
        {/* About Section */}
        <section
          id="about"
          className={`transition-all duration-500 ease-in-out ${
            activeSection === "about" ? "active" : ""
          }`}
        >
          <IntroduceView themeColor={themeColor} />
        </section>

        {/* Highlighted Projects Section */}
        <section
          id="hilighted-projects"
          className={`transition-all duration-500 ease-in-out ${
            activeSection === "hilighted-projects" ? "active" : ""
          } flex flex-col gap-4 justify-center items-center min-h-screen h-auto py-5`}
        >
          <h2 className="text-2xl font-bold">Highlighted Projects</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project) => (
                <HighlightedProjectCard
                  key={`hilighted-projects-${project.id}`}
                  item={project}
                  themeColor={themeColor}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
