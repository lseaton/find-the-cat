//TODO: If the cat is found and clicked, draw new grid
//Remember to set catXPos to -1 again if it's a non-cat new grid
//TODO: detect if user clicked the cat's area (on grid)

let grid = document.getElementById("grid");
let gridSize = 16;
let catXPos = -1;
let catYPos = -1;
let catHeight = -1;
let catWidth = -1;

populateGrid(gridSize, false); //default

function populateGrid(size, isCatMode) {
	for (let i = 0; i < size * size; i++) {
		let d = document.createElement("div");
		d.className = "tile";
		d.id = "tile" + i.toString(); //unique ID
		d.style.width = grid.getBoundingClientRect().width / size.toString() + "px";
		d.style.height =
			grid.getBoundingClientRect().height / size.toString() + "px";
		d.addEventListener("mouseover", revealColor);
		document.getElementById("grid").appendChild(d);
	}
	if (isCatMode) {
		hideCat();
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
	let parentDiv = grid.parentNode;
	parentDiv.insertBefore(cat, grid);

	//Give the image random margins within the drawing area
	catWidth = 100;
	//Given a width of 100px, only one cat image has a height of 130 - number 4. Every other image has a height of 70.
	catHeight = 70;
	if (cat.src.indexOf("4") > -1) {
		catHeight = 130;
	}
	catXPos = Math.floor(Math.random() * 461) - 565;
	catYPos = Math.floor(Math.random() * (491 - catHeight)) + 5;
	let marginStr = catYPos.toString() + "px 0 0 " + catXPos.toString() + "px";
	cat.style.margin = marginStr;
}

function foundCat() {
	prompt("You found the cat!");
}

function showSettings() {
	document.getElementById("settings").style.visibility = "visible";
}

//Removes current grid and generates new grid given certain settings
function goButton() {
	//Hide settings menu
	document.getElementById("settings").style.visibility = "hidden";
	//Remove tiles
	while (grid.firstChild) {
		grid.removeChild(grid.lastChild);
	}
	//Remove cat image
	let catImg = document.querySelector("catImg");
	if (catImg != null) {
		catImg.parentNode.removeChild(catImg);
	}
	//Repopulate the grid with user-provided settings
	populateGrid(
		document.getElementById("pixel-size").value,
		document.getElementById("cat-mode").checked
	);
}
