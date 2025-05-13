import path from "path";
import Mocha from "mocha";
import { glob } from "glob";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });

  const testsRoot = path.resolve(__dirname, "..");

  try {
    // This returns Promise<string[]> in glob v8+
    //@ts-ignore
    const files = await glob("**/**.test.js", { cwd: testsRoot });
//@ts-ignore
    for (const f of files) {
      mocha.addFile(path.resolve(testsRoot, f));
    }

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
