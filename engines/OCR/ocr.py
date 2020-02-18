import sys #importa el sys para leer los argumentos pasados al llamar este script
import pytesseract as pyt #importamos tesseract la OCR encargada de leer texto de imagenes
pyt.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe" #busca el ejecutable de pytesseract
from PIL import Image #importamos el manejo de imagenes
from PIL import ImageFilter #importamos el modulo de filtros de PIL
from base64 import b64decode as decode #importamos el decodificador de uri
from base64 import b64encode as encode #importamos el codificador de uri
import json #importamos json para convertir diccionarios
from io import BytesIO #importamos entradas y salidas para leer archivo en vivo

uri = sys.argv[1] #obtenemos el arguneto enviado por js(uri)
encoded = uri.split(',', 1)[1] #extrae solo la informacion de contruccion de la uri

data = decode(encoded) #decodifica la informacion de uri

image = Image.open(BytesIO(data)).convert("LA") #abre la imagen con PIL en escala de grises
image = image.filter(ImageFilter.UnsharpMask(15, 150, 1)) #aplica un filtro para que las esquinas resalten

text = pyt.image_to_string(image, lang='eng') #tesseract extrae la informacion de la imagen

save = BytesIO() #creamos una instacia de io
image.save(save, 'PNG') #guardamos la imagen en la instancia de io

data64 = encode(save.getvalue()) #obtenemos el valor de iosave, y lo codificamos en base64

uri = u'data:img/png;base64,' + data64.decode('utf-8') #creamos el string apropiado

#crea un diccionario con los datos a envia a js
dataRead = \
{
    'image': uri,
    'words': text
}

print(json.dumps(dataRead)) #imprime la informacion en formato JSON 
