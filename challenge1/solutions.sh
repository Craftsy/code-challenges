# Bash Solutions to Bluprint Challenge 1

# Solution 1
val=361218402
product=1
while IFS='' read -r -d '' -n 1 char; do
	if [ "$char" -ne "0" ]; then
    product=$((product*char))
	fi
done < <(printf %s "$val")
echo "$product"