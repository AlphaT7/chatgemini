const fastify = require("fastify")({ logger: true });
const path = require("node:path");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

fastify.get("/", function (req, reply) {
  reply.sendFile("index.html", path.join(__dirname, "public")); // serving a file from a different root location
});

// Run the server!
fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
