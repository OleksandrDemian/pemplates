import {notify} from "power-notifier";
import TemplatesRepo from "../stores/templatesRepo";
import {generateIdFromName} from "./utils";
import {_path, fse} from "../requires";
import {execShellCommand} from "./shellUtils";

const TEMPLATES_PATH = "/.Pemplates/templates/";

const isGit = str => {
	return str.match(/(.*).git$/);
};

export const removeTemplate = async ({ path }) => {
	await fse.remove(path);
};

export const createTemplate = async ({name, path, description, creationTimestamp}) => {
	if(TemplatesRepo.has(name)){
		if(!confirm("Template with this name already exists, would you like to override it?"))
			return false;
	}
	
	const targetPath = _path.join(__dirname, TEMPLATES_PATH, name);
	
	let remote = false;
	if(isGit(path)){
		remote = true;
		await cloneGitRepository(path, targetPath);
	} else {
		await cloneLocalRepository(path, targetPath);
	}
	
	return await TemplatesRepo.addTemplate({
		name,
		path: targetPath,
		originalPath: path,
		id: generateIdFromName(name),
		description,
		remote,
		creationTimestamp
	});
};

export const cloneGitRepository = async (repoUrl, targetPath) => {
	await fse.remove(targetPath);
	await execShellCommand(`git clone "${repoUrl}" "${targetPath}"`);
	await fse.remove(_path.join(targetPath, "/.git"));
};

export const cloneLocalRepository = async (path, targetPath) => {
	await fse.ensureDir(targetPath);
	await fse.copy(path, targetPath);
	await fse.remove(_path.join(targetPath, "/.git"));
};