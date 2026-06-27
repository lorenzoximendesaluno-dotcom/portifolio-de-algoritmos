# Transcrição de Códigos Desenvolvidos em Papel
# Conversor de Tempo / Ponte de Wheatstone / Laudo de SPT

def ponte_wheatstone(R1, R2, R3):
    # Calcula a resistência desconhecida Rx em um circuito de Ponte de Wheatstone em equilíbrio.
    try:
        if R1 <= 0:
            raise ValueError("R1 não pode ser zero ou negativo.")
        Rx = (R2 * R3) / R1
        return Rx
    except ValueError as e:
        return f"Erro de Validação: {e}"

def conversor_tempo(segundos_totais):
    if segundos_totais < 0:
        raise ValueError("Tempo de entrada não pode ser negativo.")
        
    horas = segundos_totais // 3600
    resto1 = (segundos_totais % 3600)
    minutos = resto1 // 60
    segundos = resto1 % 60
    
    return f"{horas}h {minutos}m {segundos}s"

print("Resistência Rx:", ponte_wheatstone(100, 200, 50), "Ohms")
print("Tempo Convertido:", conversor_tempo(7384))
