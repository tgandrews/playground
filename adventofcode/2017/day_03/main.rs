use std::error::Error;
use std::fs::File;
use std::io::prelude::*;

fn position_to_size(position: f64) -> f64 {
    let rounded_square = position.sqrt().round();
    if rounded_square % 2.0 == 0.0 {
        rounded_square + 1.0
    } else {
        rounded_square
    }
}

fn size_to_depth(square_size: f64) -> f64 {
    (square_size / 2.0).ceil()
}

fn depth_to_size(depth: f64) -> f64 {
    ((depth * 2.0) - 1.0)
}

fn depth_to_mid_step(depth: f64) -> f64 {
    depth_to_size(depth) - 1.0
}

fn edge_middles(depth: f64) -> Vec<f64> {
    let previous_square_end = depth_to_size(depth - 1.0).powf(2.0);
    let step = depth_to_mid_step(depth);
    let right_mid = previous_square_end + (depth - 1.0);
    let top_mid = right_mid + step;
    let left_mid = top_mid + step;
    let bottom_mid = left_mid + step;
    vec!(right_mid, top_mid, left_mid, bottom_mid)
}

fn closest_distance_to_middle(middles: Vec<f64>, value: f64) -> f64 {
    let mut smallest_step = 1000000.0;
    for i in 0..middles.len() {
        let distance = (middles[i] - value).abs();
        if distance < smallest_step {
            smallest_step = distance;
        }
    }
    return smallest_step;
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
    
    let value = data.trim().parse::<f64>().unwrap();
    let square_size = position_to_size(value);
    let depth = size_to_depth(square_size);
    let middles = edge_middles(depth);
    
    let closest_distance = closest_distance_to_middle(middles, value);
    
    let result = closest_distance + depth - 1.0;
        
    println!("{:?}", result);
}