const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
})

let query = "SELECT autos.id,ordenventa.valorventa,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)left join tramites on (autos.id = tramites.auto_id)left join ordenventa on (tramites.id = ordenventa.tramiteventa_id)JOIN tipostramites on (tramites.tipotramite_id = tipostramites.id)JOIN categoriasautos ON(categoriasautos.auto_id=autos.id)JOIN categorias ON(categoriasautos.categoria_id=categorias.id) where tipostramites.nombretipotramite = 'Venta'"
const queryById = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"

const Cars = {
    getCars: async (req, res) => {

        try {
            //if send a range define a limit and a offset for filters
            let { page, amount } = req.body

            let offset = null

            if (page && amount) {
                if (page == 0) {
                    page = 1
                }
                offset = page * amount - amount
                query = query + `LIMIT ${amount} OFFSET ${offset} `
            }
            //get all cars
            const cars1 = await pool.query(query);
            let copyCars = { ...cars1 }
            let carWithUrls
            let send = []
            let response = {}

            //get all url images for a car

            send = await Images.getImagesCars(copyCars)
            console.log(send)
            Object.assign(response, {
                data: send,
                status: 200
            })
            res.json(response)
        } catch (error) {
            res.status(500).send(error)
        }
    },


    getCarsById: async (req, res) => {

        try {
            const car = await pool.query(queryById + 'AND autos.id =' + req.params.id);
            let copyCars = { ...car }

            let send = []
            let response = {}

            //get all url images for a car
            send = await Images.getImagesCars(copyCars)
            console.log(send)
            Object.assign(response, {
                data: send,
                status: 200
            })

            res.json(response)
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

        let { marca, anno, color } = req.body
        console.log(marca, anno, color)
        let response = {}
        let filterBy = query + " AND"
        let count = 0
        if (marca) {
            filterBy = filterBy + ` marcasautos.nombremarca = '${marca}'`
            count = count + 1
        } if (anno) {
            if (count > 0) {
                filterBy = filterBy + "AND"
            }
            filterBy = filterBy + ` versionesautos.anno = '${anno}'`
            count = count + 1
        } if (color) {
            if (count > 0) {
                filterBy = filterBy + "AND"
            }
            filterBy = filterBy + ` coloresautos.nombrecolorauto = '${color}'`

        }
        try {
            const cars = await pool.query(filterBy);
            let copyCars = {...cars}
            let send = await Images.getImagesCars(copyCars)
            Object.assign(response, {
                data: send,
                status: 200
            })
            res.json(response)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //get params for filters
    getFiltersParams: async (req, res) => {
        console.log("i am here")
        try {

            let marca = await pool.query("SELECT marcasautos.nombremarca FROM  marcasautos GROUP BY marcasautos.nombremarca")
            let color = await pool.query("SELECT coloresautos.nombrecolorauto FROM  coloresautos GROUP BY coloresautos.nombrecolorauto")
            let anno = await pool.query("SELECT versionesautos.anno FROM  versionesautos GROUP BY versionesautos.anno")
            marca = marca.rows
            color = color.rows
            anno = anno.rows
            const send = {
                marca,
                color,
                anno
            }

            res.json(send)
        } catch (error) {
            res.status(500).send(error)
        }
    }
}
const Images = {
    getImagesCars: async function (copyCars) {
        let send = []
        let carWithUrls
        console.log("here")
        for (let index = 0; index < copyCars.rows.length; index++) {
            const element = copyCars.rows[index].id;
            //query tramites for a car
            let queryTramites = `SELECT tramites.numerotramite,tramites.created_at from public.tramites where tramites.auto_id = ${element}`
            let getTramites = await pool.query(queryTramites);
            //query images for a car
            let queryImages = `SELECT nombredocumento,nombrereferencial FROM public.fotosautos JOIN public.documentos ON (fotosautos.documento_id = documentos.id) WHERE fotosautos.auto_id = ${element}`
            let getImages = await pool.query(queryImages)
            //get a copy from cars
            let cars = { ...copyCars.rows[index] }
            let UrlImagesAutos = []
            for (let k = 0; k < getTramites.rows.length; k++) {
                const element = getTramites.rows[k];
                //get a year
                let year = new Date(element.created_at).getFullYear()
                let createUrl = `/${year}/TRAMITE-${element.numerotramite}/GALERIA/`
                //concat tramites with nombrereferencial images
                for (let l = 0; l < getImages.rows.length; l++) {
                    const element1 = getImages.rows[l];
                    let url = createUrl + `${element1.nombrereferencial}`
                    UrlImagesAutos.push(url)
                }
            }
            const Urls = { UrlImagesAutos }
            carWithUrls = Object.assign(cars, Urls);
            send.push(carWithUrls)
        }
        return send

    },

}
module.exports = Images
module.exports = Cars;
