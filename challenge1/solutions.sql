/* 
** TSQL Solutions to Bluprint Challenge 1
*/

/* Solution 1 - PostgreSQL */
with recursive prod(product, rest) as (
  select 1, 4969279
  union all
  select product * greatest(substr(rest::text, 1, 1)::int, 1) as product
       , case when length(rest::text) = 1 then null else substr(rest::text, 2)::int end as rest
    from prod
   where length(rest::text) > 0
)
select product from prod where rest is null;