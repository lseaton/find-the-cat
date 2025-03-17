//TODO: Add text over the grid in beginning outside functions that says "find the hidden cat and click on her!" which disappears when the mouse enters the grid
//TODO: Bug on firefox: There are still some populateGrid problems when size is near the maximum value allowed, leaving gaps
let grid = document.getElementById("grid");
let catXPos = -1;
let catYPos = -1;
let catHeight = -1;
let catWidth = -1;

populateGrid(16, true); //default
grid.addEventListener("click", checkClick);

function populateGrid(size, isCatMode) {
	for (let i = 0; i < size * size; i++) {
		let d = document.createElement("div");
		d.className = "tile";
		d.id = "tile" + i.toString(); //unique ID
		d.style.width = (100 / size).toString() + "%";
		d.style.height = (100 / size).toString() + "%";
		/*d.style.width = tileWidth.toString() + "px";
		d.style.height = tileHeight.toString() + "px";*/
		d.addEventListener("mouseover", revealColor);
		grid.appendChild(d);
	}
	if (isCatMode) {
		document.title = "Find the Cat";
		hideCat();
		//Add free the cat text
	} else {
		document.title = "Sketchpad";
	}
}

function revealColor(e) {
	let tile = document.getElementById(e.target.id);
	tile.style.background = "transparent";
}

function showSettings() {
	document.getElementById("settings").style.visibility = "visible";
}
function hideSettings() {
	document.getElementById("settings").style.visibility = "hidden";
}

//Removes current grid and generates new grid given certain settings
function reset() {
	hideSettings();
	//Remove tiles
	while (grid.firstChild) {
		grid.removeChild(grid.lastChild);
	}
	//Remove cat image
	let catImg = document.getElementById("cat-img");
	if (catImg != null) {
		catImg.parentNode.removeChild(catImg);
	}
	//Reset catPos
	catXPos = -1;
	catYPos = -1;
	//Repopulate the grid with user-provided settings
	populateGrid(
		document.getElementById("pixel-size").value,
		document.getElementById("cat-mode").checked
	);
}

function getRandomCatImg() {
	//There are five cat images in cats folder
	return "./img/cats/cat-" + (Math.floor(Math.random() * 5) + 1) + ".jpg";
}

//Hides a random cat photo behind the tiles on the grid
function hideCat() {
	let cat = document.createElement("img");
	cat.id = "cat-img";
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

function isAtop(obj1, obj2) {
	let rect = obj2.getBoundingClientRect();
	return (
		obj1.clientX >= rect.left &&
		obj1.clientX <= rect.right &&
		obj1.clientY >= rect.top &&
		obj1.clientY <= rect.bottom
	);
}

//Checks if there are any black tiles covering the cat image still
function checkForTilesCovering() {
	let catImg = document.getElementById("cat-img");
	let rectCat = catImg.getBoundingClientRect();
	let tiles = grid.children;

	for (let i = 0; i < tiles.length; i++) {
		let rectTile = tiles[i].getBoundingClientRect();
		let tileBackground = window
			.getComputedStyle(tiles[i], null)
			.getPropertyValue("background-color");
		if (tileBackground != "rgba(0, 0, 0, 0)") {
			if (
				rectTile.left <= rectCat.right &&
				rectTile.right >= rectCat.left &&
				rectTile.top <= rectCat.bottom &&
				rectTile.bottom >= rectCat.top
			) {
				return true;
			}
		}
	}
	return false;
}

//Checks if a cat is under where they are clicking
function checkClick(event) {
	let alertMessage = "";
	let catImg = document.getElementById("cat-img");
	if (catImg != null) {
		if (isAtop(event, catImg)) {
			alertMessage += "You found the cat, ";
			let isDirty = checkForTilesCovering();
			alertMessage += isDirty
				? "but she's still dirty!"
				: "and she's nice and clean!\nฅ^•ﻌ•^ฅ";
			alert(alertMessage);
		}
	}
}
