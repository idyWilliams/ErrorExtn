import * as assert from "assert";
import { getHoverBranding } from "../../ui/hoverBranding.js";

suite("Hover Branding Test Suite", () => {
  test("Should return markdown string with branding", () => {
    const branding = getHoverBranding();

    assert.strictEqual(typeof branding, "string");
    assert.ok(branding.includes("---"));
    assert.ok(branding.includes("Powered by"));
    assert.ok(branding.includes("[Your Name]"));
    assert.ok(branding.includes("[Your Company]"));
  });

  test("Should include markdown formatting", () => {
    const branding = getHoverBranding();

    assert.ok(branding.includes("**"));
    assert.ok(branding.includes("*"));
  });
});
