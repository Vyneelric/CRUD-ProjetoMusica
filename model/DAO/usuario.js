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
const insertNovoUsuario = async function(usuario){
    try {

    let sql = `insert into tbl_usuarios
    (   nome_usuario,
        email,
        senha,
        data_criacao,
        foto_perfil,
        id_assinatura)
    values(  '${usuario.nome_usuario}',
             '${usuario.email}',
             '${usuario.senha}',
             '${usuario.data_criacao}',
             '${usuario.foto_perfil}',
             '${usuario.id_assinatura}')`
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
const updateUsuario = async function(usuario){
try {
    let sql = `update tbl_usuarios set 
        nome_usuario =                        '${usuario.nome_usuario}',
        email =                               '${usuario.email}',
        senha =                               '${usuario.senha}',
        data_criacao =                        '${usuario.data_criacao}',
        foto_perfil =                         '${usuario.foto_perfil}',
        id_assinatura =                       '${usuario.id_assinatura}'
    where id =                         ${usuario.id}`

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
const deleteUsuario = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_usuarios where id = ${id}`
    
        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

//Função para retonar todas as músicas do Banco
const selectAllUsuarios = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_usuarios order by id desc'
    
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
const selectByIDUsuarios = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_usuarios where id = ${id}`
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
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
    insertNovoUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectByIDUsuarios
}
