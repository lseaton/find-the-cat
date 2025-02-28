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

function hideCat() {
	//Hides a random cat photo behind the tiles on the grid
	let cat = document.createElement("img");
	cat.src = getRandomCatImg();
	cat.style.width = "100px";
	//Position cat in a random place within the drawing area
	cat.style.position = "absolute";
	cat.style.margin = "50px 0 0 -150px";

	let grid = document.getElementById("grid");
	let parentDiv = grid.parentNode;
	parentDiv.insertBefore(cat, grid);
}
hideCat();
populateGrid(gridSize);
