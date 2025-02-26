//Scratch pad - everything starts black, reveals background (popsocket-style) image as you go. You can scratch it all off or make rainbow drawings
let gridSize = 36;
function populateGrid(size) {
	for (let i = 0; i < size * size; i++) {
		//will be 256 instead of 50 for 16x16 grid
		let d = document.createElement("div");
		d.className = "tile";
		d.style.width = 560 / size.toString() + "px";
		d.style.height = 560 / size.toString() + "px";
		document.getElementById("grid").appendChild(d);
	}
}

populateGrid(gridSize);
