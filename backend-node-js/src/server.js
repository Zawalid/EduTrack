import Fastify from "fastify";
import { connectDB } from "./db.js";
import gradeRoutes from "./routes/grades.js";
import { seedGrades } from "./utils/seed.js";

// Initialization
const fastify = Fastify({
  ignoreTrailingSlash: true,
  caseSensitive: false,
  ignoreDuplicateSlashes: true,
});

// Routes
fastify.get("/", async (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.register(gradeRoutes, { prefix: "/api/grades" });

fastify.post("/api/grades/seed/:count", async (request, reply) => {
  const count = request.params.count;
  await seedGrades(count);
  reply.send({ message: `Seeded ${count} grades` });
});

// Start server
const start = async () => {
  try {
    // Connect to MongoDB
    connectDB();
    const host = await fastify.listen({ port: 3000 });
    console.log(`Server is running at ${host}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
