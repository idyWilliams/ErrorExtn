import path from "path";
import Mocha from "mocha";
import { sync } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  try {
    const files = sync("**/**.test.js", { cwd: testsRoot });

    // Add files to the test suite
    for (const f of files) {
      mocha.addFile(path.resolve(testsRoot, f));
    }

    // Run the mocha test suite
    await new Promise<void>((resolve, reject) => {
      mocha.run((failures: number) => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    throw err;
  }
}
