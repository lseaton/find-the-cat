let grid = document.getElementById("grid");
let catXPos = -1;
let catYPos = -1;
let catHeight = -1;
let catWidth = -1;

populateGrid(16, true); //default
document.getElementById("drawing-area").addEventListener("click", checkClick);

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
		//add text over grid that says "free the cat!" and gives instructions, which disappears when mouse enters the grid"
	}
}

function revealColor(e) {
	let tile = document.getElementById(e.target.id);
	tile.style.background = "transparent";
}

function showSettings() {
	document.getElementById("settings").style.visibility = "visible";
}

//Removes current grid and generates new grid given certain settings
function reset() {
	//Hide settings menu
	document.getElementById("settings").style.visibility = "hidden";
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
	let rect2 = catImg.getBoundingClientRect();
	let tiles = grid.children;

	for (let i = 0; i < tiles.length; i++) {
		let rect1 = tiles[i].getBoundingClientRect();
		if (
			getComputedStyle(tiles[i]).background !=
			"rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
		) {
			if (
				rect1.left <= rect2.right &&
				rect1.right >= rect2.left &&
				rect1.top <= rect2.bottom &&
				rect1.bottom >= rect2.top
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
			alertMessage += checkForTilesCovering()
				? "but she's still dirty!"
				: "and she's nice and clean!\nฅ^•ﻌ•^ฅ";
			alert(alertMessage);
		}
	}
}
