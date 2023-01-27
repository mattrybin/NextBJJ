import { describe, test, expect } from "vitest"

export const helloWorld = () => "Hello World!"

// test
describe("helloWorld", () => {
  test("returns 'Hello World!'", () => {
    expect(helloWorld()).toBe("Hello World!")
  })
})
