import {notify} from "power-notifier";
import TemplatesRepo from "../stores/templatesRepo";
import ProjectsRepo from "../stores/projectsRepo";
import {generateIdFromName} from "./utils";
import {_path, fse} from "../requires";

const TEMPLATES_PATH = "/.Pemplates/templates/";
const PROJECTS_PATH = "/.Pemplates/projects/";

export const removeProject = ({ path }) => {
	fse.removeSync(path);
};

export const createProjectFromTemplate = async ({ name, id }) => {
	if(ProjectsRepo.has(name)){
		if(!confirm("Project with this name already exists, would you like to override it?"))
			return false;
	}
	
	const template = TemplatesRepo.getTemplate(id);
	//todo: projects with same names will be overridden
	const targetPath = _path.join(__dirname, PROJECTS_PATH, name);
	const srcPath = _path.join(__dirname, TEMPLATES_PATH, template.name);
	
	await fse.ensureDirSync(targetPath);
	await fse.copySync(srcPath, targetPath);
	
	const project = {
		path: targetPath,
		name: name,
		id: generateIdFromName(template.name),
		templateId: id
	};
	
	await ProjectsRepo.addProject(project);
	
	notify({
		title: "New project created",
		timeout: 2500
	});

	return project;
};