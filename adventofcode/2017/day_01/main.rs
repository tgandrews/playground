use std::error::Error;
use std::fs::File;
use std::io::prelude::*;

pub fn main() {
    let mut f = match File::open("data") {
        Err(why) => panic!("Failed to open: {}", Error::description(&why)),
        Ok(file) => file,
    };
    
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Err(why) => panic!("Failed to read: {}", Error::description(&why)),
        Ok(_) => println!("Sucessfully read data"),
    };
    
    let chars : Vec<char> = s.chars().collect();
    
    let max = chars.len();
    let mut sum : u32 = 0;
    for i in 0..chars.len() {
        let character = chars[i];
        let next_character = if (i + 1) == max {
            chars[0]
        } else {
            chars[i + 1]
        };
        
        if character == next_character {
            let value = match character.to_digit(10) {
                Some(v) => v,
                None => panic!("Failed to parse as digit: {}", character),
            };
            sum += value;
        }
    }
    
    println!("Sum total: {}", sum);
}    
