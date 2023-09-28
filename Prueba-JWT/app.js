const express = require('express');
const jwt = require("jsonwebtoken");
const config = require('./public/scripts/config');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/user', (req, res, next) => {
    console.log('Por aquí pasamos');
    next();
});

// ********User*********//
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.post('/sinup', (req, res) => {
    console.log(`Post pagina de login ${req.body.username}`);
    console.log(`Post pagina de login ${req.body.password}`);

    if (`${req.body.username}` === 'rebeca' && `${req.body.password}` === '20') {
        console.log('Nombre: ' + `${req.body.username}` + ', Password: ' + `${req.body.password}`);
        const user = {
            nombre: `${req.body.username}`,
            password: `${req.body.password}`
        };

        // Generar el token JWT y mostrarlo en la consola
        const token = jwt.sign({ user: user }, 'secretkey', { expiresIn: '32s' }); // Expire en el tiempo que desee
        console.log('Token JWT generado:', token); // Mostrar el token en la consola del servidor

        // Envía una respuesta al cliente (puedes eliminar esta línea si no deseas enviar el token al cliente)
        res.json({ token: token });
    } else {
        return res.status(401).json({
            auth: false,
            message: 'Credenciales inválidas'
        });
    }
});


app.post('/sinin', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        } else {
            // Enviar el archivo index.html como respuesta
            res.sendFile(__dirname + '/public/index.html');
        }
    });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(401).json({ error: 'Token no proporcionado' });
    }
}

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000, http://localhost:3000/');
});
