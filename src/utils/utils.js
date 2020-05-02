export const generateIdFromName = name => {
	const timestamp = new Date().getTime();
	const idName = name.toLowerCase().replace(/ /g, "_");
	
	return idName + "_" + timestamp;
};