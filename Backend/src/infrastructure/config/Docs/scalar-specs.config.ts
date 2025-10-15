export const scalar_specs = {
  openapi: "3.1.0",
  info: {
    title: "Healthech App",
    version: "1.0.0",
    description: "Healthtech App's Documentation",
  },
  contact: {
    name: "Moises Armando Heredia",
    email: "moisarm03@gmail.com",
  },
  license: {
    name: "MIT",
    url: "https://opensource.org/licenses/MIT",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 3001}`,
      description: "Local Server",
    },
  ],
};
