import random
import statistics

# ==========================================================
# MONITORAMENTO DE PASTILHA DE FREIO - MOTO ESPORTIVA
# Exemplo: Suzuki GSX-R1000 (SRAD 1000)
# ==========================================================

# Cenário:
# A moto percorre 1 km.
# Do 0 até 850 m ela acelera até 200 km/h.
# Em 850 m ocorre frenagem brusca até parar.
#
# O sistema monitora:
# - Temperatura
# - Pressão
# - Vibração
#
# O programa calcula:
# - Média
# - Mínimo
# - Máximo
# - Desvio padrão
# - Quantidade de amostras válidas e descartadas
#
# Também:
# - Classifica cada leitura
# - Detecta eventos críticos
# - Gera relatório final
# ==========================================================


# ----------------------------------------------------------
# FUNÇÃO PARA GERAR DADOS SIMULADOS
# ----------------------------------------------------------

def gerar_dados():
    dados = []

    for distancia in range(0, 1001, 50):

        # FASE 1 - ACELERAÇÃO
        if distancia <= 850:

            velocidade = (distancia / 850) * 200

            temperatura = random.uniform(40, 120)
            pressao = random.uniform(20, 60)
            vibracao = random.uniform(1, 4)

        # FASE 2 - FRENAGEM BRUSCA
        else:

            velocidade = max(0, 200 - ((distancia - 850) * 1.5))

            temperatura = random.uniform(180, 450)
            pressao = random.uniform(80, 180)
            vibracao = random.uniform(5, 12)

        # Simular leituras inválidas
        if random.random() < 0.05:
            temperatura = -1

        if random.random() < 0.05:
            pressao = "ERRO"

        dados.append({
            "distancia": distancia,
            "velocidade": velocidade,
            "temperatura": temperatura,
            "pressao": pressao,
            "vibracao": vibracao
        })

    return dados


# ----------------------------------------------------------
# VALIDAÇÃO DOS DADOS
# ----------------------------------------------------------

def validar(valor):

    if isinstance(valor, (int, float)) and valor >= 0:
        return True

    return False


# ----------------------------------------------------------
# CLASSIFICAÇÃO
# ----------------------------------------------------------

def classificar(valor, alerta, critico):

    if valor >= critico:
        return "CRÍTICO"

    elif valor >= alerta:
        return "ALERTA"

    else:
        return "NORMAL"


# ----------------------------------------------------------
# PROCESSAMENTO DOS DADOS
# ----------------------------------------------------------

def processar_sensor(nome, valores, alerta, critico):

    validos = []
    descartados = 0

    classificacoes = []

    eventos_criticos = 0
    maior_sequencia = 0
    sequencia_atual = 0

    for valor in valores:

        # Validar leitura
        if validar(valor):

            validos.append(valor)

            estado = classificar(valor, alerta, critico)

            classificacoes.append(estado)

            # Detectar eventos críticos
            if valor >= critico:

                eventos_criticos += 1
                sequencia_atual += 1

                if sequencia_atual > maior_sequencia:
                    maior_sequencia = sequencia_atual

            else:
                sequencia_atual = 0

        else:
            descartados += 1

    # Estatísticas
    media = statistics.mean(validos)
    minimo = min(validos)
    maximo = max(validos)

    if len(validos) > 1:
        desvio = statistics.stdev(validos)
    else:
        desvio = 0

    # Contagem dos estados
    normal = classificacoes.count("NORMAL")
    alerta_qtd = classificacoes.count("ALERTA")
    critico_qtd = classificacoes.count("CRÍTICO")

    # Relatório do sensor
    relatorio = {
        "sensor": nome,
        "media": media,
        "minimo": minimo,
        "maximo": maximo,
        "desvio": desvio,
        "validos": len(validos),
        "descartados": descartados,
        "normal": normal,
        "alerta": alerta_qtd,
        "critico": critico_qtd,
        "eventos_criticos": eventos_criticos,
        "maior_sequencia": maior_sequencia
    }

    return relatorio


# ----------------------------------------------------------
# RELATÓRIO FORMATADO
# ----------------------------------------------------------

def mostrar_relatorio(relatorio, unidade):

    print("\\n===================================================")
    print(f"SENSOR: {relatorio['sensor']}")
    print("===================================================")

    print(f"Média: {relatorio['media']:.2f} {unidade}")
    print(f"Mínimo: {relatorio['minimo']:.2f} {unidade}")
    print(f"Máximo: {relatorio['maximo']:.2f} {unidade}")
    print(f"Desvio padrão: {relatorio['desvio']:.2f}")

    print(f"\\nAmostras válidas: {relatorio['validos']}")
    print(f"Amostras descartadas: {relatorio['descartados']}")

    print("\\nCLASSIFICAÇÃO")
    print(f"Normal: {relatorio['normal']}")
    print(f"Alerta: {relatorio['alerta']}")
    print(f"Crítico: {relatorio['critico']}")

    print("\\nEVENTOS")
    print(f"Medições críticas: {relatorio['eventos_criticos']}")
    print(f"Maior sequência crítica: {relatorio['maior_sequencia']}")


# ----------------------------------------------------------
# PROGRAMA PRINCIPAL
# ----------------------------------------------------------

dados = gerar_dados()

temperaturas = [d["temperatura"] for d in dados]
pressoes = [d["pressao"] for d in dados]
vibracoes = [d["vibracao"] for d in dados]

# Limiares de engenharia
rel_temp = processar_sensor(
    "TEMPERATURA",
    temperaturas,
    alerta=120,
    critico=250
)

rel_pressao = processar_sensor(
    "PRESSÃO",
    pressoes,
    alerta=70,
    critico=120
)

rel_vibracao = processar_sensor(
    "VIBRAÇÃO",
    vibracoes,
    alerta=4,
    critico=8
)

# Exibir relatórios
mostrar_relatorio(rel_temp, "°C")
mostrar_relatorio(rel_pressao, "Bar")
mostrar_relatorio(rel_vibracao, "g")
