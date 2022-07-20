ok.

writeNumber(X) :- 
    X_NEW is X, 
    write(X_NEW), 
    write("\n").
    
writecmp(S, A, B) :- 
    A =:= B, 
    write("Sum = "),
    writeNumber(S).
    
writecmp(S, A, B) :- ok.
    
start :- write("Number 1: "), nl,
     read(A), nl, 
     write("Number 2: "), nl,
     read(B), nl,
     write("Number 3: "), nl,
     read(C), nl,
     
     find(A, B, C), nl.
     
find_sum(A, B, C, SUM) :-
    Tmp is A * C,
    writeNumber(Tmp),
    SUM_NEW is SUM + Tmp,
    writecmp(SUM_NEW, A, B),

    A_NEW is A + 1,
    A_NEW =< B,
    find_sum(A_NEW, B, C, SUM_NEW);ok.
    
find(A, B, C) :-
    A1 is ceiling(A / C),
    B1 is floor(B / C),
    find_sum(A1, B1, C, 0); ok.
    
    