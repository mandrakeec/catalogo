fetch('imagenes.json')
  .then(response => response.json())
  .then(data => {
    const imagenes = data.imagenes.map(img => img.replace(/\.[^/.]+$/, "")); // Quitar extensión
    const catalogoGrid = document.getElementById('catalogo-grid');

    // Crear catálogo de imágenes
    imagenes.forEach((imagen, index) => {
      const producto = document.createElement('div');
      producto.classList.add('producto');

      const img = document.createElement('img');
      img.src = `images/${data.imagenes[index]}`; // Mantener la extensión en la ruta
      img.alt = `Producto ${imagen}`;
      img.classList.add('imagen-catalogo');

      const descripcion = document.createElement('p');
      descripcion.textContent = imagen; // Mostrar solo el nombre sin extensión

      producto.appendChild(img);
      producto.appendChild(descripcion);
      catalogoGrid.appendChild(producto);
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.querySelector('.lightbox-imagen');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    let indiceActual = 0;

    // Abrir lightbox al hacer clic en una imagen
    document.querySelectorAll('.imagen-catalogo').forEach((imagen, index) => {
      imagen.addEventListener('click', () => {
        indiceActual = index;
        actualizarLightbox();
        lightbox.style.display = 'flex';
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

    // Función para actualizar la imagen del lightbox
    function actualizarLightbox() {
      lightboxImagen.src = `images/${data.imagenes[indiceActual]}`;
    }

    // Detectar deslizamiento táctil para cambiar de imagen
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxImagen.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    lightboxImagen.addEventListener('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    });

    lightboxImagen.addEventListener('touchend', () => {
      if (touchStartX - touchEndX > 50) {
        // Deslizar hacia la izquierda (siguiente imagen)
        indiceActual = (indiceActual + 1) % imagenes.length;
        actualizarLightbox();
      } else if (touchEndX - touchStartX > 50) {
        // Deslizar hacia la derecha (imagen anterior)
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        actualizarLightbox();
      }
    });

  })
  .catch(error => console.error('Error al cargar el catálogo:', error));
