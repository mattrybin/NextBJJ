import { describe, test, expect} from 'vitest'

export const helloWorld = () => 'Hello World!'

describe("helloWorld", () => {
	test("returns 'Hello World!'", () => {
		expect(helloWorld()).toBe('Hello World!')
	})
})