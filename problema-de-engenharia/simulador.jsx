/**
 * Simulador Visual - Usina de Biomassa (Casca de Arroz)
 * Engenharia Aplicada - Frontend em React/JSX
 */

import React, { useState } from 'react';
import './UsinaStyles.css';

const SimuladorBiomassa = () => {
  const [cascaEntrada, setCascaEntrada] = useState(1000); 
  const [eficienciaCaldeira, setEficienciaCaldeira] = useState(85); 
  
  const PCI_KWH = 4.16; 
  
  const calcularEnergiaGerada = () => {
    const energiaBruta = cascaEntrada * PCI_KWH;
    const energiaReal = energiaBruta * (eficienciaCaldeira / 100);
    return (energiaReal * 0.25).toFixed(2);
  };

  return (
    <div className="simulador-container">
      <h2>Simulador de Geração Termelétrica - Biomassa</h2>
      
      <div className="controles-painel">
        <label>
          Entrada de Biomassa (kg/h):
          <input type="number" value={cascaEntrada} onChange={(e) => setCascaEntrada(e.target.value)} />
        </label>
        
        <label>
          Eficiência da Caldeira (%):
          <input type="range" min="50" max="95" value={eficienciaCaldeira} onChange={(e) => setEficienciaCaldeira(e.target.value)} />
          <span>{eficienciaCaldeira}%</span>
        </label>
      </div>

      <div className="dashboard-resultados">
        <h3>Potência Elétrica Estimada</h3>
        <div className="indicador-energia">
          <span className="valor">{calcularEnergiaGerada()}</span> kW
        </div>
      </div>
    </div>
  );
};

export default SimuladorBiomassa;
