import {writable} from 'svelte/store';
import {ARRAY_SETTINGS} from "src/settings/settings";

const PROJECTS_SETTINGS = ARRAY_SETTINGS("projects.json", []);
const { subscribe, set, update } = writable([...PROJECTS_SETTINGS.get()]);

const addProject = async project => {
	PROJECTS_SETTINGS.push(project);
	PROJECTS_SETTINGS.write();
	
	update(projects => [...projects, project]);
};

const getProject = id => {
	const projects = PROJECTS_SETTINGS.get();
	
	for(let i = 0; i < projects.length; i++){
		if(projects[i].id === id){
			return projects[i];
		}
	}
	
	return null;
};

const removeProject = async (id) => {
	const projects = PROJECTS_SETTINGS.get();
	
	for(let i = 0; i < projects.length; i++){
		if(projects[i].id === id){
			projects.splice(i, 1);
			PROJECTS_SETTINGS.set(projects);
			PROJECTS_SETTINGS.write();
			
			set(projects);
			
			return true;
		}
	}
	
	return false;
};

const has = (name) => {
	const projects = PROJECTS_SETTINGS.get();
	
	for(let i = 0; i < projects.length; i++){
		if(projects[i].name === name){
			return true;
		}
	}
	
	return false;
};

export default {
	subscribe,
	addProject,
	getProject,
	has,
	removeProject
}