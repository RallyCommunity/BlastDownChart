var ScriptRunner = require('../../src/scripting/ScriptRunner');

describe('ScriptRunner', function() {
	var handler, script, scriptRunner;

	beforeEach(function() {
		script = [{
			at: 1,
			event: 'foo',
			args: 'args'
		}];

		handler = {
			foo: function() {},
			bar: function() {}
		};

		scriptRunner = new ScriptRunner(script, handler);
	});

	it('should not run an event if not enough time has passed', function() {
		spyOn(handler, 'foo');
		scriptRunner.update(0.2);

		expect(handler.foo).not.toHaveBeenCalled();
	});

	it('should run the event in the script when enough time passes', function() {
		spyOn(handler, 'foo');

		scriptRunner.update(1);
		expect(handler.foo).toHaveBeenCalledWith(script[0].args);
		expect(script[0].invoked).toBe(true);
	});

	it('should run all valid events that have not yet ran', function() {
		script.push({
			at: 3,
			event: 'bar'
		});

		spyOn(handler, 'foo');
		spyOn(handler, 'bar');

		scriptRunner.update(4);

		expect(handler.foo.callCount).toBe(1);
		expect(handler.bar.callCount).toBe(1);
	});
});

