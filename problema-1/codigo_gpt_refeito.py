import math

def gauss_elimination(A, b):
    n = len(b)
    M = [A[i][:] + [b[i]] for i in range(n)]

    for k in range(n):
        max_row = max(range(k, n), key=lambda i: abs(M[i][k]))
        M[k], M[max_row] = M[max_row], M[k]
        
        pivot = M[k][k]
        if abs(pivot) < 1e-12:
            raise ValueError("Sistema singular ou mal condicionado.")
            
        for j in range(k, n + 1):
            M[k][j] /= pivot
            
        for i in range(k + 1, n):
            factor = M[i][k]
            for j in range(k, n + 1):
                M[i][j] -= factor * M[k][j]
                
    x = [0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (M[i][n] - sum(M[i][j] * x[j] for j in range(i + 1, n)))
    return x
