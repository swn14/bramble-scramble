const build = new Deno.Command("npm", {
  args: ["--prefix", "client", "run", "build"],
  stdout: "inherit",
  stderr: "inherit",
});

const { code } = await build.output();
if (code !== 0) {
  console.error("Build failed. Exiting...");
  Deno.exit(code);
}

// Start the server after building
const server = new Deno.Command("deno", {
  args: ["run", "-A", "app.ts"],
  stdout: "inherit",
  stderr: "inherit",
});

Deno.exit((await server.output()).code);
