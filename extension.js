// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const axios = require('axios');
const vscode = require('vscode');
const xmlParser = require('fast-xml-parser');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
 async function activate(context) {
 
	const res = await axios.get("https://www.youtube.com/feeds/videos.xml?channel_id=UCWOA1ZGywLbqmigxE4Qlvuw");
 
	const videos = xmlParser.parse(res.data).feed.entry.map
	(video => {
		return {
			label: video.title,
			link: "https://www.youtube.com/watch?v="+video.id.split(":")[2]
		}
	});
 
	let disposable = vscode.commands.registerCommand('youtube-search.searchYouTubeExample',
		// The code you place here will be executed every time your command is executed
		async function() {
			const video = await vscode.window.showQuickPick(videos,{
				matchOnDetail:true
		})
		if(video == null) return
		vscode.env.openExternal(video.link);
	});
 
	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
