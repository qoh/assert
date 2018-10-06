export class AssertError extends Error { }

export class AssertEqualsError extends AssertError {
	constructor(
		public readonly actual: any,
		public readonly expected: any,
		message?: string,
	) {
		super(message);
	}
}

export function assert(
	condition: boolean,
	message: string = "Assertion failed",
) {
	if (!condition) {
		throw new AssertError(message);
	}
}

export function assertEquals(
	actual: any,
	expected: any,
	message: string = "Actual value does not equal expected value",
) {
	if (!deepEquals(actual, expected)) {
		throw new AssertEqualsError(actual, expected, message);
	}
}

export function assertReferenceEquals(
	actual: any,
	expected: any,
	message: string = "Actual value does not equal expected value",
) {
	if (actual !== expected) {
		throw new AssertEqualsError(actual, expected, message);
	}
}

function deepEquals(a: any, b: any) {
	return a === b || objectEquals(a, b);
}

// TODO: What happens with internal data, like in Sets or Maps?
// TODO: Handle circular references.
function objectEquals(a: any, b: any) {
	if (
		typeof a !== 'object' ||
		typeof b !== 'object' ||
		Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)
	) {
		return false;
	}

	for (const key of Object.keys(a)) {
		if (!deepEquals(a[key], b[key])) {
			return false;
		}
	}

	// TODO: Optimize this to not do everything twice
	for (const key of Object.keys(b)) {
		if (!deepEquals(b[key], a[key])) {
			return false;
		}
	}

	return true;
}
