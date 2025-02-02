const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'imagenes.json');

// Leer la carpeta de imágenes
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error al leer la carpeta de imágenes:', err);
    return;
  }

  // Filtrar solo archivos de imagen
  const imagenes = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  // Guardar la lista en un archivo JSON
  fs.writeFile(outputFile, JSON.stringify({ imagenes }, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar el archivo JSON:', err);
    } else {
      console.log('Archivo JSON generado correctamente.');
    }
  });
});

