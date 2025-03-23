'use server';
import { mockHighlightedProjects } from "@/lib/mocks/highlighted-projects";
import { Project } from "@/lib/model/project.model";

export async function fetchHighlightedProjects(): Promise<Project[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHighlightedProjects);
    }, 1000);
  });
}
