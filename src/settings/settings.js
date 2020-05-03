import {_path, fse} from "../requires";

const SETTINGS_PATH = "/.Pemplates/settings";

const readSettings = (fileName) => {
	try {
		const path = _path.join(__dirname, SETTINGS_PATH, fileName);
		return fse.readJsonSync(path);
	} catch (e) {
		console.error(e);
		return null;
	}
};

const writeSettings = async (fileName, value) => {
	await fse.ensureDir(_path.join(__dirname, SETTINGS_PATH));
	await fse.writeJson(_path.join(__dirname, SETTINGS_PATH, fileName), value);
};

/**
 *
 * @param fileName
 * @param defaultValue
 * @returns {{set: (function(Object): Object), get: (function(): Object|null|undefined), update: (function(String, *): Object), write: (function(): void)}}
 * @constructor
 */
export const SETTINGS = (fileName, defaultValue) => {
	let settings = readSettings(fileName);
	if(settings === null){
		settings = defaultValue;
	}
	
	const write = () => writeSettings(fileName, settings);
	// const read = () => readSettings(fileName);
	const get = () => settings;
	const set = (value) => settings = value;
	const setProp = (key, value) => settings[key] = value;
	const getProp = (key) => settings[key];
	const update = (name, value) => settings[name] = value;
	
	return {
		write,
		// read,
		get,
		set,
		setProp,
		getProp,
		update
	}
};

/**
 *
 * @param fileName
 * @param defaultValue
 * @returns {{set: (function(Array): Array), get: (function(): Array), write: (function(): void), push: (function(*=): boolean | void | * | number)}}
 * @constructor
 */
export const ARRAY_SETTINGS = (fileName, defaultValue) => {
	let settings = readSettings(fileName);
	if(settings === null){
		settings = defaultValue;
	}
	
	const write = async () => await writeSettings(fileName, settings);
	const get = () => settings;
	const push = (value) => settings.push(value);
	const set = (value) => settings = [...value];
	
	return {
		write,
		get,
		set,
		push
	}
};