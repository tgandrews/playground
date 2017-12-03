use std::error::Error;
use std::fs::File;
use std::io::prelude::*;

fn diff_from_list(list: Vec<i32>) -> i32 {
    let mut max = 0;
    let mut min = 50000;
    
    for i in 0..list.len() {
        let value = list[i];
        if value > max {
            max = value;
        }
        if value < min {
            min = value;
        }
    }

    return max - min;
}


fn line_to_numbers(line: &str) -> Vec<i32> {
    return line
        .split_whitespace()
        .map(|str_num| match str_num.trim().parse::<i32>() {
            Ok(num) => num,
            Err(_) => panic!("Cannot cope with: {}", str_num),
        })
        .collect();
}


pub fn main() {
    let mut f = match File::open("data") {
        Err(why) => panic!("Failed to open: {}", Error::description(&why)),
        Ok(file) => file,
    };
    
    let mut data = String::new();
    match f.read_to_string(&mut data) {
        Err(why) => panic!("Failed to read: {}", Error::description(&why)),
        Ok(_) => println!("Sucessfully read data"),
    };
    
    
    let check_sum = data.lines()
        .map(|line| line_to_numbers(line))
        .fold(0, |acc, numbers| acc + diff_from_list(numbers));
        
    println!("{:?}", check_sum)
}