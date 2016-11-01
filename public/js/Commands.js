//@flow
class Commands{
  static changeDirection(player: Object, xDir: number, yDir: number, socket: ?Object = null) {
    player.setDir([xDir, yDir]);
    if (socket) {
      socket.emit({command: "change player direction", xDir: xDir, yDir: yDir});
    }
  }

  static chargeShot(player: Object, time: number, socket: ?Object = null) {
    player.chargeShot(time);
    if (socket) {
      socket.emit({command: "player charges shot", time: time});
    }
  }

  static shoot(player: Object, time: number, socket: ?Object = null) {
    player.shoot(time);
    if (socket) {
      socket.emit({command: "player shoots", time: time});
    }
  }
}

exports.Commands = Commands;
