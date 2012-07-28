var cocos = require('cocos2d');
var Node = cocos.nodes.Node;

var _ = require('../util/underscore-min');
var Vector = require('../geometry/Vector');
var Random = require('../util/Random');
var Angles = require('../util/Angles');

function random11() {
	return Random.rand(-1, 1, true);
}

function ParticleSystem(config) {
	ParticleSystem.superclass.constructor.call(this);

	if(!config.particleTypes && config.particleType) {
		config.particleTypes = [config.particleType];
	}

	_.extend(this, config);

	for (var i = 0; i < this.totalParticles; ++i) {
		var particle = this._createParticle();
		this.addChild(particle);
	}

	this._elapsed = 0;
	this._emitCounter = 0;
	this._particleIndex = 0;
	this._particleCount = 0;
	this.active = this.active || false;

	this.scheduleUpdate();
}

ParticleSystem.inherit(Node, {
	_createParticle: function() {
		var rand = Random.rand(0, this.particleTypes.length);

		return new this.particleTypes[rand];
	},

	_isFull: function() {
		return this._particleCount === this.totalParticles;
	},

	reset: function() {
		this._particleCount = 0;
		this._particleIndex = 0;
	},

	_initParticle: function(particle) {
		// position
		particle.rx = this.position.x + this.posVar.x * random11();
		particle.ry = this.position.y + this.posVar.y * random11();

		// direction
		var a = Angles.degreesToRadians(this.angle + this.angleVar * random11());
		var v = new Vector(Math.cos(a), Math.sin(a));
		var s = this.speed + this.speedVar * random11();
		v = v.multiply(s);
		particle.dir = {
			x: v.x,
			y: v.y
		};

		// radial accel
		particle.radialAccel = this.radialAccel + this.radialAccelVar * random11();

		if (!!particle.radialAccel) {
			particle.radialAccel = 0;
		}

		// tangential accel
		particle.tangentialAccel = this.tangentialAccel + this.tangentialAccelVar * random11();
		if (!particle.tangentialAccel) {
			particle.tangentialAccel = 0;
		}

		// life
		var life = this.life + this.lifeVar * random11();
		particle.life = Math.max(0, life);

		// TODO: handle scaling
		//if (!_.isUndefined(this.startSize)) {
			//var startSize = this.startSize + this.startSizeVar * random11();
			//startSize = Math.max(0, startSize);
			//particle.size = startSize;
			//if (!_.isUndefined(this.endSize)) {
				//var endSize = this.endSize + this.endSizeVar * random11();
				//particle.deltaSize = (endSize - startSize) / particle.life;
			//} else {
				//particle.deltaSize = 0;
			//}
		//} else {
			particle.size = 1;
			particle.deltaSize = 0;
		//}
	},

		_addParticle: function() {
			if (this._isFull()) {
				return false;
			}

			var p = this.children[this._particleCount];
			this._initParticle(p); 
			++this._particleCount;

			return true;
		},

		_updateParticle: function(p, delta, i) {
			if (p.life > 0) {
				p.tmp = p.tmp || { x: 0, y: 0 };
				p.tmp.x = 0;
				p.tmp.y = 0;

				p.radial = p.radial || { x: 0, y: 0 };
				p.radial.x = 0;
				p.radial.y = 0;

				if(p.position.x !== this.position.x || p.position.y !== this.position.y) {
					var radialP = new Vector(p.rx, p.ry).normalize();
					p.radial.x = radialP.x;
					p.radial.y = radialP.y;
				}

				var tangential = _.clone(p.radial);

				p.radial.x *= p.radialAccel;
				p.radial.y *= p.radialAccel;

				var newy = tangential.x;
				tangential.x = - tangential.y;
				tangential.y = newy;
				tangential.x *= p.tangentialAccel;
				tangential.y *= p.tangentialAccel;

				p.tmp.x = p.radial.x + tangential.x + this.gravity.x;
				p.tmp.y = p.radial.y + tangential.y + this.gravity.y;

				p.tmp.x *= delta;
				p.tmp.y *= delta;

				p.dir.x += p.tmp.x;
				p.dir.y += p.tmp.y;

				p.tmp.x = p.dir.x * delta;
				p.tmp.y = p.dir.y * delta;

				p.rx += p.tmp.x;
				p.ry += p.tmp.y;

				p.position.x = p.rx;
				p.position.y = p.ry;

				//p.size += p.deltaSize * delta;
				//p.size = Math.max(0, p.size);
				p.life -= delta;

				++this._particleIndex;
			} else {
				var temp = this.children[i];
				this.children[i] = this.children[this._particleCount - 1];
				this.children[this._particleCount - 1] = temp;

				--this._particleCount;
			}
		},

		update: function(delta) {
			if (!this.active) {
				return;
			}

			if (this.emissionRate) {
				var rate = 1.0 / this.emissionRate;
				this._emitCounter += delta;

				while (!this._isFull() && this._emitCounter > rate) {
					this._addParticle();
					this._emitCounter -= rate;
				}
			}

			this._elapsed += delta;
			this.active = this._elapsed < this.duration;

			this._particleIndex = 0;

			while (this._particleIndex < this._particleCount) {
				var p = this.children[this._particleIndex];
				this._updateParticle(p, delta, this._particleIndex);
			}
		}
});

module.exports = ParticleSystem;

