export function determineCategory(path) {
	// Determine the category based on the current module's URL
	const modulePath = path || "/";
	if (modulePath == "/") console.error("No valid path defined in a quiz (error from quizMetadataHelper.js)");
	const pathParts = modulePath.split("/");
	const category = pathParts[pathParts.length - 3];
	return category;
}
