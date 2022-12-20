const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const textAreas = document.querySelectorAll('#form textarea')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	mensaje: /^[a-zA-ZÀ-ÿ\s]{1,300}$/
}

const campos = {
	nombre: false,
	correo: false,
	asunto: false,
	mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "asunto":
			validarCampo(expresiones.asunto, e.target, 'asunto');
			break;
		case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('form_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('form_grupo-correcto');

		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');

		document.querySelector(`#grupo_${campo} .form_input-error`).classList.remove('form_input-error-activo');

		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('form_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('form_grupo-correcto');

		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');

		document.querySelector(`#grupo_${campo} .form_input-error`).classList.add('form_input-error-activo');

		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

textAreas.forEach((textarea) => {
	textarea.addEventListener('keyup', validarFormulario);
	textarea.addEventListener('blur', validarFormulario);
});


form.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.correo && campos.asunto && campos.mensaje ){
		form.reset();

		document.getElementById('form_mensaje-exito').classList.add('form_mensaje-exito-activo');

		setTimeout(() => {
			document.getElementById('form_mensaje-exito').classList.remove('form_mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form_grupo-correcto').forEach((icono) => {
			icono.classList.remove('form_grupo-correcto');
		});
	} else {
		document.getElementById('form_mensaje').classList.add('form_mensaje-activo');
	}
});