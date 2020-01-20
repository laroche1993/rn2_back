const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
})

let query = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"
const queryById = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"

const Cars = {
    getCars: async (req, res) => {
        try {
            //if send a range define a limit and a offset for filters
            let { page, amount } = req.body
            
            let offset = null
            
            if(page && amount){
                if (page == 0) {
                    page = 1
                }
                offset = page * amount - amount
                
                query = query + `LIMIT ${amount} OFFSET ${offset} `
                
            }
            //get all cars
            const cars1 = await pool.query(query);
           
            //get all tramites for one car
            for (let index = 0; index < cars1.rows.length; index++) {
                const element = cars1.rows[index].id;
                console.log(element)                  
                let queryTramites = `SELECT tramites.numerotramite,tramites.created_at from public.tramites where tramites.auto_id = ${element}`
                let getTramites = await pool.query(queryTramites)
                let carsTramites = cars1.rows[index]         
                let go = {}
                let tramites = []                
                for (let index = 0; index < getTramites.rows.length; index++) {                   
                    tramites.push(getTramites.rows[index])
                    go = {tramites}
                }
                //add a new field
                Object.assign(carsTramites,go)
            }
           
            // get all nombredocumento and nombrereferencial from documento table 
            for (let index = 0; index < cars1.rows.length; index++) {
                const element = cars1.rows[index].id;               
                let queryImages = `SELECT nombredocumento,nombrereferencial FROM public.fotosautos JOIN public.documentos ON (fotosautos.documento_id = documentos.id) WHERE fotosautos.auto_id = ${element}`
                let getImages = await pool.query(queryImages)
                let carsImages = cars1.rows[index]                
                let go2 = {}
                let images = []                
                for (let index = 0; index < getImages.rows.length; index++) {                   
                    images.push(getImages.rows[index])
                    go2 = {images}
                }
                //add a new field
               Object.assign(carsImages,go2)              
                
            }
            //Ask

            res.json(cars1.rows)
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
        let { marca, anno, color } = req.body
        
        let filterBy = query + " WHERE"
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
            console.log("por aki paso",filterBy,count)
        }
        try {
            const cars = await pool.query(filterBy);
            res.json(cars.rows)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    //get params for filters
    getFiltersParams: async (req,res)=>{
       console.log("i am here")
       try {
           
        let marca = await pool.query("SELECT marcasautos.nombremarca FROM  marcasautos GROUP BY marcasautos.nombremarca")
        let color = await pool.query("SELECT coloresautos.nombrecolorauto FROM  coloresautos GROUP BY coloresautos.nombrecolorauto")
        let anno = await pool.query("SELECT versionesautos.anno FROM  versionesautos GROUP BY versionesautos.anno")
        marca = marca.rows
        color = color.rows
        anno = anno.rows
        const send  = {
            marca,
            color,
            anno          
        }
        console.log(send)
        res.json(send)
       } catch (error) {
        res.status(500).send(error)
       }
    }
}
module.exports = Cars;
