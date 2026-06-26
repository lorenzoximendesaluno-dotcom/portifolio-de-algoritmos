# Evolução Técnica - Refatoração e Otimização
# Foco: Redução de Complexidade Ciclomática e Legibilidade

import math

def calcular_trabalho_termodinamico_antigo(p_inicial, v_inicial, v_final, processo):
    # Código antigo, longo e aninhado
    if processo == 'isobarico':
        return p_inicial * (v_final - v_inicial)
    elif processo == 'isotermico':
        return p_inicial * v_inicial * math.log(v_final / v_inicial)
    else:
        return 0

def calcular_trabalho_termodinamico_otimizado(p_inicial, v_inicial, v_final, processo):
    # Versão refatorada utilizando dicionário de funções
    processos = {
        'isobarico': lambda: p_inicial * (v_final - v_inicial),
        'isotermico': lambda: p_inicial * v_inicial * math.log(v_final / v_inicial)
    }
    
    return processos.get(processo, lambda: 0)()

print("Trabalho Isotérmico Otimizado:", calcular_trabalho_termodinamico_otimizado(100000, 0.1, 0.2, 'isotermico'), "Joules")
