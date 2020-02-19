Estructura de la api
Funcionalidades

---------------------------------------------------------Autos--------------------------------------
Se obtienen los autos por la ruta 
GET localhost:4000/api/cars
Devuelve un arreglo de autos con los siguientes datos
"id": 352,
        "created_at": "2019-12-23T09:17:55.667Z",
        "updated_at": "2019-12-23T17:46:20.190Z",
        "capacidadpasajero": 0,
        "kmventas": 60000,
        "aire": true,
        "nombrecolorauto": "Negro",
        "nombreversionauto": "2016 Serie Z (Linea anterior) - 2 pts. Z4 35is M Sport, 340 HP, TA",
        "anno": 2016,
        "cantidadpuerta": "2",
        "nombremarca": "BMW",
        "nombremodeloauto": "Serie Z",
        "nivelcombustiblevalor": null,
        "UrlImagesAutos": [
            "/2019/TRAMITE-384/GALERIA/20190000010302.RN2.jpg",  --Una de estas rutas no existe--
            "/2019/TRAMITE-388/GALERIA/20190000010302.RN2.jpg"
        ]
    },
GET localhost:4000/api/cars/auto_id
Devuelve un auto

----------------------------------------------------Comprar autos--------------------------------------------
POST localhost:4000/api/buyCar
Recive 
{
    name
    email
    phon
    carId
    date ---fecha y hora de la cita--
    place  --lugar de la cita, todavia por definir los lugares--
    
}

Envia un correo al usuario y a la empresa(correo por definir) con los datos anteriores
----------------------------------------------------Vender autos--------------------------------------------
POST localhost:4000/api/sellCar
Recive 
{
   user:{
    name
    email
    phon
   },
   auto:{
       marca,
       model,
       version,
       color,
       kms
   }
        
    
}
Envia un correo al usuario y a la empresa(correo por definir) con los datos anteriores
----------------------------------------------------Empeñar autos--------------------------------------------
POST localhost:4000/api/pawnCar
Recive 
{
   user:{
    name
    email
    phon
   },
   auto:{
       marca,
       model,
       version,
       color,
       kms
   }
        
    
}
Envia un correo al usuario y a la empresa(correo por definir) con los datos anteriores
----------------------------------------------------Filtros--------------------------------------------
GET localhost:4000/api/car/getFiltersParams
Responde un listado de las marcas,annos y colores de los autos para hacer los filtros

GET localhost:4000/api/car/carsFilter
Recive 
{
    marca,
    anno,
    color
}
Devuelve un filtro con los datos de los autos

