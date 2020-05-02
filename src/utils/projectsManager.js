import { notify } from "power-notifier";
import TemplatesRepo from "../stores/templatesRepo";
import {generateIdFromName} from "./utils";
import {childProcess, fse, _path} from "../requires";

const TEMPLATES_PATH = "/.Pemplates/templates/";
const PROJECTS_PATH = "/.Pemplates/projects/";

export const removeProject = ({ path }) => {
	fse.removeSync(path);
};

export const createProjectFromTemplate = async ({ id }) => {
	const template = TemplatesRepo.getTemplate(id);
	//todo: projects with same names will be overridden
	const targetPath = _path.join(__dirname, PROJECTS_PATH, template.name);
	const srcPath = _path.join(__dirname, TEMPLATES_PATH, template.name);
	
	await fse.ensureDirSync(targetPath);
	await fse.copySync(srcPath, targetPath);
	
	notify({
		title: "New project created",
		timeout: 2500
	});
	
	const project = {
		path: targetPath,
		name: template.name,
		id: generateIdFromName(template.name),
		templateId: id
	};
	
	return project;
};