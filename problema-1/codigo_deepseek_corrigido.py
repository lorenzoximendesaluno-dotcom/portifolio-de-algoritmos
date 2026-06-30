import numpy as np

class TrelicaPlana:
    def __init__(self, nos, barras, cargas, apoios):
        self.nos = np.array(nos, dtype=float)
        self.barras = barras
        self.cargas = np.array(cargas, dtype=float)
        self.apoios = apoios
        self.N = len(nos)
        self.B = len(barras)

    def resolver(self):
        n_eq = 2 * self.N
        n_reacoes = sum(2 if a == 'fixo' else 1 for a in self.apoios if a in ['fixo', 'movel'])
        
        n_incognitas = self.B + n_reacoes
        A = np.zeros((n_eq, n_incognitas))
        b = np.zeros(n_eq)
        col_reacao = self.B
        
        for no in range(self.N):
            eq_h = 2 * no
            eq_v = 2 * no + 1
            b[eq_h] = -self.cargas[no][0]
            b[eq_v] = -self.cargas[no][1]
            
            for i, (no_i, no_j) in enumerate(self.barras):
                if no_i == no or no_j == no:
                    xi, yi = self.nos[no_i]
                    xj, yj = self.nos[no_j]
                    L = np.hypot(xj - xi, yj - yi)
                    
                    if no_i == no:
                        cx, cy = (xj - xi) / L, (yj - yi) / L
                    else:
                        cx, cy = (xi - xj) / L, (yi - yj) / L
                        
                    A[eq_h, i] += cx
                    A[eq_v, i] += cy
                    
            if self.apoios[no] == 'fixo':
                A[eq_h, col_reacao] = 1.0
                A[eq_v, col_reacao + 1] = 1.0
                col_reacao += 2
            elif self.apoios[no] == 'movel':
                A[eq_v, col_reacao] = 1.0
                col_reacao += 1

        print("Matriz A montada com sucesso.")
        return A, b
