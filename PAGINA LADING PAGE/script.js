document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('miFormulario');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    const mensajeExitoDiv = document.getElementById('mensaje-exito');

    // Función para mostrar mensajes de error
    function mostrarError(inputElement, mensaje) {
        const contenedorCampo = inputElement.parentElement;
        const spanError = contenedorCampo.querySelector('.mensaje-error');
        spanError.textContent = mensaje;
        inputElement.classList.add('error-input'); // Opcional: añadir clase para estilizar el input con error
    }

    // Función para limpiar mensajes de error
    function limpiarError(inputElement) {
        const contenedorCampo = inputElement.parentElement;
        const spanError = contenedorCampo.querySelector('.mensaje-error');
        spanError.textContent = '';
        inputElement.classList.remove('error-input'); // Opcional: remover clase de error
    }

    // Función para validar el formato de email
    function validarEmail(email) {
        // Expresión regular simple para validación de email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evitar el envío real del formulario

        let esValido = true;

        // Limpiar errores previos
        limpiarError(nombreInput);
        limpiarError(emailInput);
        limpiarError(mensajeTextarea);

        // Validar campo Nombre
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput, 'El nombre es obligatorio.');
            esValido = false;
        }

        // Validar campo Email
        if (emailInput.value.trim() === '') {
            mostrarError(emailInput, 'El correo electrónico es obligatorio.');
            esValido = false;
        } else if (!validarEmail(emailInput.value.trim())) {
            mostrarError(emailInput, 'El formato del correo electrónico no es válido.');
            esValido = false;
        }

        // Validar campo Mensaje
        if (mensajeTextarea.value.trim() === '') {
            mostrarError(mensajeTextarea, 'El mensaje es obligatorio.');
            esValido = false;
        }
        // Opcional: Validar longitud máxima (aunque ya está en HTML con maxlength)
        /* else if (mensajeTextarea.value.length > 200) {
            mostrarError(mensajeTextarea, 'El mensaje no puede exceder los 200 caracteres.');
            esValido = false;
        } */


        // Si todo es válido
        if (esValido) {
            console.log('Formulario válido. Enviando datos (simulado)...');
            console.log('Nombre:', nombreInput.value);
            console.log('Email:', emailInput.value);
            console.log('Asunto:', document.getElementById('asunto').value);
            console.log('Mensaje:', mensajeTextarea.value);

            // Ocultar formulario y mostrar mensaje de éxito
            formulario.style.display = 'none';
            mensajeExitoDiv.style.display = 'block';

            // Opcional: Resetear el formulario después de un tiempo
            // setTimeout(() => {
            //     formulario.reset();
            //     limpiarError(nombreInput);
            //     limpiarError(emailInput);
            //     limpiarError(mensajeTextarea);
            //     formulario.style.display = 'block';
            //     mensajeExitoDiv.style.display = 'none';
            // }, 5000); // Resetear después de 5 segundos
        } else {
            console.log('Formulario inválido. Por favor, corrige los errores.');
        }
    });

    // Opcional: Limpiar errores mientras el usuario escribe
    nombreInput.addEventListener('input', () => limpiarError(nombreInput));
    emailInput.addEventListener('input', () => limpiarError(emailInput));
    mensajeTextarea.addEventListener('input', () => limpiarError(mensajeTextarea));

    // --- Lógica para cambio de tema ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const logoImg = document.getElementById('logo-img');
    const presentacionImg = document.getElementById('presentacion-img');
    const originalLogoSrc = 'logo.png'; // El logo siempre es logo.png
    const lightThemePresentacionSrc = 'iMAG2.png'; // Imagen para tema claro
    const darkThemePresentacionSrc = 'iMAG.png'; // Imagen para tema oscuro

    // Función para aplicar el tema
    function aplicarTema(esOscuro) {
        if (esOscuro) {
            bodyElement.classList.add('dark-theme');
            themeToggleButton.textContent = '☀️'; // Icono sol para tema oscuro
            if (logoImg) logoImg.src = originalLogoSrc; // El logo siempre es logo.png
            if (presentacionImg) presentacionImg.src = darkThemePresentacionSrc;
            localStorage.setItem('theme', 'dark');
        } else {
            bodyElement.classList.remove('dark-theme');
            themeToggleButton.textContent = '🌙'; // Icono luna para tema claro
            if (logoImg) logoImg.src = originalLogoSrc; // El logo siempre es logo.png
            if (presentacionImg) presentacionImg.src = lightThemePresentacionSrc;
            localStorage.setItem('theme', 'light');
        }
    }

    // Event listener para el botón
    themeToggleButton.addEventListener('click', () => {
        const esOscuroActual = bodyElement.classList.contains('dark-theme');
        aplicarTema(!esOscuroActual); // Invierte el tema actual
    });

    // Aplicar tema guardado al cargar la página
    const temaGuardado = localStorage.getItem('theme');
    // Si no hay tema guardado o es 'light', aplica claro (por defecto ya está)
    // Si el tema guardado es 'dark', aplica oscuro
    if (temaGuardado === 'dark') {
        aplicarTema(true);
    } else {
        // Asegura que el estado inicial sea el correcto si no hay tema guardado o es 'light'
        aplicarTema(false);
    }

    // --- Lógica para "Enviar Otro Formulario" ---
    const enviarOtroFormularioBtn = document.getElementById('enviar-otro-formulario');
    if (enviarOtroFormularioBtn) {
        enviarOtroFormularioBtn.addEventListener('click', () => {
            // Mostrar el formulario y ocultar el mensaje de éxito
            formulario.style.display = 'block';
            mensajeExitoDiv.style.display = 'none';

            // Limpiar los campos del formulario
            formulario.reset();

            // Limpiar los mensajes de error
            limpiarError(nombreInput);
            limpiarError(emailInput);
            limpiarError(mensajeTextarea);
        });
    }
});
