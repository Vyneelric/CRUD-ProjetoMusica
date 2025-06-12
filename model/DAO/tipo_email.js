const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertNovoTipoEmail = async function(tipo_email){
try {
    let sql = `insert into tbl_tipo_email
    (   nome,
        id_artista,
        id_usuario)
    values(  '${tipo_email.nome}',
             '${tipo_email.id_artista}',
             '${tipo_email.id_usuario}'
    )`

    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false //Bug no banco de dados

    } catch(error){
        return false //Bug de programação.
    }

}

const updateTipoEmail = async function(tipo_email){
try {
    let sql = `update tbl_tipo_email set 
        nome =                         '${tipo_email.nome}',
        id_artista =                   '${tipo_email.id_artista}',
        id_usuario =                   '${tipo_email.id_usuario}'
    where id =                         ${tipo_email.id}`

    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true //Pega os bag do banco e manda pa nois
    else
        return false //Deu pau em algo do banco

} catch (error) {
    return false //Bug de Programação
}

}

const deleteTipoEmail = async function(id){
    try {
        let sql = `delete from tbl_tipo_email where id_tipo_email = ${id}`
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

const selectAllTipoEmail = async function(){
    try {
        let sql = 'select * from tbl_tipo_email order by id_tipo_email desc'
    
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

const selectByIDTipoEmail = async function(id){
    try {
        let sql = `select * from tbl_tipo_email where id_tipo_email = ${id}`
    
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

module.exports = {
    insertNovoTipoEmail,
    updateTipoEmail,
    deleteTipoEmail,
    selectAllTipoEmail,
    selectByIDTipoEmail
}