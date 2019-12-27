const {Pool} = require('pg')

const pool = new Pool({
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE,
    port:process.env.PG_PORT
})

const query  = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"
const queryById  = "SELECT autos.id,autos.created_at,autos.updated_at,autos.capacidadpasajero,autos.kmventas,autos.aire,coloresautos.nombrecolorauto,versionesautos.nombreversionauto,versionesautos.anno,versionesautos.cantidadpuerta,marcasautos.nombremarca,modelosautos.nombremodeloauto,nivelescombustiblesautos.nivelcombustiblevalor FROM public.autos JOIN public.coloresautos ON (autos.colorauto_id = coloresautos.id) JOIN versionesautos ON (autos.versionauto_id=versionesautos.id) JOIN public.modelosautos ON (versionesautos.modeloauto_id=modelosautos.id) LEFT JOIN public.nivelescombustiblesautos ON (autos.nivelcombustiblellegada_id=nivelescombustiblesautos.id) JOIN marcasautos ON(modelosautos.marcaauto_id=marcasautos.id)"

const Cars = {
    getCars: async (req, res) => {
        try {        
            const estudiante =  await pool.query(query);
            res.json(estudiante.rows)
         } catch (error) {
             console.log(error)
         }
    },

    getCarsById:async (req,res)=>{
        try {
            const estudiante =  await pool.query(queryById +'WHERE autos.id ='+req.params.id);
            res.json(estudiante.rows)
        } catch (error) {
            
        }
    }
}
module.exports = Cars