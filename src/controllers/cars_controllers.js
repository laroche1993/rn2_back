const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
})

const query = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"
const queryById = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"

const Cars = {
    getCars: async (req, res) => {
        try {
            let { page, amount } = req.body

            if (page == 0) {
                page = 1
            }

            const offset = page * amount - amount

            const cars = await pool.query(query + `LIMIT ${amount} OFFSET ${offset} `);
            res.json(cars.rows)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    getCarsById: async (req, res) => {
        try {
            const car = await pool.query(queryById + 'WHERE autos.id =' + req.params.id);
            res.json(car.rows)
            console.log('controller autos')
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //get a car to send by email
    getCarsForEmail: async (id) => {
        try {
            const car = await pool.query(queryById + 'WHERE autos.id =' + id);
            return car.rows
        } catch (error) {
            console.log(error)
        }
    },

    //filter by marc,year and model
    carsFilter: async (req, res, next) => {
        let { marca, anno, modelo } = req.body
        let filterByMarca = query + "WHERE"
        let count = 0
        if (marca) {
            filterByMarca = filterByMarca + 'marcasautos.nombremarca ='`${marca}`
            count = count + 1
        } if (anno) {
            if (count > 0) {
                filterByMarca = filterByMarca + "AND"
            }
            filterByMarca = filterByMarca + 'versionesautos.anno ='`${anno}`
            count = count + 1
        } if (modelo) {
            if (count > 0) {
                filterByMarca = filterByMarca + "AND"
            }
            filterByMarca = filterByMarca + 'modelosautos.nombremodeloauto ='`${modelo}`
        }
        try {
            const cars = await pool.query(filterByMarca);
            res.json(cars.rows)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
module.exports = Cars;
