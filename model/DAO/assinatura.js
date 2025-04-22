/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de assinatura no Banco de Dados
 * Data: 11/02/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir uma nova assinatura
const insertNovaAssinatura = async function(assinatura){
try {
    let dataInicio = assinatura.data_inicio == null ? 'NULL' : `'${assinatura.data_inicio}'`
    let dataFim = assinatura.data_fim == null ? 'NULL' : `'${assinatura.data_fim}'`
    let sql = `insert into tbl_assinatura(
	tipo_plano,
	data_inicio,
	data_fim
    )values( '${assinatura.tipo_plano}',
             ${dataInicio},
             ${dataFim}
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

//Função para atualizar uma genero já existente
const updateAssinatura = async function(assinatura){
try {
    let dataInicio = assinatura.data_inicio == null ? 'NULL' : `'${assinatura.data_inicio}'`
    let dataFim = assinatura.data_fim == null ? 'NULL' : `'${assinatura.data_fim}'`
    let sql = `update tbl_assinatura set 
        tipo_plano =                        '${assinatura.tipo_plano}',
        data_inicio =               ${dataInicio},
        data_fim =                   ${dataFim}
    where id =                         ${assinatura.id}`

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
const deleteAssinatura = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_assinatura where id = ${id}`
    
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
const selectAllAssinaturas = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_assinatura order by id desc'
    
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
const selectByIDAssinatura = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_assinatura where id = ${id}`
    
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
    insertNovaAssinatura,
    updateAssinatura,
    deleteAssinatura,
    selectAllAssinaturas,
    selectByIDAssinatura
}
