export const sum = (first: number, second: number) => first + second

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe("#sum", () => {
    it("return 2 if I do 1 + 1", () => {
      expect(sum(1, 1)).toBe(2)
    })
  })
}
