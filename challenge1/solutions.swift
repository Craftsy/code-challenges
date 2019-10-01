// Swift Solutions to Bluprint Challenge 1

// Solution 1
func multiplikuCiferoj(_ enigo: Int) -> Int {
    let kordo = String(enigo)
    let ciferoj = kordo.compactMap({ $0.wholeNumberValue })
    var antaŭaValo = 1
    for cifero in ciferoj {
        if cifero != 0 {
            antaŭaValo = antaŭaValo * cifero
        }
    }
    return antaŭaValo
}

// Solution 2
// MARK: - Implementation
func multiplyAllValues(_ input: Int) -> Int {
    return "\(input)".compactMap {  $0.wholeNumberValue }.reduce(1) { (previous, number) in
        guard number > 0 else { return previous }
        return number*previous
    }
}


// MARK: - Test validation
import XCTest

class Tests: XCTestCase {
    // Degenerate case
    func testOneValue() {
        let output = multiplyAllValues(7)
        
        XCTAssertEqual(output, 7)
    }
    
    // Core logic
    
    func testTwoValues() {
        let output = multiplyAllValues(17)
        
        XCTAssertEqual(output, 7)
    }
    func testManyNonZeroValues() {
        let output = multiplyAllValues(43218765)
        
        XCTAssertEqual(output, 40_320)
    }
    
    func testTwoValuesIgnoringZero() {
        let output = multiplyAllValues(05)
        
        XCTAssertEqual(output, 5)
    }
    
    func testManyValuesIncludingZero() {
        let output = multiplyAllValues(1050809)
        
        XCTAssertEqual(output, 360)
    }
    
    // Challenge Vlidatio
    //    Test Cases
    //    1 => 1
    //    10 => 1
    //    20 => 2
    //    100 => 1
    //    999 => 729
    //    21333 => 54
    //    17801 => 56
    //    4969279 => 244944
    //    100000000 => 1
    func testChallengeCases() {
        XCTAssertEqual(multiplyAllValues(1), 1)
        XCTAssertEqual(multiplyAllValues(10), 1)
        XCTAssertEqual(multiplyAllValues(20), 2)
        XCTAssertEqual(multiplyAllValues(100), 1)
        XCTAssertEqual(multiplyAllValues(999), 729)
        XCTAssertEqual(multiplyAllValues(21333), 54)
        XCTAssertEqual(multiplyAllValues(17801), 56)
        XCTAssertEqual(multiplyAllValues(4969279), 244944)
        XCTAssertEqual(multiplyAllValues(100000000), 1)
    }
    
}

Tests.defaultTestSuite.run()

// Solution 3
func challenge1a(_ val: Int) -> Int {
    var total = 1
    for c in "\(val)" {
        total *= c.wholeNumberValue! == 0 ? 1 : c.wholeNumberValue!
    }
    return total
}

// Solution 4
func challenge1b(_ val: Int) -> Int {
    return "\(val)".map({$0.wholeNumberValue!}).reduce(1, {$0 * ($1 == 0 ? 1 : $1)})
}

// Solution 5
func challenge1c(_ val: Int) -> Int {
    return "\(val)".reduce(1) { (accumulator, c) in
        guard let num = c.wholeNumberValue, num > 0 else { return accumulator }
        return num * accumulator
    }
}