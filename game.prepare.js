global.createPlayers = function(pools, tracks, count) {
	Utils.loop(0, count, 1, function(i) {
		pools.create("player-banks", "bank-player" + i, { /* layout: "vertical" */ }, true);
		var bank = pools.get("bank-player" + i);
		bank.drop("live", 1);
		bank.drop("playername");
		bank.drop("land-player" + i);
		bank.drop("cube-player" + i);
		bank.drop("overlay-village-player" + i);
		bank.drop("meeple-player" + i, 5);

		pools.get("global").drop("meeple-player" + i);

		tracks.get("score").level(0).drop("cube-player" + i, 1);

		var moral = tracks.get("moral");
		moral.level(moral.size() - 1).drop("cube-player" + i, 1);

		if (i === 0) {
			bank.drop("first", 1);
		}
	});
};

global.destroySetup = function(here) {
	here.items().each(function(i) {
		if (i.kind.startsWith("setup_")) {
			here.destroy(i.kind);
		}
	});
};
