from flask import Flask, render_template, jsonify
import random
from datetime import datetime

app = Flask(__name__)

START_TIME = datetime.now().timestamp() - (187 * 3600)  # 187h de Uptime

class PlantDataService:
    @staticmethod
    def get_realtime_kpis():
        potencia = round(random.uniform(2.12, 2.24), 2)
        capacidade_rede = 2.50
        carga_atual = round((potencia / capacidade_rede) * 100, 1)
        temperatura = random.randint(396, 408)
        pressao = round(random.uniform(41.8, 42.5), 1)
        
        # Semântica de segurança
        if temperatura <= 400:
            status_temp = "ESTÁVEL"
        elif temperatura <= 405:
            status_temp = "ALTA"
        else:
            status_temp = "CRÍTICA"

        co2_evitado = round(84.2 + (random.uniform(0.01, 0.05)), 3)

        return {
            "potencia": potencia,
            "carga_atual": carga_atual,
            "variacao_potencia": round(random.uniform(1.2, 3.5), 1),
            
            "temperatura": temperatura,
            "pressao": pressao,
            "status_temp": status_temp,
            
            "eficiencia": round(random.uniform(79.5, 81.8), 2),
            "delta_efic": round(random.uniform(0.5, 1.4), 1),
            
            "fluxo_biomassa": round(random.uniform(1.42, 1.58), 2),
            "rpm_turbina": random.randint(3596, 3604),
            "co2_evitado": co2_evitado,
            "co2_variacao": round(random.uniform(3.1, 4.2), 1)
        }

    @staticmethod
    def get_daily_history():
        return {
            "horas": list(range(24)),
            "potencia": [1.7, 1.8, 1.9, 1.85, 1.8, 1.75, 1.9, 2.0, 2.1, 2.2, 2.15, 2.1,
                         2.0, 1.95, 1.9, 2.05, 2.1, 2.2, 2.25, 2.15, 2.05, 1.95, 1.85, 2.18],
            "eficiencia": [78.2, 78.5, 79.0, 79.1, 78.8, 79.3, 79.9, 80.1, 80.5, 81.0, 81.2, 80.8,
                           80.4, 80.1, 79.8, 80.2, 80.7, 81.1, 81.5, 81.0, 80.5, 79.9, 79.2, 80.5]
        }

@app.route('/')
def dashboard():
    history = PlantDataService.get_daily_history()
    return render_template('index.html', history=history)

@app.route('/api/realtime')
def api_realtime():
    return jsonify(PlantDataService.get_realtime_kpis())

if __name__ == '__main__':
    app.run(debug=True, port=5000, threaded=True)