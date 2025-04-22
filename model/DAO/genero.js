/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de genero no Banco de Dados
 * Data: 15/04/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()


//Função para inserir um novo genero
const insertNovoGenero = async function(genero){
    try {

    let sql = `insert into tbl_genero(nome)values('${genero.nome}')`

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
const updateGenero = async function(genero){
try {
    let sql = `update tbl_genero set 
        nome =                  '${genero.nome}'
    where id =                   ${genero.id}`

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
const deleteGenero = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_genero where id = ${id}`
    
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
const selectAllGeneros = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_genero order by id desc'
    
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
const selectByIDGenero = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_genero where id = ${id}`
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
        let resultGenero = await prisma.$queryRawUnsafe(sql)
    
        if(resultGenero)
            return resultGenero //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }

}

module.exports = {
    insertNovoGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIDGenero
}
