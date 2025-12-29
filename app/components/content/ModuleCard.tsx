import React from "react";
import { Badge } from "../ui/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";

export interface ModuleCardProps {
  title: string;
  description: string;
  subject?: "math" | "science" | "language" | "history" | "arts";
  status?: "approved" | "pending" | "rejected";
}

const subjectColor: Record<NonNullable<ModuleCardProps["subject"]>, string> = {
  math: "bg-subject-math/10 text-subject-math border-subject-math/20",
  science: "bg-subject-science/10 text-subject-science border-subject-science/20",
  language: "bg-subject-language/10 text-subject-language border-subject-language/20",
  history: "bg-subject-history/10 text-subject-history border-subject-history/20",
  arts: "bg-subject-arts/10 text-subject-arts border-subject-arts/20",
};

export function ModuleCard({
  title,
  description,
  subject,
  status = "approved",
}: ModuleCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          {subject && (
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${subjectColor[subject]}`}
            >
              {subject}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant={status === "approved" ? "success" : status === "pending" ? "warning" : "danger"}>
            {status}
          </Badge>
          <Badge>Interactive</Badge>
          <Badge variant="info">HTML</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">5–10 min</div>
        <Button variant="secondary" size="sm">
          Open
        </Button>
      </CardFooter>
    </Card>
  );
}
