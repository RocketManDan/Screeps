var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < 0.5 * creep.carryCapacity) {
            var droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
	        if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                };
            }
        }
	}
};

module.exports = roleHauler;