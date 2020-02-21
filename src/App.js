import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
	// Citas en local Storage
	let citasIniciales = JSON.parse(localStorage.getItem('citas'));
	if (!citasIniciales) {
		citasIniciales = [];
	}

	// Arreglo de citas
	const [citas, setCitas] = useState(citasIniciales);

	// Use effect para realizar ciertas operaciones cuando el State cambia
	useEffect(() => {
		if (citasIniciales) {
			localStorage.setItem('citas', JSON.stringify(citas));
		} else {
			localStorage.setItem('citas', JSON.stringify([]));
		}
	}, [citas, citasIniciales]);

	// Funcion que tome las citas actuales y agregue la nueva
	const crearCita = cita => {
		setCitas([...citas, cita]);
	};

	const eliminarCita = id => {
		const nuevasCitas = citas.filter(cita => cita.id !== id);

		setCitas(nuevasCitas);
	};

	// Mensaje condicional
	const titulo = citas.length === 0 ? 'Nos hay citas' : 'Administra tus citas';

	return (
		<>
			<h1>Administrador de Pacientes</h1>
			<div className='container'>
				<div className='row'>
					<div className='one-half column'>
						<Formulario crearCita={crearCita} />
					</div>
					<div className='one-half column'>
						<h2>{titulo}</h2>
						{citas.map(cita => (
							<Cita
								key={cita.id}
								cita={cita}
								eliminarCita={eliminarCita}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
