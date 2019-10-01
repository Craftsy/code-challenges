# Ruby Solutions to Bluprint Challenge 1

# Solution 1
def challenge1a(n)
  total = 1
  for c in n.to_s.split('') do
    total *= c.to_i||1
  end
  return total
end

# Solution 2
def challenge1b(n)
  n.to_s.split('').reduce(1) {|p, n| p*(n.to_i||1)}
end

# Solution 3
f=->(n){n.to_s.split('').reduce(1){|p, n|p*(n.to_i||1)}}