//Scratch pad - everything starts black, reveals background (popsocket-style) image as you go. You can scratch it all off or make rainbow drawings
let gridSize = 35;
function populateGrid(size) {
	for (let i = 0; i < size * size; i++) {
		let d = document.createElement("div");
		d.className = "tile";
		d.id = "tile" + i.toString(); //unique ID
		d.style.width = 560 / size.toString() + "px";
		d.style.height = 560 / size.toString() + "px";
		d.addEventListener("mouseover", revealColor);
		document.getElementById("grid").appendChild(d);
	}
}

function revealColor(e) {
	let tile = document.getElementById(e.target.id);
	tile.style.background = "transparent";
}

function getRandomCatImg() {
	//There are five cat images in cats folder
	return "./img/cats/cat-" + (Math.floor(Math.random() * 5) + 1) + ".jpg";
}

//Hides a random cat photo behind the tiles on the grid
function hideCat() {
	let cat = document.createElement("img");
	cat.id = "catImg";
	cat.src = getRandomCatImg();
	cat.style.width = "100px";
	cat.style.position = "absolute";

	//Insert cat + reorder nodes so that cat picture is behind grid and in front of background
	let grid = document.getElementById("grid");
	let parentDiv = grid.parentNode;
	parentDiv.insertBefore(cat, grid);

	//Give the image random margins within the drawing area
	//Given a width of 100px, only one cat image has a height of 130 - number 4. Every other image has a height of 70.
	let height = 70;
	if (cat.src.indexOf("4") > -1) {
		height = 130;
	}
	let randomX = Math.floor(Math.random() * 461) - 565;
	let randomY = Math.floor(Math.random() * (491 - height)) + 5;
	let marginStr = randomY.toString() + "px 0 0 " + randomX.toString() + "px";
	cat.style.margin = marginStr;
}
hideCat();
populateGrid(gridSize);
