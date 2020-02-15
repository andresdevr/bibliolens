import sys #importa el sys para leer los argumentos pasados al llamar este script
import pytesseract as pyt #importamos tesseract la OCR encargada de leer texto de imagenes
pyt.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe" #busca el ejecutable de pytesseract
from PIL import Image #importamos el manejo de imagenes
from base64 import b64decode as decode #importamos el decodificador de uri

uri = sys.argv[1] #lee el argumento enviado por addBook.js la uri
encoded = uri.split(',', 1)[1] #extrae solo la informacion de contruccion de la uri

data = decode(encoded) #decodifica la informacion de uri

with open("./engines/OCR/image.png", "wb") as f: #guarda la informacion como una imagen
    f.write(data) #guarda la imagen

image = Image.open('./engines/OCR/image.png') #abre la imagen con PIL
text = pyt.image_to_string(image) #tesseract extrae la informacion de la imagen

print(text) #imprime la informacion de la imagen la cual capta js
