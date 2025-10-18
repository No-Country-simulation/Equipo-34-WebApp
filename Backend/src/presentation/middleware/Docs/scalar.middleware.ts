import { apiReference } from "@scalar/express-api-reference";
import { scalar_config } from "../../../infrastructure/config/Docs/scalar.config";

export const scalar_middleware = apiReference(scalar_config);
