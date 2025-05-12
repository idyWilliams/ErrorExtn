import * as assert from "assert";
import { getWebviewContent } from "../../ui/webview.js";

suite("Webview UI Test Suite", () => {
  test("Should generate valid HTML with explanation", () => {
    const explanation = "This is a test explanation";
    const html = getWebviewContent(explanation);

    assert.ok(html.includes("<!DOCTYPE html>"));
    assert.ok(html.includes(explanation));
    assert.ok(html.includes("AI Error Explanation"));
    assert.ok(html.includes("Powered by"));
  });

  test("Should include all required CSS classes", () => {
    const html = getWebviewContent("test");

    assert.ok(html.includes('class="container"'));
    assert.ok(html.includes('class="footer"'));
    assert.ok(html.includes('class="brand"'));
  });

  test("Should handle HTML special characters in explanation", () => {
    const explanation = '<script>alert("test")</script>';
    const html = getWebviewContent(explanation);

    assert.ok(html.includes("&lt;script&gt;"));
    assert.ok(!html.includes("<script>"));
  });

  test("Should include branding placeholders", () => {
    const html = getWebviewContent("test");

    assert.ok(html.includes("[Your Name]"));
    assert.ok(html.includes("[Your Company]"));
  });
});
