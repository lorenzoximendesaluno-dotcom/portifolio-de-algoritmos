# Monitoramento de Freio - SRAD1000 (Modularização e Passagem de Parâmetros)
# Monitoria de Temperatura, Pressão e Vibração

import numpy as np

def validar_e_classificar(medicao, tipo_sensor):
    limiares = {
        'temperatura': {'alerta': 300, 'critico': 500},
        'pressao': {'alerta': 20, 'critico': 35},      
        'vibracao': {'alerta': 5, 'critico': 10}       
    }
    
    limites = limiares.get(tipo_sensor)
    if not limites:
        return 'Invalido'
        
    if medicao >= limites['critico']:
        return 'Crítico'
    elif medicao >= limites['alerta']:
        return 'Alerta'
    else:
        return 'Normal'

def analisar_sensor(dados, tipo_sensor):
    amostras_validas = [d for d in dados if d >= 0] 
    descartadas = len(dados) - len(amostras_validas)
    
    if not amostras_validas:
        return None
        
    media = np.mean(amostras_validas)
    minimo = np.min(amostras_validas)
    maximo = np.max(amostras_validas)
    desvio = np.std(amostras_validas)
    
    estados = [validar_e_classificar(d, tipo_sensor) for d in amostras_validas]
    eventos_criticos = estados.count('Crítico')
    
    max_seq = 0
    seq_atual = 0
    for estado in estados:
        if estado == 'Crítico':
            seq_atual += 1
            max_seq = max(max_seq, seq_atual)
        else:
            seq_atual = 0
            
    return {
        'estatisticas': {'media': media, 'min': minimo, 'max': maximo, 'std': desvio},
        'amostras': {'validas': len(amostras_validas), 'descartadas': descartadas},
        'eventos': {'total_criticos': eventos_criticos, 'maior_sequencia_critica': max_seq}
    }

dados_temp = [45, 80, 150, 280, 310, 480, 520, 530, 510, 490, 400]
print("--- RELATÓRIO DE TELEMETRIA: TEMPERATURA ---")
resultado = analisar_sensor(dados_temp, 'temperatura')
for k, v in resultado.items():
    print(f"{k.capitalize()}: {v}")
