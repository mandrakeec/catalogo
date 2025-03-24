import os

# Ruta de la carpeta con las imágenes
carpeta = r"C:\Users\soporte2\Downloads\IMAGENES"

# Recorrer todos los archivos en la carpeta
for archivo in os.listdir(carpeta):
    if archivo.lower().endswith(".jpeg"):  # Verifica si el archivo tiene extensión .jpeg
        ruta_vieja = os.path.join(carpeta, archivo)
        ruta_nueva = os.path.join(carpeta, archivo[:-5] + ".jpg")  # Cambia la extensión
        os.rename(ruta_vieja, ruta_nueva)  # Renombra el archivo
        print(f"Renombrado: {archivo} -> {archivo[:-5]}.jpg")

print("Proceso completado.")




