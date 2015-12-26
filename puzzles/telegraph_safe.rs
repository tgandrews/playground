fn is_square(num: &i32) -> bool {
    return num == &1 || num == &4 || num == &9;
}

fn count_of_squares(nums: Vec<i32>) -> i32 {
    let mut count = 0;
    for num in nums.iter() {
        if is_square(num) {
            count += 1;
        }
    }
    return count;
}

fn check_result(a: i32, b: i32, c: i32, d: i32) -> bool {
    let rule_one = a > d;
    let rule_two = !is_square(&d);
    let rule_three = ((a + c) % 3) == 0;
    let rule_four = count_of_squares(vec![a, b, c, d]) == 2;
    let rule_five = (b + d) == 10;

    return rule_one && rule_two && rule_three && rule_four && rule_five;
}

fn main () {
    for a in 1..10 {
        for b in 1..10 {
            for c in 1..10 {
                for d in 1..10 {
                    if check_result(a, b, c, d) {
                        println!("Found {} {} {} {}", a, b, c, d);
                        return;
                    };
                }
            }
        }
    }
    println!("No result found :(");
}
