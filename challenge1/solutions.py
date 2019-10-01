# Python solutions to Bluprint Coding Challenge 1

# Solution 1
i = 378429294349777
stringint = str(i)
cumulative = 1
for digit in stringint:
  if digit == '0':
    continue
  else:
    cumulative = cumulative * int(digit)

print("The product of all digits in {0} is {1}".format(i,cumulative))

# Solution 2
def a(n):
  t=1
  for c in str(n):
    if int(c): t*=int(c)
  return t
  
# Solution 3
b=lambda n:reduce(lambda a,b: a*b,[int(c) for c in str(n) if int(c)])


