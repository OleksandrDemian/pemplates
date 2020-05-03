import {childProcess} from "../requires";

export const execShellCommand = (cmd) => {
	return new Promise((resolve, reject) => {
		childProcess.exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
				reject(error);
			}
			resolve(stdout? stdout : stderr);
		});
	});
};