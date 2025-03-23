import { Project } from "@/lib/model/project.model";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface Props {
  item: Project;
  className?: string;
  themeColor?: string;
}

export default function HighlightedProjectCard(props: Props) {
  const { item, className } = props;

  return (
    <Card className={cn("p-5 flex flex-col gap-4", className)}>
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.thumbnail_image})` }}
      />
      <div>
        <h3 className="text-xl font-semibold">{item.name}</h3>
        <p className="text-gray-700 line-clamp-6">
          {item.excerpt}
        </p>
      </div>
    </Card>
  );
}
