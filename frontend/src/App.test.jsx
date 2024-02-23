import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
const assert = require('assert');

describe("Combined Test Suites", () => {
  beforeAll(() => {
    console.log("This part executes once before all tests");
  });

  describe("Simple Calculations", () => {
    beforeEach(() => {
      console.log("executes before every test");
    });

    it("Is returning 5 when adding 2 + 3", () => {
      assert.equal(2 + 3, 5);
    });

    it("Is returning 6 when multiplying 2 * 3", () => {
      assert.equal(2 * 3, 6);
    });
  });

  describe("Something Truthy and Falsy", () => {
    it("true to be true", () => {
      expect(true).toBe(true);
    });

    it("false to be false", () => {
      expect(false).toBe(false);
    });
  });
});
