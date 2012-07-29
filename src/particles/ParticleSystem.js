var cocos = require('cocos2d');
var Node = cocos.nodes.Node;

var geom = require('geometry');
var Point = geom.Point;

var _ = require('../util/underscore-min');
var Vector = require('../geometry/Vector');
var Random = require('../util/Random');
var Angles = require('../util/Angles');
var Circle = require('./Circle');

function random11() {
	return Random.rand(-1, 1, true);
}

function ParticleSystem(config) {
	ParticleSystem.superclass.constructor.call(this);

	if (!config.particleTypes && config.particleType) {
		config.particleTypes = [config.particleType];
	}

	if (!config.particleTypes) {
		config.particleTypes = [Circle];
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

		var particle = new this.particleTypes[rand];
		particle.position = new Point(0, 0);
		return particle;
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
		particle.rx = this.posVar.x * random11();
		particle.ry = this.posVar.y * random11();

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

		if ( !! particle.radialAccel) {
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

		if (particle.children && particle.children[0]) {
			particle.children[0].opacity = _.isNumber(this.startOpacity) ? this.startOpacity: 255;
			particle.deltaOpacity = _.isNumber(this.endOpacity) ? (this.endOpacity - this.startOpacity) : 0;
			particle.deltaOpacity /= particle.life;
		}

		particle.scale = _.isNumber(this.startScale) ? this.startScale: 1;
		particle.deltaScale = _.isNumber(this.endScale) ? (this.endScale - this.startScale) : 0;
		particle.deltaScale /= particle.life;

		particle.radius = _.isNumber(this.radius) ? this.radius + (this.radiusVar || 0) * random11() : 0;

		// color
		if (this.startColor) {
			var startColor = [
			this.startColor[0] + this.startColorVar[0] * random11(), this.startColor[1] + this.startColorVar[1] * random11(), this.startColor[2] + this.startColorVar[2] * random11(), this.startColor[3] + this.startColorVar[3] * random11()];

			var endColor = [
			this.endColor[0] + this.endColorVar[0] * random11(), this.endColor[1] + this.endColorVar[1] * random11(), this.endColor[2] + this.endColorVar[2] * random11(), this.endColor[3] + this.endColorVar[3] * random11()];

			particle.color = startColor;
			particle.deltaColor = [(endColor[0] - startColor[0]) / particle.life, (endColor[1] - startColor[1]) / particle.life, (endColor[2] - startColor[2]) / particle.life, (endColor[3] - startColor[3]) / particle.life];
		}
	},

	_addParticle: function() {
		if (this._isFull()) {
			return false;
		}

		var p = this.children[this._particleCount];
		this._initParticle(p); ++this._particleCount;

		return true;
	},

	_updateParticle: function(p, delta, i) {
		if (p.life > 0) {
			p.tmp = p.tmp || {
				x: 0,
				y: 0
			};
			p.tmp.x = 0;
			p.tmp.y = 0;

			p.radial = p.radial || {
				x: 0,
				y: 0
			};
			p.radial.x = 0;
			p.radial.y = 0;

			if (p.position.x !== this.position.x || p.position.y !== this.position.y) {
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

			//p.position.x = p.rx;
			//p.position.y = p.ry;
			p.position = new Point(p.rx, p.ry);

			//p.size += p.deltaSize * delta;
			//p.size = Math.max(0, p.size);
			p.life -= delta;

			if (p.children && p.children[0]) {
				p.children[0].opacity += p.deltaOpacity * delta;
			}
			p.scale += p.deltaScale * delta;

			if (p.color) {
				p.color[0] += p.deltaColor[0] * delta;
				p.color[1] += p.deltaColor[1] * delta;
				p.color[2] += p.deltaColor[2] * delta;
				p.color[3] += p.deltaColor[3] * delta;
			}

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

		if (!this.active && this.removeWhenDone) {
			this.parent.removeChild(this);
			return;
		}

		this._particleIndex = 0;

		while (this._particleIndex < this._particleCount) {
			var p = this.children[this._particleIndex];
			this._updateParticle(p, delta, this._particleIndex);
		}
	}
});

module.exports = ParticleSystem;

