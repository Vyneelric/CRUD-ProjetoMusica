const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertNovaCurtida = async function(curtidas){
try {
    let sql = `insert into tbl_curtidas
    (   id_usuario,
        id_musica)
    values(  '${curtidas.id_usuario}',
             '${curtidas.id_musica}'
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

const updateCurtida = async function(curtidas){
try {
    let sql = `update tbl_curtidas set 
        id_usuario =                  '${curtidas.id_usuario}',
        id_musica =                   '${curtidas.id_musica}'
    where id =                         ${curtidas.id}`

    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true //Pega os bag do banco e manda pa nois
    else
        return false //Deu pau em algo do banco

} catch (error) {
    return false //Bug de Programação
}

}

const deleteCurtida = async function(id){
    try {
        let sql = `delete from tbl_curtidas where id_curtida = ${id}`
    
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

const selectAllCurtidas = async function(){
    try {
        let sql = 'select * from tbl_curtidas order by id_curtida desc'
    
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

const selectByIDCurtidas = async function(id){
    try {
        let sql = `select * from tbl_curtidas where id_curtida = ${id}`
    
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
    insertNovaCurtida,
    updateCurtida,
    deleteCurtida,
    selectAllCurtidas,
    selectByIDCurtidas
}