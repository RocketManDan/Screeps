var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
	    

	    if(creep.memory.building) {
    	    var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits <= 0.25 * structure.hitsMax)
            });
            if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedStructure);
            }
	        
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
	    else {
	        var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
	        if(droppedEnergy.length == 0){
                var sources = creep.room.find(FIND_SOURCES);
	            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
	        } else {
    	        if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedEnergy);
                }
	        }
	    }
	}
};

module.exports = roleBuilder;