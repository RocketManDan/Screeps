////////////////////////////
// Creep
var Creep = function(creep, room) {
    this.creep = creep;
    this.room = room;
    this.name = creep.name;
    this.id = creep.id;
};

module.exports = Creep;

Creep.prototype = {
    tick: function() {
        console.log("Base class implementation of tick(), should never happen.");
    },

    getRole: function() {
        return this.creep.memory.role;
    }
};

////////////////////////////
// Miner
// var Creep = require("Creep");

var Miner = function(creep, room) {
    this.base = Creep;
    this.base(creep, room);
    //Creep.call(this, creep, room);
};

module.exports = Miner;

Miner.prototype = Object.create(Creep.prototype);

Miner.prototype.tick = function() {
    var creep = this.creep;

    if (creep.memory.activity === undefined || creep.memory.activity === "") {
        var target = creep.pos.findNearest(Game.SOURCES_ACTIVE);
        this.mine(creep, target);
    }

    var act = creep.memory.activity;
    if (act == "mine") {
        var target = this.getTarget(creep);
        if (target !== undefined) {
            if (creep.energy < creep.energyCapacity) {
                creep.moveTo(target);
                creep.harvest(target);
            } else {
                console.log("Write dump to truck code");
                /*var trucks = find.transporterInRange(creep, 1);
                if (trucks.length)  {
                    creep.moveTo(trucks[0]);
                    var amount = trucks[0].energyCapacity - trucks[0].energy;
                    creep.transferEnergy(trucks[0], amount);
                }*/
            }
        }
    }
};

Miner.prototype.mine = function(creep, target) {
    creep.memory.target = target.id;
    creep.memory.activity = "mine";        
};

Miner.prototype.getTarget = function(creep) {
    return Game.getObjectById(creep.memory.target);
};

////////////////////////////
// Transporter
//var Creep = require("Creep");

var Transporter = function(creep, room) {
  Creep.call(this, creep, room);
};

module.exports = Transporter;

Transporter.prototype = Object.create(Creep.prototype);

Transporter.prototype.tick = function() {
  var creep = this.creep;
    if (creep.energy < creep.energyCapacity) {
        var miner = this.room.findByRole(creep, "miner");
        console.log(miner);
        if (miner !== null) {
            //console.log(miner[0].name);
            //creep.moveTo(miner);

        } else
            console.log("no miners found");
    } else {
        console.log("moving to drop");
        //var drop = find.nearestEnergyDropOff(creep);
        //creep.moveTo(drop);
        //creep.transferEnergy(drop);
    }
};