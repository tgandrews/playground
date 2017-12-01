import { readFileSync } from 'fs';

const file = process.argv[2];

const commands = readFileSync(file, { encoding: 'utf8' }).split('\n');

const wires = {};

function parseCommand(commandString) {
  const [ action, output ] = commandString.split(' -> ').map(s => s.trim());
  if (action.indexOf('AND') !== -1) {
    const [ lhs, rhs ] = action.match(/[a-z]/g);
    return { type: 'AND', lhs, rhs, output };
  } else if (action.indexOf('OR') !== -1) {
    const [ lhs, rhs ] = action.match(/[a-z]/g);
    return { type: 'OR', lhs, rhs, output };
  } else if (action.indexOf('LSHIFT') !== -1 || action.indexOf('RSHIFT') !== -1) {
    const [ full, wire, shiftType, valueStr ] = action.match(/([a-z]) (LSHIFT|RSHIFT) (\d+)/);
    const value = parseInt(valueStr, 10);
    return { type: shiftType, wire, value, output };
  } else if (action.indexOf('NOT') !== -1 ) {
    const wire = action[action.length - 1];
    return { type: 'NOT', wire, output };
  } else {
    const value = parseInt(action);
    return { type: 'SIGNAL', value, output };
  }
  throw new Error('Unknown command for: ', commandString);
}


for (let i = 0; i < commands.length; i++) {
  const command = commands[i].trim();
  if (command.length < 1) {
    continue;
  }
  const action = parseCommand(command);
  console.log(action);
  let result;
  switch (action.type) {
    case 'SIGNAL':
      result = action.value;
      break;
    case 'AND':
      result = wires[action.lhs] & wires[action.rhs];
      break;
    case 'OR':
      result = wires[action.lhs] | wires[action.rhs];
      break;
    case 'LSHIFT':
      result = wires[action.wire] << action.value;
      break;
    case 'RSHIFT':
      result = wires[action.wire] >> action.value;
      break;
    case 'NOT':
      result = ~ wires[action.wire];
      break;
    default:
      throw new Error('Unknown action', action);
      break;
  }

  wires[action.output] = result;
}

console.log('WIRES', wires);
