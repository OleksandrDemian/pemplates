import {childProcess} from "src/requires";

export const createRepository = async ({ name, authToken }) => {
	return fetch("https://api.github.com/user/repos", {
		method: "POST",
		headers: {
			"Authorization": "Token " + authToken,
		},
		body: JSON.stringify({
			name,
			is_template: true,
			private: false
		})
	});
};

export const pushRepository = async ({ repoUrl, cwd }) => {
	const options = { cwd };
	
	childProcess.execSync("git init", options);
	childProcess.execSync("git add .", options);
	childProcess.execSync('git commit -m "Create template"', options);
	//todo: sh is not a ...bla bla -> added Git\Bin to PATH
	childProcess.execSync("git push --set-upstream " + repoUrl + " master", options);
	return true;
};