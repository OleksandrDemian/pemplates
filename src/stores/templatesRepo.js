import {ARRAY_SETTINGS} from "../settings/settings";
import {writable} from 'svelte/store';

const TEMPLATE_SETTINGS = ARRAY_SETTINGS("templates.json", []);
const { subscribe, set, update } = writable([...TEMPLATE_SETTINGS.get()]);

const addTemplate = async template => {
	TEMPLATE_SETTINGS.push(template);
	await TEMPLATE_SETTINGS.write();
	
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
			await TEMPLATE_SETTINGS.write();
			set(templates);
			
			return true;
		}
	}
	
	return false;
};

const updateTemplate = async (id, data) => {
	const templates = TEMPLATE_SETTINGS.get();
	
	for(let i = 0; i < templates.length; i++){
		if(templates[i].id === id){
			templates[i] = data;
			TEMPLATE_SETTINGS.set(templates);
			await TEMPLATE_SETTINGS.write();
			set(templates);
			
			return true;
		}
	}
	
	return false;
};

const has = (name) => {
	const templates = TEMPLATE_SETTINGS.get();
	
	for(let i = 0; i < templates.length; i++){
		if(templates[i].name === name){
			return true;
		}
	}
	
	return false;
};

export default {
	subscribe,
	addTemplate,
	getTemplate,
	updateTemplate,
	removeTemplate,
	has
}