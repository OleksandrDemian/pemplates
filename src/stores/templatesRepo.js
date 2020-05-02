import {ARRAY_SETTINGS} from "../settings/settings";
import { writable } from 'svelte/store';

const TEMPLATE_SETTINGS = ARRAY_SETTINGS("templates.json", []);
const { subscribe, set, update } = writable([...TEMPLATE_SETTINGS.get()]);

const addTemplate = async template => {
	TEMPLATE_SETTINGS.push(template);
	TEMPLATE_SETTINGS.write();
	
	update(templates => [...templates, template]);
};

const getTemplate = id => {
	const templates = TEMPLATE_SETTINGS.get();
	
	for(let i = 0; i < templates.length; i++){
		if(templates[i].id === id){
			return templates[i];
		}
	}
	
	return null;
};

const removeTemplate = async (id) => {
	const templates = TEMPLATE_SETTINGS.get();
	
	for(let i = 0; i < templates.length; i++){
		if(templates[i].id === id){
			templates.splice(i, 1);
			TEMPLATE_SETTINGS.set(templates);
			TEMPLATE_SETTINGS.write();
			set(templates);
			
			return true;
		}
	}
	
	return false;
};

export default {
	subscribe,
	addTemplate,
	getTemplate,
	removeTemplate
}