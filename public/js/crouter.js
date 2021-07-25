function sleep(ms) {
	return new Promise(resolveFunc => setTimeout(resolveFunc, ms));
}
var socket = false;
loadURL = url => {
	if (url == 'nIndex') {
		window.history.pushState(`Mint`, `Mint`, `/`);
		document.getElementById('title').innerText = `Mint`;
	} else {
		window.history.pushState(`Mint`, `Mint`, `/${url}`);
		document.getElementById('title').innerText = `Mint - ${url}`;
	}
	loadPage(`./app/${url}.html`);
};

loadPage = async url => {
	document.getElementById('load_indicator').style.visibility = 'visible';
	document.getElementById('load_indicator').style.opacity = '1';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = async function() {
		if (this.readyState == 4) {
			document.getElementById('content').innerHTML = this.responseText;
			initChartDash();
			try {
				//if(!socket){
				beginConnection();
				//socket = true
				//}
			} catch (e) {
				console.log('A small error, nothing much.');
			}

			await sleep(300);
			document.getElementById(
				'load_indicator'
			).style = `--progress: 0%; visibility: hidden; width: 100%; position: fixed; top: 56px`;
		}
	};
	xmlhttp.onprogress = async function(event) {
		prg = (event.loaded / event.total) * 100;
		document.getElementById(
			'load_indicator'
		).style = `--progress: ${prg}%; visibility: visible; width: 100%; position: fixed; top: 56px; opacity: 1`;
	};

	await xmlhttp.open('GET', url, true);
	await xmlhttp.send();
};

loadPage('./app/<%= page %>.html');
if ('<%= page %>' == 'app/nIndex') {
	document.getElementById('title').innerText = `Mint`;
} else {
	document.getElementById('title').innerText = `Mint - ${'<%= page %>'.replace(
		'/app/'
	)}`;
}
