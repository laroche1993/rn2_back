Estructura de la api
Rutas

users 
get (/api/users) CRUD
Ruta privada
Devuelve:{nombre,usuario,password,rol}


cars
get (api/cars) y get(api/cars/id)
Ruta publica
Devuelve: {fecha de creacion, fecha de actualizacion,capacidad de pasajeros,kilometros de venta, aire, color, version,año,cantidad de puertas,marca,modelo, nivel de combustible }


articles
get (/api/articles) CRUD
Metodos get publicos
Post,delete,put metodos privados
Devuelve: {titulo,categoria,fecha de creacion,usuario}

post(api/login)
Publico
Recive: {username,password}

post(api/buy_car)
Publica
Recive {  user{name, email, phon}  dateCita, carId }

post(api/sell_car)
Publica
Recive {  user {name, email, phon }  auto{year,marca, model, version, color, kms, postalCode, carId }