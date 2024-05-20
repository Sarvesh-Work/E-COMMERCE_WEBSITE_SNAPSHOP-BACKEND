const passport = require("passport")

exports.sanitizeUser=(user)=>{
    return {id:user.id,role:user.role}
}

exports.isAuth=()=>{
    return passport.authenticate('jwt')
}