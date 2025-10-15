import { scalar_specs } from "./scalar-specs.config";

export const scalar_config = {
  spec: {
    content: scalar_specs,
  },
  theme: "purple" as const,
  layout: "modern" as const,
  metadata: {
    title: "Api documentation",
    description: "Backend developed with clean architecture",
  },
};
