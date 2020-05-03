import {ARRAY_SETTINGS} from "../settings/settings";
import {writable} from 'svelte/store';

const EDITORS_SETTINGS = ARRAY_SETTINGS("editors.json", []);
const { subscribe, set, update } = writable([...EDITORS_SETTINGS.get()]);

const addEditor = async editor => {
	EDITORS_SETTINGS.push(editor);
	EDITORS_SETTINGS.write();
	
	update(editors => [...editors, editor]);
};

const getEditor = id => {
	const projects = EDITORS_SETTINGS.get();
	
	for(let i = 0; i < projects.length; i++){
		if(projects[i].id === id){
			return projects[i];
		}
	}
	
	return null;
};

const removeEditor = async (id) => {
	const editors = EDITORS_SETTINGS.get();
	
	for(let i = 0; i < editors.length; i++){
		if(editors[i].id === id){
			editors.splice(i, 1);
			EDITORS_SETTINGS.set(editors);
			EDITORS_SETTINGS.write();
			set(editors);
			
			return true;
		}
	}
	
	return false;
};

//public methods
export default {
	subscribe,
	addEditor,
	getEditor,
	removeEditor
}