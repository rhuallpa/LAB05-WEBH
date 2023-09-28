document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Realiza una solicitud POST al servidor para iniciar sesión
    fetch('/sinup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Token JWT obtenido con éxito, almacénalo en el almacenamiento local
            localStorage.setItem('token', data.token);

            // Redirige al usuario a la página de inicio o realiza otras acciones necesarias
            window.location.href = '/index-2.html'; // Cambia esto a la ruta correcta
        } else {
            // Manejar el caso de inicio de sesión fallido
            console.error('Inicio de sesión fallido');
        }
    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error en la solicitud de inicio de sesión:', error);
    });
});
