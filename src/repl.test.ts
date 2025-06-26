import { clearInput } from "./repl.js";

import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "single",
    expected: ["single"],
  },
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "multiple   spaces    between",
    expected: ["multiple", "spaces", "between"],
  },
  {
    input: "\t\ntabs\nand\nnewlines\t",
    expected: ["tabs", "and", "newlines"],
  },
])("clearInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = clearInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
