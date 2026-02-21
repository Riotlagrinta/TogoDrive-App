import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
    🚀 Serveur TogoDrive lancé !
    📡 Port: ${PORT}
    🌍 URL: http://localhost:${PORT}
    🛠️  Mode: ${process.env.NODE_ENV || 'development'}
  `);
});
