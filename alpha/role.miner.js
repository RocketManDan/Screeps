var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    var source = creep.memory.targetSource;
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[source]);
        }
    }    
};

module.exports = roleMiner;