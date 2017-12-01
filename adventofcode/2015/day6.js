import { readFileSync } from 'fs';

const file = process.argv[2];

const actions = readFileSync(file, { encoding: 'utf8' }).split('\n');

let grid = {};

function performAction(action) {
  const { topLeft, bottomRight, type } = action;

  const dx = bottomRight.x - topLeft.x;
  const dy = bottomRight.y - topLeft.y;

  for (let x = 0; x <= dx; x++) {
    const xLoc = topLeft.x + x;
    for (let y = 0; y <= dy; y++) {
      const yLoc = topLeft.y + y;
      const coords = `${xLoc},${yLoc}`;
      if (type === 'on') {
        grid[coords] = (grid[coords] || 0) + 1;
      } else if (type === 'off') {
        grid[coords] = (grid[coords] || 1) - 1;
      } else if (type === 'toggle') {
        grid[coords] = (grid[coords] || 0) + 2;
      }
    }
  }
}

function parseCommand(command) {
  const coords = command.match(/(\d+,\d+)/g);
  const [ topLeft, bottomRight ] = coords.map((coordString) => {
    const [x, y] = coordString.split(',').map(value => parseInt(value))
    return { x, y };
  })

  let type;
  if (command.startsWith('turn on')) {
    type = 'on'
  } else if (command.startsWith('turn off')) {
    type = 'off';
  } else if (command.startsWith('toggle')) {
    type = 'toggle';
  }

  return { topLeft, bottomRight, type };
}

for (let i = 0; i < actions.length; i++) {
  const commandString = actions[i].trim();
  if (commandString.length < 1) {
    continue;
  }
  const action = parseCommand(commandString);
  performAction(action);
}

const keys = Object.keys(grid);
const brightness = keys.reduce((value, key) => {
  return value + grid[key];
}, 0)

console.log(`Brightness: ${brightness}`);
