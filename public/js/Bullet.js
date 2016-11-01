//@flow
/**************************************************
** GAME Bullet CLASS
**************************************************/
var Constants = require('./Constants').Constants;
var GameObject = require('./GameObject').GameObject;

class Bullet extends GameObject {
  _dir: Array<number>;
  _size: number;
  _owner: string;

  constructor(
    startX: number,
    startY: number,
    startDir: Array<number>,
    size: number,
    owner: string,
  ) {
    super(startX, startY, size, size, '#000');
    this._dir = startDir;
    this._size = size;
    this._owner = owner;
  }

  getSize() {
    return this._size;
  }

  getDir() {
    return this._dir;
  }

  update(
    borders: Array<Object>,
    localPlayer: Object,
    remotePlayers: Array<Object>
  ) {
    this._x += this._dir[0] * Constants.bulletSpeed;
    this._y += this._dir[1] * Constants.bulletSpeed;

    for (var i = 0; i < borders.length; i++) {
      if (this.collision(borders[i])) {
        this._alive = false;
      }
    }

    for (var i = 0; i < remotePlayers.length; i++) {
      if (
        this.collision(remotePlayers[i]) && remotePlayers[i].id != this._owner
      ) {
        this._alive = false;
        remotePlayers[i].setAlive(false);
      }
    }

    if (localPlayer.id != this._owner && this.collision(localPlayer)) {
      this._alive = false;
      localPlayer.setAlive(false);
    }
  }

  draw(ctx: Object) {
    ctx.fillStyle = this._color;
    ctx.beginPath();
    ctx.arc(this._x, this._y, this._size, 0, 2*Math.PI);
    ctx.fill();
  }
};

exports.Bullet = Bullet;
