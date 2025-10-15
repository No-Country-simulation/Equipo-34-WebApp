import path from "path";
import fs from "fs";

const swaggerPath = path.join(__dirname, "../../external/Docs/swagger.json");
const swaggerContent = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

export const scalar_config = {
  spec: {
    url: "/swagger.json",
    content: swaggerContent,
  },
  theme: "purple" as const,
  layout: "modern" as const,
  metadata: {
    title: "Api documentation",
    description: "Backend developed with clean architecture",
  },
};
