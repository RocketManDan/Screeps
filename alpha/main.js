var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var roles = ['harvester', 'builder', 'upgrader'];
//var jobs  = [roleHarvester, roleUpgrader, roleBuilder];
var jobs['harvester'] = roleHarvester;
    jobs['builder'] = roleUpgrader;
    jobs['upgrader'] = roleBuilder;
var nDesCreepsInRole['harvester'] = 3;
    nDesCreepsInRole['builder'] = 2;
    nDesCreepsInRole['upgrader'] = 3;
var rolesNum['harvester'] = 0;
    rolesNum['builder'] = 1;
    rolesNum['upgrader'] = 2;

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
		for(var roleName in roles){
			nCreepsInRole[roleName] = _.filter(Game.creeps, (creep) => creep.memory.role == roleName).length;
		
			if (nCreeps[roleName] == 0) {
				Game.spawns['Spawn1'].spawnCreep(jobs[roleName].body, newName, 
				{memory: {role: roleName}});
				break;
			}
		}
	}
	
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'ðŸ› ï¸' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
	
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
		jobs[creep.memory.role].run(creep);
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