/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertMusicaGenero = async function(musicaGenero){
  try {

      let sql = `insert into tbl_musica_genero  ( 
                                          id_musica,
                                          id_genero
                                        ) 
                                          values 
                                        (
                                          ${musicaGenero.id_musica},
                                          ${musicaGenero.id_genero}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateMusicaGenero = async function(musicaGenero){
  try {
      let sql = `update tbl_musica_genero set        id_musica       = ${musicaGenero.id_musica},
                                                    id_genero      = ${musicaGenero.id_genero}
                                        
                            where id = ${musicaGenero.id}                
                            `
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteMusicaGenero = async function(id){
  try {
    let sql = `delete from tbl_musica_genero where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllMusicaGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_musica_genero order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdMusicaGenero = async function(id){
  try {
    let sql = `select * from tbl_musica_genero where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os filmes pelo genero
const selectMusicaByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_musica.* from tbl_musica 
                                            inner join tbl_musica_genero
                                              on tbl_musica.id = tbl_musica_genero.id_musica
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_musica_genero.id_genero
                  where tbl_musica_genero.id_genero = ${idGenero}`

      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os generos pelo Filme
const selectGeneroByIdMusica = async function(idMusica){
 try {
      let sql = `select tbl_genero.* from tbl_musica 
                                            inner join tbl_musica_genero
                                              on tbl_musica.id = tbl_musica_genero.id_filme
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_musica_genero.id_genero
                  where tbl_musica_genero.id_musica = ${idMusica}`
                  
      let result = await prisma.$queryRawUnsafe(sql)

    if (result)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}


module.exports = {
    insertMusicaGenero,
    updateMusicaGenero,
    deleteMusicaGenero,
    selectAllMusicaGenero,
    selectByIdMusicaGenero,
    selectMusicaByIdGenero,
    selectGeneroByIdMusica
} 