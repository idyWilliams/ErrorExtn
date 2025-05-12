import * as path from "path";
import { runTests } from "@vscode/test-electron";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    const extensionDevelopmentPath = path.resolve(__dirname, "../../");

    // The path to the extension test runner script
    // NOTE: Add .js extension!
    const extensionTestsPath = path.resolve(__dirname, "./suite/index.js");

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: ["--disable-extensions"],
      extensionTestsEnv: {
        NODE_OPTIONS: "--experimental-specifier-resolution=node",
      },
    });
  } catch (err) {
    console.error("Failed to run tests");
    console.error(err);
    process.exit(1);
  }
}

main();
