ok.

writeNumber(X) :- 
    X_NEW is X, 
    write(X_NEW), 
    write("\n").
     
start :- 
    write("Number 1: "), nl,
    read(A), nl, 
    write("Number 2: "), nl,
    read(B), nl,
    A >= 0,
    B >= A,
    find(A, B), nl.
     
find_square(A, B) :-
    Tmp is A * A,
    writeNumber(Tmp),
    A < B,
    A_NEW is A + 1,
    find_square(A_NEW, B); ok.
     
find(A, B) :-
    A1 is ceiling(sqrt(A)),
    B1 is floor(sqrt(B)),
    find_square(A1, B1); ok.
    