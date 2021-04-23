each([
	"random",
	"wood",
	"stone",
	"fish",
	"whale",
	"chicken",
	"smallmoai",
	"mediummoai",
	"bigmoai",
	"star",

	"breakwhale",
	// "overflowtest", // Not necessary to add passive items to the pool!
	
	//"tocut", "tofish", "tobreed", "tobuild"
], function(i) {
	pools.get("global").drop(i);
});
each([
	"white",
	"deepblack",
	"black",
	"red",
	"blue",
	"deepblue",
	"green",
	"yellow",
	"null"
], function(c) {
	pools.get("global").drop("land-" + c);
});

tracks.get("round").level(0).drop("star", 1);

var div2 = function(i) {
	return Math.floor(i / 2);
};

var grid = grids.get("grid");
var gridSize = Math.min(grid.width(), grid.height());
var halfGridSize = div2(gridSize);
var centerHex = grid.cell(halfGridSize, halfGridSize);

var edgeDrop = function(kind, count, color, distance) {
	var drop = function(hex) {
		if (kind !== null) {
			hex.drop(kind, count);
		}
		if (color !== null) {
			hex.drop("land-" + color, 1);
		}
	};
	var innerGridSize = gridSize - (distance * 2);
	var halfInnerGridSize = div2(innerGridSize);
	var h = centerHex;
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.left();
	});
	drop(h);
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.downRight();
		drop(h);
	});
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.right();
		drop(h);
	});
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.upRight();
		drop(h);
	});
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.upLeft();
		drop(h);
	});
	loop(0, halfInnerGridSize, 1, function(_) {
		h = h.left();
		drop(h);
	});
	loop(0, halfInnerGridSize - 1, 1, function(_) {
		h = h.downLeft();
		drop(h);
	});
};
edgeDrop("fish", 10, "blue", 1);
edgeDrop("whale", undefined, "deepblue", 0);
loop(0, div2(halfGridSize), 1, function(k) {
	edgeDrop(null, 0, "deepblue", -1 - k);
});

edgeDrop("wood", 1, null, 3);
edgeDrop("wood", 3, null, 4);

centerHex.drop("stone");
centerHex.drop("land-white", 1);
centerHex.around().each(function(hex) {
	hex.drop("stone", 1);
});

edgeDrop("chicken", 2, null, 2);
edgeDrop("chicken", 1, null, 3);

/*
var randomDrop = function(n, kind, condition) {
	while (n > 0) {
		var cell = grid.cell(random(grid.width()), random(grid.height()));
		if (condition(cell)) {
			cell.drop(kind, 1);
			n--;
		}
	}
};

randomDrop(30, "chicken", function(cell) {
	return !cell.find("land-blue").exists()
		&& !cell.find("land-deepblue").exists()
		&& !cell.find("land-white").exists()
		&& (cell.count("chicken") < 3);
});
randomDrop(60, "wood", function(cell) {
	return !cell.find("land-blue").exists()
		&& !cell.find("land-deepblue").exists()
		&& !cell.find("land-white").exists()
		&& (cell.count("wood") < 5);
});
*/