;; Clojure Solutions to Bluprint Challenge 1

;; Solution 1
(def test-cases ["1", "10", "20", "100", "999", "21333", "17801", "4969279", "10000000"])

(defn result [x]
(reduce * (map #(Integer. %) (filter #(not= % "0") (clojure.string/split x #"")))))

(println (map result test-cases))