use std::error::Error;
use std::io::prelude::*;
use std::fs::File;

use std::collections::HashMap;

struct Node<'a> {
    name: &'a str,
    value: u16,
    input: Vec<&'a str>,
    output: Vec<&'a str>,
}

fn main() {
    let mut f = match File::open("day7.data") {
        Err(why) => panic!("File open failed: {}", Error::description(&why)),
        Ok(file) => file,
    };
}
