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
    constructor(name, id, attributes) {
        super(name, id),
            this.attributes = attributes;
    }
}
exports.Batter = Batter;
class Pitcher extends Player {
    constructor(name, id, attributes) {
        super(name, id);
        this.attributes = attributes;
    }
}
exports.Pitcher = Pitcher;
