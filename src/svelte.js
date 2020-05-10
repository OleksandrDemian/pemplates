import App from './App.svelte';
import {onDrop} from "./utils/dropListener";

document.ondragover = document.ondrop = (ev) => {
	ev.preventDefault();
};

document.body.ondrop = onDrop;

const app = new App({
	target: document.body
});

export default app;