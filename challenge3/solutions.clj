;; solution 1
(def a (int \a))
(def n (int \n))
(def z (int \z))
(def A (int \A))
(def N (int \N))
(def Z (int \Z))

(defn rot13-char [c]
  (let [c (int c)]
    (->
      (cond (and (>= c a) (< c n)) (+ c 13)
            (and (>= c n) (< c z)) (- c 13)
            (and (>= c A) (< c N)) (+ c 13)
            (and (>= c N) (< c Z)) (- c 13)
            :else c)
      (char))))


(defn rot13 [s]
  (apply str (map rot13-char s)))

(defn challenge [cases]
  (doseq [case cases]
    (println case "->" (rot13 case))))

(challenge ["a" "T" "Q&A" "ABC... easy as 123"])