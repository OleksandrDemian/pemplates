import templates from "../stores/templatesRepo";

const listeners = [];

export const addListener = l => {
	if(!listeners.includes(l)){
		listeners.push(l);
	}
};

export const removeListener = l => {
	const position = listeners.indexOf(l);
	if(l >= 0){
		listeners.splice(position, 1);
	}
};

export const onDrop = async e => {
	console.log(e.dataTransfer.files[0].path);
	const path = e.dataTransfer.files[0].path;
	//todo: works only for windows
	const name = path.split("\\").pop();
	e.preventDefault();
	
	listeners.forEach(l => {
		l({ name, path });
	});
};