import { notify } from "power-notifier";
import TemplatesRepo from "../stores/templatesRepo";
import {generateIdFromName} from "./utils";
import {childProcess, fse, _path} from "../requires";

const TEMPLATES_PATH = "/.Pemplates/templates/";

const isGit = str => {
	return str.match(/(.*).git$/);
};

export const removeTemplate = ({ path }) => {
	fse.removeSync(path);
};

export const createTemplate = async ({name, path, description}) => {
	if(TemplatesRepo.has(name)){
		if(!confirm("Template with this name already exists, would you like to override it?"))
			return false;
	}
	try {
		const targetPath = _path.join(__dirname, TEMPLATES_PATH, name);
		
		let remote = false;
		if(isGit(path)){
			remote = true;
			await childProcess.execSync(`git clone "${path}" "${targetPath}"`);
		} else {
			await fse.ensureDirSync(targetPath);
			await fse.copySync(path, targetPath);
		}
		
		//remove git integration
		await fse.removeSync(_path.join(targetPath, "/.git"));
		
		await TemplatesRepo.addTemplate({
			name,
			path: targetPath,
			originalPath: path,
			id: generateIdFromName(name),
			description,
			remote
		});
		
		notify({
			title: "Tempalte created successfully",
			timeout: 2500
		});
	} catch (e) {
		console.error(e);
		notify({
			title: "Error",
			applyStyle: "error",
			timeout: 2500
		});
	}
};