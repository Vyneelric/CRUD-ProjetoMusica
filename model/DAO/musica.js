/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de música no Banco de Dados
 * Data: 11/02/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova música
const insertMusica = async function(musica){
    try {

    let sql = `insert into tbl_musica
    ( nome,
      duracao,
      data_lancamento,
      letra,
      link)
      values('${musica.nome}',
             '${musica.duracao}',
             '${musica.data_lancamento}',
             '${musica.letra}',
             '${musica.link}'
      )`

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


//Função para atualizar uma música adicionada
const updateMusica = async function(musica){
try {
    let sql = `update tbl_musica set 
        nome =                  '${musica.nome}',
        duracao =               '${musica.duracao}',
        data_lancamento =       '${musica.data_lancamento}',
        letra =                 '${musica.letra}',
        link =                  '${musica.link}'
    where id =                   ${musica.id}`

    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true //Pega os bag do banco e manda pa nois
    else
        return false //Deu pau em algo do banco

} catch (error) {
    return false //Bug de Programação
}

}

//Função para excluir uma música existente
const deleteMusica = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_musica where id = ${id}`
    
        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let resultMusica = await prisma.$executeRawUnsafe(sql)
    
        if(resultMusica)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

//Função para retonar todas as músicas do Banco
const selectAllMusica = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_musica order by id desc'
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Utilizado para quando há uma devolutiva do banco (Select)
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }


}

//Função para buscar uma música pelo ID
const selectByIDMusica = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_musica where id = ${id}`
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
        let resultMusica = await prisma.$queryRawUnsafe(sql)
    
        if(resultMusica)
            return resultMusica //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }


}

module.exports = {
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIDMusica
}