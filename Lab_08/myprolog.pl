ok.

writeNumber(X) :- 
    X_NEW is X, 
    write(X_NEW), 
    write("\n").

writetmp(X, A, B) :- 
    X >= A,
    X =< B,
    writeNumber(X).
    
writetmp(X, A, B):- ok.
    
fibo(A, B, S) :- 
    findfibo(S, Res),
    Res =< B, 
    writetmp(Res, A, B),    
    S_NEW is S + 1,
    fibo(A, B, S_NEW); ok.


fib(A, B) :- fibo(A, B, 0); ok.

findfibo(0, 1) :- !.
findfibo(1, 1) :- !.
findfibo(N, F) :-
        N > 1,
        N1 is N-1,
        N2 is N-2,
        findfibo(N1, F1),
        findfibo(N2, F2),
        F is F1+F2.
        
start :- write("Number 1: "), nl,
     read(A), nl, 
     write("Number 2: "), nl,
     read(B), nl,
     fib(A, B), nl.
    
