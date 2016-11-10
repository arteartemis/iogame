//@flow
/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Constants = require('./Constants').Constants;
var GameObject = require('./GameObject').GameObject;
var Globals = require('./Globals').Globals;

class Player extends GameObject {
	_dir: Array<number>;
	id: string;
	_bulletCount: number;
	_chargeTime: number;
	_score: number;
	_shootDir: Array<number>;
	_createBullet: Function;

	constructor(startX: number, startY: number, dir: Array<number>, color: string, createBullet: Function) {
		super(startX, startY, Constants.playerSize, Constants.playerSize, color);
		this._dir = dir;
		this._shootDir = dir;
		this._bulletCount = 1;
		this._chargeTime = 0;
		this._createBullet = createBullet;
		this._score = 0;
	}

	getBulletCount() {
		return this._bulletCount;
	}

	setBulletCount(newBulletCount: number) {
		this._bulletCount = newBulletCount;
	}

	getScore() {
		return this._score;
	}

	setScore(score: number) {
		this._score = score;
	}

	setDir(dir: Array<number>) {
		this._dir = dir;
		if (dir[0] !== 0 || dir[1] !== 0) {
			this._shootDir = dir;
		}
	}

	getDir() {
		return this._dir;
	}

	getColor() {
		return this._color;
	}

	chargeShot(time: number) {
		if (this._bulletCount > 0) {
			this._chargeTime = time;
		}
	}

	shoot(time: number) {
		if (this._chargeTime !== 0 && this._bulletCount > 0) {
			const charged = time - this._chargeTime;
			this._bulletCount -= 1;
			let size =
				charged * Constants.bulletGrowthRate > Constants.bulletMaxSize
				? Constants.bulletMaxSize
				: charged * Constants.bulletGrowthRate;
			if (size < 1) {
				size = 1;
			}
			this._createBullet(this._x, this._y, this._shootDir, size, this);
		}
		this._chargeTime = 0;
	}

	update(borders: Array<Object>, resources: Array<Object>) {
		let borderCollision = false;
		for (var i = 0; i < borders.length; i++) {
			if (this.collision(
				borders[i],
				this._x + this._dir[0] * Constants.playerSpeed,
				this._y + this._dir[1] * Constants.playerSpeed,
			)) {
				borderCollision = true;
				break;
			}
		}

		if (!borderCollision && this._chargeTime === 0) {
			this._x += this._dir[0] * Constants.playerSpeed;
			this._y += this._dir[1] * Constants.playerSpeed;

			for (var i = 0; i < resources.length; i++) {
				if (this.collision(resources[i])) {
					resources[i].setAlive(false);
					this._bulletCount += 1;
				}
			}
		}
	}

	draw(ctx: Object) {
		var x_pos = this._x * Globals.widthRatio;
		var y_pos = this._y * Globals.heightRatio;

		ctx.fillStyle = this._color;
		ctx.beginPath();
		ctx.arc(x_pos, y_pos, Constants.playerSize * Globals.widthRatio, 0, 2*Math.PI);
		ctx.fill();
		ctx.fillStyle = '#000';
		if (this._chargeTime !== 0) {
			ctx.beginPath();
			const charged = Date.now() - this._chargeTime;
			let size =
				charged * Constants.bulletGrowthRate * Globals.widthRatio > Constants.bulletMaxSize
				? Constants.bulletMaxSize * Globals.widthRatio
				: charged * Constants.bulletGrowthRate * Globals.widthRatio;
			if (size < 1) {
				size = 1;
			}
			ctx.arc(x_pos, y_pos, size * Globals.widthRatio, 0, 2*Math.PI);
			ctx.moveTo(
				x_pos + (size * Globals.widthRatio * this._shootDir[0]),
				y_pos + (size * Globals.widthRatio * this._shootDir[1]));
			ctx.lineTo(
				x_pos + ((size * Globals.widthRatio - 5) * this._shootDir[0]),
				y_pos + ((size * Globals.widthRatio - 5) * this._shootDir[1]));
			ctx.stroke();
		}

		ctx.font = "18px serif";
		ctx.fillText(
			this._bulletCount, 
			this._x * Globals.widthRatio - 5,
			this._y * Globals.heightRatio + 5);
	}

	applyUpdate(data: Object) {
		super.applyUpdate(data);
		this._dir = data.dir;
		if (data.dir[0] !== 0 || data.dir[1] !== 0) {
			this._shootDir = data.dir;
		}
		this._bulletCount = data.bulletCount;
		this._score = data.score;
	}

	serialize() {
		let serialized = super.serialize();
		serialized.dir = this._dir;
		serialized.bulletCount = this._bulletCount;
		serialized.score = this._score;
		return serialized;
	}

	reset(color: ?string = null) {
		this._x = Math.round(Math.random()*(Constants.gameWidth-40)) + 20;
		this._y = Math.round(Math.random()*(Constants.gameHeight-40)) + 20;
		this._bulletCount = 1;
		this._alive = true;
		//this._score = 0;
		this._color = color ? color : '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		this._dir = [1,0];
		this._shootDir = this._dir;
	}
}

exports.Player = Player;
