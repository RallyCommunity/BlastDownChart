/*
 * ScriptRunner
 * -----
 * A simple class that invokes events in its script after
 * the proper amount of time has elapsed
 */

function ScriptRunner(script, handlers) {
	this._script = script;
	this._handlers = handlers;
	
	this._elapsed = 0;
}

ScriptRunner.prototype = {
	_getNextEvent: function() {
		for (var i = 0; i < this._script.length; ++i) {
			var entry = this._script[i];

			if (!entry.invoked && entry.at <= this._elapsed) {
				return entry;
			} else if (entry.at > this._elapsed) {
				break;
			}
		}
	},

	_doEvent: function(event) {
		this._handlers[event.event].call(this._handlers, event.args);
		event.invoked = true;
	},


	update: function(dt) {
		this._elapsed += dt;

		var event = this._getNextEvent();

		while(event) {
			this._doEvent(event);
			event = this._getNextEvent();
		}
	}
};

module.exports = ScriptRunner;

