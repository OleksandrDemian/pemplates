import {childProcess} from "../requires";

export const createRepository = ({ name, authToken, description }) => {
	return fetch(`https://api.github.com/user/repos`, {
		method: "POST",
		headers: {
			"Authorization": "Token " + authToken,
		},
		body: JSON.stringify({
			name,
			is_template: true,
			private: false,
			description
		})
	});
};

export const updateTopics = ({ owner, repo, authToken }) => {
	///repos/:owner/:repo/topics -> :owner/:repo = data.full_name
	return fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
		method: "PUT",
		headers: {
			"Authorization": "Token " + authToken,
			// Repository topics on GitHub are currently available for developers to preview
			// To use this endpoint, you must provide a custom media type in the Accept header:
			// application/vnd.github.mercy-preview+json
			"Accept": "application/vnd.github.mercy-preview+json"
		},
		body: JSON.stringify({
			names: [ "template", "pemplates", "boilerplate", "starter-kit", ]
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