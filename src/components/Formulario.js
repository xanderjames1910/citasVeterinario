import React, { useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
	const [cita, setCita] = useState({
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: '',
	});

	const [error, setError] = useState(false);

	const handleChange = e => {
		setCita({
			...cita,
			[e.target.name]: e.target.value,
		});
	};

	const { mascota, propietario, fecha, hora, sintomas } = cita;

	const onSubmit = e => {
		e.preventDefault();

		// Validar
		if (
			mascota.trim() === '' ||
			propietario.trim() === '' ||
			fecha.trim() === '' ||
			hora.trim() === '' ||
			sintomas.trim() === ''
		) {
			setError(true);
		}

		// Eliminar mensaje de error previo
		setCita(false);

		// Asignar un ID
		cita.id = uuid();

		// Crear Cita
		crearCita(cita);

		// Reiniciar Formulario
		setCita({
			mascota: '',
			propietario: '',
			fecha: '',
			hora: '',
			sintomas: '',
		});
	};

	return (
		<>
			<h2>Creat Cita</h2>

			{error ? (
				<p className='alerta-error'>Todos los campos son obligatorios</p>
			) : null}

			<form onSubmit={onSubmit}>
				<label>Nombre Mascota</label>
				<input
					type='text'
					name='mascota'
					className='u-full-width'
					placeholder='Nombre Mascota'
					value={mascota}
					onChange={handleChange}
				/>
				<label>Nombre Dueño</label>
				<input
					type='text'
					name='propietario'
					className='u-full-width'
					placeholder='Nombre Dueño de la mascota'
					value={propietario}
					onChange={handleChange}
				/>
				<label>Fecha</label>
				<input
					type='date'
					name='fecha'
					className='u-full-width'
					value={fecha}
					onChange={handleChange}
				/>
				<label>Hora</label>
				<input
					type='time'
					name='hora'
					className='u-full-width'
					value={hora}
					onChange={handleChange}
				/>
				<label>Sintomas</label>
				<textarea
					className='u-full-width'
					name='sintomas'
					placeholder='Coloca los Sintomas'
					value={sintomas}
					onChange={handleChange}
				/>
				<button type='submit' className='u-full-width button-primary'>
					Agregar Cita
				</button>
			</form>
		</>
	);
};

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired,
};

export default Formulario;
