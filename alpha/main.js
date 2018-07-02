// Hello World

//var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleHauler = require('role.hauler');
var roleFighter = require('role.fighter');

module.exports.loop = function () {
    
        for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    if(Game.time%10 == 0){
        console.log('Miners: ' + miners.length);
        console.log('Haulers: ' + haulers.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Builders: ' + builders.length);
        console.log('Fighters: ' + fighters.length);
    }

    if(miners.length < 7 ) {
        var numSources = Game.spawns['Spawn1'].room.find(FIND_SOURCES).length;
        var randSource = Math.floor(Math.random() * numSources);
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,MOVE], undefined, {role: 'miner', targetSource: randSource});
        console.log('Spawning new miner: ' + newName);
    }
    if(haulers.length < 5 ) {
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'hauler'});
        console.log('Spawning new hauler: ' + newName);
    }
    if(upgraders.length < 4 ) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    if(builders.length < 12) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
        console.log('Spawning new builder: ' + newName);
    }
    if(fighters.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,ATTACK,ATTACK,ATTACK,MOVE,MOVE], undefined, {role: 'fighter'});
        console.log('Spawning new fighter: ' + newName);
    }
    
    var tower = Game.getObjectById('5739d32dc983883c55146529');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        /*if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }*/
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }else if(creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        }
    }
}