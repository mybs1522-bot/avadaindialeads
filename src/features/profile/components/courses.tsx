"use client";

import { BookOpen, Code2, Zap } from "lucide-react";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

const coursesData = {
  planning: {
    title: "Planning Courses",
    icon: Code2,
    courses: ["AutoCAD"],
  },
  designing: {
    title: "Designing Courses",
    icon: Code2,
    courses: ["3DS Max", "Revit", "Sketchup"],
  },
  rendering: {
    title: "Rendering Courses",
    icon: Zap,
    courses: ["Vray", "Enscape", "Lumion", "D5 Render"],
  },
};

function CoursesPanel({
  type,
}: {
  type: "planning" | "designing" | "rendering";
}) {
  const course = coursesData[type];
  const Icon = course.icon;

  return (
    <Panel className="mt-4">
      <PanelHeader>
        <PanelTitle className="flex items-center gap-2">
          <Icon className="size-5" />
          {course.title}
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {course.courses.map((courseName) => (
            <div
              key={courseName}
              className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-3 transition-all hover:bg-card hover:border-primary/50"
            >
              <BookOpen className="size-5 text-primary shrink-0" />
              <span className="font-medium text-sm">{courseName}</span>
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}

export function PlanningCourses() {
  return <CoursesPanel type="planning" />;
}

export function DesigningCourses() {
  return <CoursesPanel type="designing" />;
}

export function RenderingCourses() {
  return <CoursesPanel type="rendering" />;
}
