import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express, Oh! API Documentation",
      version: "1.0.0",
      description: "API documentation for Express, Oh! application",
      contact: {
        name: "Express Oh Maintainers",
        url: "https://github.com/anoop/express-oh",
        email: "support@example.com",
      },
      "x-logo": {
        url: "https://raw.githubusercontent.com/swagger-api/swagger-ui/master/dist/favicon-32x32.png",
        altText: "Express Oh Logo",
      },
    },
    tags: [
      { name: "Authentication", description: "Authentication endpoints" },
      { name: "Users v1", description: "User operations for v1 endpoints" },
      { name: "Users v2", description: "User operations for v2 endpoints" },
      { name: "Health", description: "Service health and diagnostics" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Enter your Bearer token in the format **Bearer <token>**",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The user's unique identifier",
            },
            name: {
              type: "string",
              description: "The name of the user",
            },
            email: {
              type: "string",
              format: "email",
              description: "The email address of the user",
            },
          },
          required: ["name", "email"],
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            message: {
              type: "string",
            },
          },
        },
        Health: {
          type: "object",
          properties: {
            status: { type: "string", example: "UP" },
            timestamp: { type: "string", format: "date-time" },
            uptime: { type: "number", format: "float" },
            environment: { type: "string", nullable: true },
            version: { type: "string", nullable: true },
            services: {
              type: "object",
              additionalProperties: { type: "string", enum: ["UP", "DOWN"] },
            },
            system: {
              type: "object",
              properties: {
                memory: {
                  type: "object",
                  properties: {
                    used: { type: "number", format: "float" },
                    total: { type: "number", format: "float" },
                  },
                },
                pid: { type: "integer" },
                platform: { type: "string" },
                nodeVersion: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  apis: ["src/routes/**/*.ts"],
});
