import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("lib");
await mkdir(outputDirectory, { recursive: true });
await cp(resolve("src/sparx-ui/tokens.css"), resolve(outputDirectory, "tokens.css"));
