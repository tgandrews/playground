use std::error::Error;
use std::io::prelude::*;
use std::fs::File;
use std::collections::HashMap;


fn get_wire_value(wires: &HashMap<&str, u16>, key: &str) -> u16 {
    println!("Reading from wires: {}", key);
    return match wires.get(key) {
        Some(&v) => { v },
        None => panic!("Error reading wires for wire: {}", key),
    }
}

fn parse_int(string: &str) -> u16 {
    return match string.parse::<u16>() {
        Ok(v) => v,
        Err(why) => panic!("Failed to parse string to u16: {}", Error::description(&why)),
    }
}

fn main() {
    let mut f = match File::open("day7.data") {
        Err(why) => panic!("File open failed: {}", Error::description(&why)),
        Ok(file) => file,
    };
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Err(why) => panic!("Failed to read: {}", Error::description(&why)),
        Ok(_) => print!("Sucessfully read from file.\n"),
    };

    let mut wires: HashMap<&str, u16> = HashMap::new();

    let lines = s.split("\n");
    for line in lines {
        if line.is_empty() {
            continue;
        }
        let split: Vec<&str> = line.split(" -> ").collect();
        let action = split[0];
        let output = split[1];

        let result: u16;

        if action.contains("AND") {
            let sides: Vec<&str> = action.split(" AND ").collect();
            let lhs_value = get_wire_value(&wires, sides[0]);
            let rhs_value = get_wire_value(&wires, sides[1]);
            result = lhs_value & rhs_value;
        } else if action.contains("OR") {
            let sides: Vec<&str> = action.split(" OR ").collect();
            let lhs_value = get_wire_value(&wires, sides[0]);
            let rhs_value = get_wire_value(&wires, sides[1]);
            result = lhs_value | rhs_value;
        } else if action.contains("LSHIFT") {
            let sides: Vec<&str> = action.split(" LSHIFT ").collect();
            let value_to_shift = get_wire_value(&wires, sides[0]);
            let shift_by: u16 = parse_int(sides[1]);
            result = value_to_shift << shift_by;
        } else if action.contains("RSHIFT") {
            let sides: Vec<&str> = action.split(" RSHIFT ").collect();
            let value_to_shift = get_wire_value(&wires, sides[0]);
            let shift_by: u16 = parse_int(sides[1]);
            result = value_to_shift >> shift_by;
        } else if action.contains("NOT") {
            let input: Vec<&str> = action.split(" ").collect();
            let wire = input[1];
            println!("NOT wire:{}\n", wire);
            let value = get_wire_value(&wires, wire);
            result = !value;
        } else {
            let value = parse_int(action);
            result = value;
        }

        wires.insert(output, result);
    }

    for (wire, value) in wires.iter() {
        println!("Wire: {} {}", wire, value);
    }

}
