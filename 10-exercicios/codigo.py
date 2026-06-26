# Atividade: 10 Exercícios Básicos em Python
# Autor: Lorenzo Ximendes
# Curso: Engenharia Mecânica - UNIPAMPA

def calcular_imc(peso, altura):
    imc = peso / (altura ** 2)
    return imc

def conversor_temperatura(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

def velocidade_media(distancia, tempo):
    if tempo <= 0:
        raise ValueError("Tempo deve ser maior que zero.")
    return distancia / tempo

# Testes das funções estruturais
print("Velocidade Média (100km, 2h):", velocidade_media(100, 2), "km/h")
print("Conversão 25°C para F:", conversor_temperatura(25))
