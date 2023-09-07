export const emailRegex = new RegExp(
	/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
	"gm",
);

export function validatePassword(password: string): string {
	if (password.length < 8) {
		return "Password must be at least 8 characters long.";
	}

	const hasLowercaseLetter = /[a-z]/.test(password);
	if (!hasLowercaseLetter) {
		return "Password must have at least 1 lower case letter.";
	}

	const hasUppercaseLetter = /[A-Z]/.test(password);
	if (!hasUppercaseLetter) {
		return "Password must have at least 1 upper case letter.";
	}

	const hasNumber = /\d/.test(password);
	if (!hasNumber) {
		return "Password must have at least 1 number.";
	}

	return "";
}
