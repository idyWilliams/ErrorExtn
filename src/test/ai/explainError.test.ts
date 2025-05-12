import * as assert from "assert";
import { explainError } from "../../ai/explainError.js";

suite("AI Error Explanation Test Suite", () => {
  test("Should return a string explanation for a valid error", async () => {
    const errorMessage =
      "TypeError: Cannot read property 'length' of undefined";
    const codeContext = "const arr = undefined;\nconsole.log(arr.length);";
    const apiKey = process.env.OPENAI_API_KEY || "";
    const modelName = "gpt-3.5-turbo";

    const explanation = await explainError(
      errorMessage,
      codeContext,
      apiKey,
      modelName
    );

    assert.strictEqual(typeof explanation, "string");
    assert.ok(explanation.length > 0);
    assert.ok(explanation.includes("TypeError"));
  });

  test("Should handle empty error message", async () => {
    const errorMessage = "";
    const codeContext = "const x = 1;";
    const apiKey = process.env.OPENAI_API_KEY || "";
    const modelName = "gpt-3.5-turbo";

    const explanation = await explainError(
      errorMessage,
      codeContext,
      apiKey,
      modelName
    );

    assert.strictEqual(typeof explanation, "string");
    assert.ok(explanation.length > 0);
  });

  test("Should handle missing API key", async () => {
    const errorMessage =
      "TypeError: Cannot read property 'length' of undefined";
    const codeContext = "const arr = undefined;\nconsole.log(arr.length);";
    const apiKey = "";
    const modelName = "gpt-3.5-turbo";

    try {
      await explainError(errorMessage, codeContext, apiKey, modelName);
      assert.fail("Should have thrown an error for missing API key");
    } catch (error) {
      assert.ok(error instanceof Error);
    }
  });
});
