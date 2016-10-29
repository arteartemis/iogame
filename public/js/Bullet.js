//@flow
/**************************************************
** GAME Bullet CLASS
**************************************************/
var Constants = require('./Constants').Constants;

var Bullet = function(
  startX: number,
  startY: number,
  startDir: Array<number>,
  size: number,
) {
  var x = startX,
    y = startY,
    dir = startDir,
    size = size,
    id: String;

  var setX = function(newX: number) {
    x = newX;
  };

  var setY = function(newY: number) {
    y = newY;
  };

  var setDir = function(newDir: Array<number>) {
    dir = newDir;
  };

  var getX = function() {
    return x;
  };

  var getY = function() {
    return y;
  };

  var getDir = function() {
    return dir;
  };

  var getSize = function() {
    return size;
  };

  var update = function() {
    x += dir[0] * Constants.bulletSpeed;
    y += dir[1] * Constants.bulletSpeed;
  };

  var draw = function(ctx: Object) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2*Math.PI);
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
    getSize: getSize
  }
};

exports.Bullet = Bullet;
