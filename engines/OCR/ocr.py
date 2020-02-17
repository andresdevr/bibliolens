import sys #importa el sys para leer los argumentos pasados al llamar este script
import pytesseract as pyt #importamos tesseract la OCR encargada de leer texto de imagenes
pyt.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe" #busca el ejecutable de pytesseract
from PIL import Image #importamos el manejo de imagenes
from PIL import ImageFilter
from base64 import b64decode as decode #importamos el decodificador de uri
import json
from datauri import DataURI

uri = sys.argv[1] #lee el argumento enviado por addBook.js la uri
encoded = uri.split(',', 1)[1] #extrae solo la informacion de contruccion de la uri

data = decode(encoded) #decodifica la informacion de uri

with open("./engines/OCR/image.png", "wb") as f: #guarda la informacion como una imagen
    f.write(data) #guarda la imagen

image = Image.open('./engines/OCR/image.png').convert('LA') #abre la imagen con PIL en escala de grises
image = image.filter(ImageFilter.UnsharpMask(2, 150, 3)) #aplica un filtro para que las esquinas resalten
image.save('./engines/OCR/image_processed.png')
text = pyt.image_to_string(image, lang='eng') #tesseract extrae la informacion de la imagen


uri = DataURI.from_file('./engines/OCR/image_processed.png') #crea la imagen procesada en formato uri
#crea un diccionario con los datos a envia a js
dataRead = \
{
    'image': uri,
    'words': text
}
print(json.dumps(dataRead)) #imprime la informacion en formato JSON 
