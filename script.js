// Cargar el archivo JSON con la lista de imágenes
fetch('imagenes.json')
  .then(response => response.json())
  .then(data => {
    const imagenes = data.imagenes;
    const catalogoGrid = document.getElementById('catalogo-grid');

    // Generar el catálogo
    imagenes.forEach((imagen) => {
      const producto = document.createElement('div');
      producto.classList.add('producto');

      const img = document.createElement('img');
      img.src = `images/${imagen}`;
      img.alt = `Producto ${imagen}`;
      img.classList.add('imagen-catalogo'); // Añadimos la clase para el lightbox

      const descripcion = document.createElement('p');
      /*descripcion.textContent = `${imagen}`; */
      descripcion.textContent = imagen.replace(/\.[^/.]+$/, '');

      producto.appendChild(img);
      producto.appendChild(descripcion);
      catalogoGrid.appendChild(producto);
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.querySelector('.lightbox-imagen');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    // Abrir lightbox al hacer clic en una imagen
    document.querySelectorAll('.imagen-catalogo').forEach(imagen => {
      imagen.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImagen.src = imagen.src;
      });
    });

    // Cerrar lightbox al hacer clic en la "X"
    cerrarLightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  })
  .catch(error => console.error('Error al cargar el catálogo:', error));
