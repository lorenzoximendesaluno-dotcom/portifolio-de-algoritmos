export default function BiomassPlantDashboard() {
  const horas = Array.from({ length: 24 }, (_, i) => i)

  const potencia = [
    1.7,1.8,1.9,1.85,1.8,1.75,1.9,2.0,2.1,2.2,2.15,2.1,
    2.0,1.95,1.9,2.05,2.1,2.2,2.25,2.15,2.05,1.95,1.85,1.8
  ]

  const temperatura = [
    392,394,395,397,398,399,401,403,404,405,406,407,
    406,405,404,403,402,401,400,399,398,397,396,395
  ]

  const eficiencia = [
    72,73,74,74,75,76,77,78,79,80,81,81,
    80,80,79,79,78,78,77,76,75,74,73,72
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-gray-900 to-emerald-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            USINA BIOMASSA — CASCA DE ARROZ
          </h1>
          <p className="text-zinc-300 text-lg">
            Simulação Inteligente de Geração de Energia com Vapor Superaquecido a 400°C
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-emerald-500/30 shadow-2xl">
            <h2 className="text-sm text-zinc-400">Potência Gerada</h2>
            <div className="text-4xl font-bold mt-2 text-emerald-400">2.2 MW</div>
            <div className="mt-3 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full w-[88%] bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-red-500/30 shadow-2xl">
            <h2 className="text-sm text-zinc-400">Temperatura Vapor</h2>
            <div className="text-4xl font-bold mt-2 text-red-400">400°C</div>
            <div className="mt-3 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full w-[92%] bg-red-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-cyan-500/30 shadow-2xl">
            <h2 className="text-sm text-zinc-400">Eficiência Global</h2>
            <div className="text-4xl font-bold mt-2 text-cyan-400">81%</div>
            <div className="mt-3 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full w-[81%] bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-yellow-500/30 shadow-2xl">
            <h2 className="text-sm text-zinc-400">Consumo Biomassa</h2>
            <div className="text-4xl font-bold mt-2 text-yellow-400">1500 kg/h</div>
            <div className="mt-3 h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full w-[75%] bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-emerald-300">
              Fluxo Energético da Usina
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-4xl">
                  🌾
                </div>
                <div>
                  <div className="font-bold text-xl">Casca de Arroz</div>
                  <div className="text-zinc-400">Biomassa renovável</div>
                </div>
              </div>

              <div className="ml-10 h-10 border-l-2 border-dashed border-emerald-400"></div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center text-4xl animate-pulse">
                  🔥
                </div>
                <div>
                  <div className="font-bold text-xl">Fornalha</div>
                  <div className="text-zinc-400">Combustão controlada</div>
                </div>
              </div>

              <div className="ml-10 h-10 border-l-2 border-dashed border-cyan-400"></div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-4xl">
                  ♨️
                </div>
                <div>
                  <div className="font-bold text-xl">Caldeira</div>
                  <div className="text-zinc-400">Vapor superaquecido</div>
                </div>
              </div>

              <div className="ml-10 h-10 border-l-2 border-dashed border-purple-400"></div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/20 flex items-center justify-center text-4xl animate-spin">
                  ⚙️
                </div>
                <div>
                  <div className="font-bold text-xl">Turbina</div>
                  <div className="text-zinc-400">Conversão mecânica</div>
                </div>
              </div>

              <div className="ml-10 h-10 border-l-2 border-dashed border-green-400"></div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center text-4xl animate-pulse">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-xl">Gerador</div>
                  <div className="text-zinc-400">Energia elétrica</div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-cyan-300">
              Mapa Dinâmico Industrial
            </h2>

            <div className="relative h-[500px] rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-800 overflow-hidden border border-zinc-700">

              <div className="absolute top-8 left-8 bg-yellow-500/20 border border-yellow-400 p-4 rounded-2xl shadow-lg">
                🌾 Silo Biomassa
              </div>

              <div className="absolute top-36 left-28 text-5xl animate-bounce">
                ➜
              </div>

              <div className="absolute top-32 left-60 bg-red-500/20 border border-red-400 p-6 rounded-3xl shadow-2xl animate-pulse">
                🔥 Fornalha
              </div>

              <div className="absolute top-44 left-[420px] text-5xl animate-bounce">
                ➜
              </div>

              <div className="absolute top-28 right-12 bg-cyan-500/20 border border-cyan-400 p-6 rounded-3xl shadow-2xl">
                ♨️ Caldeira
              </div>

              <div className="absolute top-[260px] right-32 text-5xl animate-bounce">
                ↓
              </div>

              <div className="absolute bottom-24 right-24 bg-purple-500/20 border border-purple-400 p-6 rounded-3xl shadow-2xl animate-spin">
                ⚙️
              </div>

              <div className="absolute bottom-24 left-32 bg-green-500/20 border border-green-400 p-6 rounded-3xl shadow-2xl animate-pulse">
                ⚡ Gerador
              </div>

              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.4),transparent_60%)]"></div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="bg-zinc-900/70 rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-emerald-300">Potência 24h</h2>

            <div className="flex items-end gap-1 h-56">
              {potencia.map((p, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-emerald-700 to-emerald-300 transition-all duration-500 hover:scale-105"
                    style={{ height: `${p * 80}px` }}
                  ></div>
                  <span className="text-[10px] text-zinc-400 mt-1">{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/70 rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-red-300">Temperatura Vapor</h2>

            <div className="flex items-end gap-1 h-56">
              {temperatura.map((t, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-red-700 to-red-300 transition-all duration-500 hover:scale-105"
                    style={{ height: `${t * 0.45}px` }}
                  ></div>
                  <span className="text-[10px] text-zinc-400 mt-1">{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/70 rounded-3xl p-6 border border-zinc-700 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-cyan-300">Eficiência Térmica</h2>

            <div className="flex items-end gap-1 h-56">
              {eficiencia.map((e, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-cyan-700 to-cyan-300 transition-all duration-500 hover:scale-105"
                    style={{ height: `${e * 2}px` }}
                  ></div>
                  <span className="text-[10px] text-zinc-400 mt-1">{i}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="bg-zinc-900/70 rounded-3xl p-6 border border-zinc-700 shadow-2xl overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-yellow-300">
            Tabela Operacional Inteligente
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-300">
                <th className="p-3">Hora</th>
                <th className="p-3">Potência</th>
                <th className="p-3">Temperatura</th>
                <th className="p-3">Eficiência</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {horas.map((hora, i) => (
                <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all duration-300">
                  <td className="p-3">{hora}:00</td>
                  <td className="p-3 text-emerald-400">{potencia[i]} MW</td>
                  <td className="p-3 text-red-400">{temperatura[i]} °C</td>
                  <td className="p-3 text-cyan-400">{eficiencia[i]}%</td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      OPERANDO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl p-10 border border-cyan-500/20 shadow-2xl text-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-300 to-cyan-300 text-transparent bg-clip-text mb-4">
            CENTRAL DE ENERGIA RENOVÁVEL
          </h2>

          <p className="text-zinc-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Sistema inteligente de geração elétrica com biomassa agrícola utilizando combustão de casca de arroz,
            vapor superaquecido a 400°C, controle térmico avançado e monitoramento industrial em tempo real.
          </p>
        </div>

      </div>
    </div>
  )
}
