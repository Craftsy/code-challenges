// Kotlin Solutions to Bluprint Challenge 1

// Solution 1
fun challenge1a(n:Int): Int {
  var product = 1
  n.toString().forEach {c ->
    val i = c.toString().toInt()
    if (i > 0) product *= i
  }
  return product
}
// Solution 2
fun challenge1b(n:Int): Int {
  return n.toString().map({c->c.toString().toInt()}).filter({it>0}).fold(1) {s,i->s*i}
}
// Solution 3
fun challenge1c(n: Int): Int {
    return n.toString()
            .mapNotNull { char -> char.toString().toIntOrNull() }
            .filter { digit -> digit > 0 }
            .reduce(Int::times)
}
