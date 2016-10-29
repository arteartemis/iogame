
/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Constants = require('./Constants').Constants;

var Player = function (startX, startY, color) {
	var x = startX,
	    y = startY,
	    dir = [1, 0],
	    color = color,
	    isShooting = false,
	    currentBulletSize = 0,
	    id;

	var setX = function (newX) {
		x = newX;
	};

	var setY = function (newY) {
		y = newY;
	};

	var setDir = function (newDir) {
		dir = newDir;
	};

	var getX = function () {
		return x;
	};

	var getY = function () {
		return y;
	};

	var getDir = function () {
		return dir;
	};

	var getColor = function () {
		return color;
	};

	var update = function (keys) {
		var prevX = x,
		    prevY = y;

		if (!keys.space && isShooting) {
			isShooting = false;
			var rtn = { command: "player shoots", x: x, y: y, dir: dir, size: currentBulletSize };
			currentBulletSize = 0;
			return rtn;
		}

		if (keys.space) {
			isShooting = true;
			if (currentBulletSize < Constants.bulletMaxSize) {
				currentBulletSize += Constants.bulletGrowthRate;
			}
		} else {
			if (keys.up) {
				dir = [0, -1];
			}
			if (keys.down) {
				dir = [0, 1];
			};
			if (keys.left) {
				dir = [-1, 0];
			}
			if (keys.right) {
				dir = [1, 0];
			};

			x = x + dir[0] * Constants.playerSpeed;
			y = y + dir[1] * Constants.playerSpeed;

			if (prevX != x || prevY != y) {
				return { command: "move player", x: x, y: y, dir: dir };
			}
		}

		return null;
	};

	var draw = function (ctx) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(x, y, Constants.playerSize, 0, 2 * Math.PI);
		ctx.fill();
	};

	return {
		update: update,
		draw: draw,
		setX: setX,
		setY: setY,
		setDir: setDir,
		getX: getX,
		getY: getY,
		getDir: getDir,
		getColor: getColor,
		id: id
	};
};

exports.Player = Player;