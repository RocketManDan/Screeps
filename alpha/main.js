var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roles = ['harvester', 'builder', 'upgrader'];
var jobs  = [roleHarvester, roleUpgrader, roleBuilder];
var nDesCreepsInRole['harvester'] = 3;
var nDesCreepsInRole['builder'] = 3;
var nDesCreepsInRole['upgrader'] = 2;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	
	var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER)
	for(var tower in towers){
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
	}
	
	if(Game.time %10 == 0 && !Game.spawns['Spawn1'].spawning){
		for(var role in roles){
			nCreepsInRole[role] = _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
		
			if (nCreeps[role] == 0) {
				Game.spawns['Spawn1'].spawnCreep(jobs[roles[role]].body, newName, 
				{memory: {role: role}});
				break;
			}
		}
	}
	
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		jobs[roles[creep.memory.role]].run(creep);
		// switch: creep.memory.role {
			// case 0
				// roleharvester.run(creep);
				// break;
			// case 1
				// roleupgrader.run(creep);
				// break;
			// case 2
				// jobs[.run(creep);
				// break;
		// }
    }
}