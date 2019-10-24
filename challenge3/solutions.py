// solution 1
abc = {}
t = lambda s,n: (chr(ord(s)+n), chr(ord(s)+13+n))

for n in range(0,13):
    l,r = t('a',n)
    cl,cr = t('A',n)
    abc[l] = r
    abc[r] = l
    abc[cl] = cr
    abc[cr] = cl

rot13 = lambda s: ''.join([abc[c] if c in abc else c for c in s])

print(rot13('ABC... easy as 123'))