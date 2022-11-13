"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pitcher = exports.Batter = exports.Player = void 0;
class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
exports.Player = Player;
class Batter extends Player {
    constructor(name, id, stats) {
        super(name, id),
            this.stats = stats;
    }
}
exports.Batter = Batter;
class Pitcher extends Player {
    constructor(name, id, stats) {
        super(name, id);
        this.stats = stats;
    }
}
exports.Pitcher = Pitcher;
