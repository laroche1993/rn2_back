const jwt = require("jsonwebtoken")
const verify={

tokenVerify: (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).json({message: "Peticion sin cabecera"})
    }else {
        var token1 = req.headers.authorization.split(' ')[1]
               
    }

 if (token1) {

    jwt.verify(token1,process.env.JWT_WORLD,(err,tokenDecode)=>{
        if (err) {
            res.status(401).json({mesage:"Error al verificar el token"})
        }else{
            console.log(tokenDecode)
            next()
        }
    })
}else{
    res.status(400).json({mesage: "No existe un token"})
} 
}

}

module.exports = verify;
