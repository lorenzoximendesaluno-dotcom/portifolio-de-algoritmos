# Atividade: 15 Exercícios (Estruturas Condicionais)
# Foco: Validação de Regras de Negócio e Tomada de Decisão

def classificar_fluxo_fluido(reynolds):
    if reynolds < 2000:
        return "Escoamento Laminar"
    elif 2000 <= reynolds <= 4000:
        return "Escoamento de Transição"
    else:
        return "Escoamento Turbulento"

def verificar_resistencia_material(tensao_aplicada, limite_escoamento):
    fator_seguranca = limite_escoamento / tensao_aplicada
    if fator_seguranca >= 1.5:
        return "Seguro: Fator de Segurança adequado."
    elif 1.0 <= fator_seguranca < 1.5:
        return "Alerta: Próximo ao limite de escoamento."
    else:
        return "Falha Crítica: Tensão excede limite de segurança!"

# Exemplo de execução
print(classificar_fluxo_fluido(3500))
print(verificar_resistencia_material(250, 400))
