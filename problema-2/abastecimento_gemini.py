import pandas as pd

def analisar_abastecimento(dados_bairros):
    nomes, demandas, volumes_entregues, volumes_perdidos, custos_totais, autonomias, riscos = [], [], [], [], [], [], []

    for bairro in dados_bairros:
        nome = bairro['nome']
        demanda = bairro['demanda']
        v_inicial = bairro['v_inicial']
        perda = bairro['perda'] / 100
        custo_m3 = bairro['custo_m3']

        v_perdido = demanda * perda
        v_entregue = demanda + v_perdido
        custo_diario = v_entregue * custo_m3
        autonomia = v_inicial / demanda if demanda > 0 else 0
        
        if autonomia > 3:
            risco = "Baixo"
        elif 1 <= autonomia <= 3:
            risco = "Médio"
        else:
            risco = "Alto"

        nomes.append(nome)
        demandas.append(demanda)
        volumes_entregues.append(v_entregue)
        volumes_perdidos.append(v_perdido)
        autonomias.append(autonomia)
        riscos.append(risco)
        custos_totais.append(custo_diario)

    df = pd.DataFrame({
        'Bairro': nomes, 
        'Demanda (m3)': demandas,
        'Vol. Entregue (m3)': volumes_entregues, 
        'Perda (m3)': volumes_perdidos, 
        'Custo Diário (R$)': custos_totais, 
        'Autonomia (Dias)': autonomias, 
        'Risco': riscos
    })
    
    print("RELATÓRIO DE DESEMPENHO")
    print(df.to_string(index=False))

# Teste com dados mockados
bairros_teste = [
    {'nome': 'Centro', 'demanda': 1200, 'v_inicial': 4200, 'perda': 10, 'custo_m3': 0.50},
    {'nome': 'Industrial', 'demanda': 1500, 'v_inicial': 1000, 'perda': 8, 'custo_m3': 0.60}
]
analisar_abastecimento(bairros_teste)
