import { useState, useEffect } from 'react';

function App() {
  const [tiempoTrabajo, setTiempoTrabajo] = useState(25);
  const [tiempoDescanso, setTiempoDescanso] = useState(5);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoTrabajo * 60);
  const [conteoActivo, setConteoActivo] = useState(false);

  const handleTiempoTrabajoChange = (event) => {
    setTiempoTrabajo(event.target.value);
    setTiempoRestante(event.target.value * 60);
  };

  const handleTiempoDescansoChange = (event) => {
    setTiempoDescanso(event.target.value);
  };

  const iniciarConteo = () => {
    setConteoActivo(true);
  };

  const detenerConteo = () => {
    setConteoActivo(false);
  };

  useEffect(() => {
    let intervalo;

    if (conteoActivo) {
      intervalo = setInterval(() => {
        setTiempoRestante((tiempoRestante) => {
          if (tiempoRestante > 0) {
            return tiempoRestante - 1;
          } else {
            setConteoActivo(false);
            setTiempoRestante(tiempoDescanso * 60);
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [conteoActivo, tiempoRestante, tiempoDescanso]);

  const segundos = tiempoRestante % 60;
  const minutos = Math.floor(tiempoRestante / 60);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const relojElement = document.getElementById('reloj');
      if (relojElement) {
        relojElement.innerText = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [segundos, minutos]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-screen-sm mx-auto box">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Aplicación Pomodoro</h1>
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="tiempoTrabajo" className="mb-2 text-3xl text-gray-700">Tiempo de trabajo:</label>
          <div className="flex items-center">
            <input
              id="tiempoTrabajo"
              min="1"
              value={tiempoTrabajo}
              onChange={handleTiempoTrabajoChange}
              className="w-16 p-1 border border-gray-300 rounded text-2xl"
            />
            <span className="ml-2 text-3xl text-gray-700">minutos</span>
          </div>
        </div>
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="tiempoDescanso" className="mb-2 text-3xl text-gray-700">Tiempo de descanso:</label>
          <div className="flex items-center">
            <input
              id="tiempoDescanso"
              min="1"
              value={tiempoDescanso}
              onChange={handleTiempoDescansoChange}
              className="w-16 p-1 border border-gray-300 rounded text-2xl"
            />
            <span className="ml-2 text-3xl text-gray-700">minutos</span>
          </div>
        </div>
        <br />
        <div className="mt-6 box">
          {conteoActivo ? (
            <button onClick={detenerConteo} className="px-4 py-2 bg-red-500 text-white rounded">
              Detener
            </button>
          ) : (
            <button onClick={iniciarConteo} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-800">
              Iniciar
            </button>
          )}
        </div>
        <br />
        <div className="p-8 shadow space-y-5 rounded box">
          <div className="text-center text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 via-purple-600 font-mono whitespace-nowrap" id="reloj">
            {minutos.toString().padStart(2, '0')}:{segundos.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
