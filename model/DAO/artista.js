/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de artista no Banco de Dados
 * Data: 15/04/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo genero
const insertNovoArtista = async function(artista){
    try {

    let sql = `insert into tbl_artista
    (   nome,
	    nome_completo,
	    biografia,
	    foto_perfil,
	    senha,
	    email)
    values(  '${artista.nome}',
             '${artista.nome_completo}',
             '${artista.biografia}',
             '${artista.foto_perfil}',
             '${artista.senha}',
             '${artista.email}')`
    //Executa o script SQL no banco de dados e AGUARDA o resultado (retorna um true ou false)
    //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false //Bug no banco de dados

    } catch(error){
        return false //Bug de programação.
    }

}

//Função para atualizar uma genero já existente
const updateArtista = async function(artista){
try {
    let sql = `update tbl_artista set 
        nome =                        '${artista.nome}',
        nome_completo =               '${artista.nome_completo}',
        biografia =                   '${artista.biografia}',
        foto_perfil =                 '${artista.foto_perfil}',
        senha =                       '${artista.senha}',
        email =                       '${artista.email}'
    where id =                         ${artista.id}`

    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true //Pega os bag do banco e manda pa nois
    else
        return false //Deu pau em algo do banco

} catch (error) {
    return false //Bug de Programação
}

}

//Função para excluir um genero que já existe
const deleteArtista = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_artista where id = ${id}`
    
        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let resultGenero = await prisma.$executeRawUnsafe(sql)
    
        if(resultGenero)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

//Função para retonar todas as músicas do Banco
const selectAllArtistas = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_artista order by id desc'
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Utilizado para quando há uma devolutiva do banco (Select)
        let resultGenero = await prisma.$queryRawUnsafe(sql)
    
        if(resultGenero)
            return resultGenero //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }


}

//Função para buscar uma música pelo ID
const selectByIDArtista = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_artista where id = ${id}`
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
        let resultArtista = await prisma.$queryRawUnsafe(sql)
    
        if(resultArtista)
            return resultArtista //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }

}

module.exports = {
    insertNovoArtista,
    updateArtista,
    deleteArtista,
    selectAllArtistas,
    selectByIDArtista
}
