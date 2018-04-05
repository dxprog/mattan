const CARDINAL_DIRECTION_COUNT = 6;
const NORTH_WEST = 0;
const NORTH_EAST = 1;
const EAST = 2;
const SOUTH_EAST = 3;
const SOUTH_WEST = 4;
const WEST = 5;
const HEX_SHELLS = 3;

class Tile {
  constructor() {
    this.adjacent = new Array(CARDINAL_DIRECTION_COUNT);
  }

  getAdjacentTile(direction) {
    return this.adjacent[direction];
  }

  setAdjacentTile(tile, direction) {
    this.adjacent[direction] = tile;
    const oppositeDirection = Tile.getOppositeDirection(direction);
    if (tile.getAdjacentTile(oppositeDirection) !== this) {
      tile.setAdjacentTile(this, oppositeDirection);
    }
  }

  static getOppositeDirection(direction) {
    return Tile.getDirectionWithOffset(direction, CARDINAL_DIRECTION_COUNT / 2);
  }

  static getDirectionWithOffset(direction, offset) {
    let retVal = direction + offset;
    if (retVal < 0) {
      retVal = CARDINAL_DIRECTION_COUNT + retVal;
    } else if (retVal >= CARDINAL_DIRECTION_COUNT) {
      retVal -= CARDINAL_DIRECTION_COUNT;
    }
    return retVal;
  }
}

const tiles = [
  new Tile()
];

let index = 0;
for (let i = 1; i < HEX_SHELLS; i++) {
  const numTiles = tiles.length;
  for (let j = index; j < numTiles; j++) {
    const tile = tiles[j];
    for (let k = 0; k < CARDINAL_DIRECTION_COUNT; k++) {
      if (!tile.getAdjacentTile(k)) {
        const newTile = new Tile();
        tile.setAdjacentTile(newTile, k);
        tiles.push(newTile);
      }
    }

    for (let k = 0; k < CARDINAL_DIRECTION_COUNT; k++) {
      tile.getAdjacentTile(k).setAdjacentTile(
        tile.getAdjacentTile(Tile.getDirectionWithOffset(k, -1)),
        Tile.getDirectionWithOffset(k, -2)
      );
    }
    index = j;
  }
}

console.log(tiles);