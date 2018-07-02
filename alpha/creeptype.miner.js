/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creeptype.miner');
 * mod.thing == 'a thing'; // true
 */
 
var Miner = {
	role: 'miner';
	targetSource: undefined;
	miningLocation: undefined;
	
	/** @param {Creep} creep **/
    mine: function() {
	    var source = Game.getObjectById(this.targetSource);
        if(this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(this.miningLocation);
        }
    }
	
	
}

Miner.prototype = Object.create(Creep);
 

module.exports = {

};