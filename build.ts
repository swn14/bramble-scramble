const cmd = new Deno.Command("npm", {
  args: ["--prefix", "client", "run", "build"],
  stdout: "inherit",
  stderr: "inherit",
});

const { code } = await cmd.output();
Deno.exit(code);
