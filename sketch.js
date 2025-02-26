//Scratch pad - everything starts black, reveals background (popsocket-style) image as you go. You can scratch it all off or make rainbow drawings
let gridSize = 36;
function populateGrid(size) {
	for (let i = 0; i < gridSize * gridSize; i++) {
		//will be 256 instead of 50 for 16x16 grid
		let d = document.createElement("div");
		d.style.borderRadius = "10%";
		d.style.width = 560 / gridSize.toString() + "px";
		d.style.height = 560 / gridSize.toString() + "px";
		d.style.background = "black";
		document.getElementById("grid").appendChild(d);
	}
}

populateGrid(gridSize);
