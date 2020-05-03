import TemplatesRepo from "../stores/templatesRepo";
import ProjectsRepo from "../stores/projectsRepo";
import {generateIdFromName} from "./utils";
import {_path, fse} from "../requires";

const TEMPLATES_PATH = "/.Pemplates/templates/";
const PROJECTS_PATH = "/.Pemplates/projects/";

export const removeProject = ({ path }) => {
	fse.removeSync(path);
};

export const createProjectFromTemplate = async ({ name, templateId, description }) => {
	if(ProjectsRepo.has(name)){
		if(!confirm("Project with this name already exists, would you like to override it?"))
			return false;
	}
	
	const template = TemplatesRepo.getTemplate(templateId);
	const targetPath = _path.join(__dirname, PROJECTS_PATH, name);
	const srcPath = _path.join(__dirname, TEMPLATES_PATH, template.name);
	
	await fse.ensureDir(targetPath);
	await fse.copy(srcPath, targetPath);
	
	const project = {
		path: targetPath,
		name: name,
		description,
		id: generateIdFromName(template.name),
		templateId: templateId,
		editorId: null
	};
	
	await ProjectsRepo.addProject(project);
	return project;
};