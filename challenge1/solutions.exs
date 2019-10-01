# Elixir Solutions to Bluprint Challenge 1

# Solution 1
defmodule Challenge do
  def multiply(x) do
    {a, b} = String.next_grapheme(x)
    _multiply(a, b, 1)
  end

  defp _multiply("0", b, n) when bit_size(b) == 0 do
    n
  end

  defp _multiply("0", b, n) do 
    {a, b} = String.next_grapheme(b)
    _multiply(a, b, n)
  end

  defp _multiply(a, b, n) when bit_size(b) == 0 do
   String.to_integer(a) * n
  end

  defp _multiply(a, b, n) do 
    n = String.to_integer(a) * n
    {a, b} = String.next_grapheme(b)
    _multiply(a, b, n)
  end
end

cases = ["1", "10", "20", "100", "999", "21333", "17801", "4969279", "100000000"]
results = 
  cases 
  |> Enum.map(&Challenge.multiply(&1))
zipped = Enum.zip(cases, results)
Enum.each(zipped, fn ({a, b}) -> IO.puts("#{a} => #{b}") end)
# Challenge.multiply("123")