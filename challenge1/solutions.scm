; Scheme Solutions to Bluprint Challenge 1

; Solution 1
; char 48 is /#
(define (to_list num) (map (lambda (c) (- (char->integer c) 48))
         (string->list (number->string num))))
(define (multiply_list the_list)
  ( bob)
)


(define (multiply_list the_list)
  (if (null? the_list)
    1
    (
      let ([n (car the_list)])
      (if (= 0 n)
        (* 1 (multiply_list (cdr the_list)))
        (* n (multiply_list (cdr the_list)))
      )
    )
  )
)
(print '1=> (multiply_list (to_list 1))) ;; 1
(print '10=> (multiply_list (to_list 10))) ;; 1
(print '20=> (multiply_list (to_list 20))) ;; 2
(print '100=> (multiply_list (to_list 100))) ;; 1
(print '999=> (multiply_list (to_list 999))) ;; 729
(print '21333=> (multiply_list (to_list 21333))) ;; 54
(print '17801=> (multiply_list (to_list 17801))) ;; 56
(print '4969279=> (multiply_list (to_list 4969279))) ;; 244944
(print '100000000=> (multiply_list (to_list 100000000))) ;; 1