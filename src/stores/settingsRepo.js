import {SETTINGS as _SETTINGS} from "src/settings/settings";

const SETTINGS = _SETTINGS("settings.json", {
	githubToken: null
});

const setGithubToken = (gitToken) => {
	SETTINGS.setProp("githubToken", gitToken);
	SETTINGS.write();
};

const getGithubToken = () => {
	return SETTINGS.getProp("githubToken");
};

export default {
	setGithubToken,
	getGithubToken
}