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

export function assertEquals<T>(
	actual: T,
	expected: T,
	message: string = "Actual value does not equal expected value",
) {
	if (actual !== expected && !objectEquals(actual, expected)) {
		throw new AssertEqualsError(actual, expected, message);
	}
}

export function assertReferenceEquals<T>(
	actual: T,
	expected: T,
	message: string = "Actual value does not equal expected value",
) {
	if (actual !== expected) {
		throw new AssertEqualsError(actual, expected, message);
	}
}

function objectEquals(a: any, b: any) {
	if (
		typeof a !== 'object' ||
		typeof b !== 'object' ||
		Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)
	) {
		return false;
	}

	// TODO: What happens if you pass two Sets or Maps to this function?

	for (const key of Object.keys(a)) {
		if (a[key] !== b[key]) {
			return false;
		}
	}

	// TODO: Optimize this to not do everything twice
	for (const key of Object.keys(b)) {
		if (b[key] !== a[key]) {
			return false;
		}
	}

	return true;
}
