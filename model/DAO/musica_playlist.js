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
const insertMusicaPlaylist = async function(musicaPlaylist){
  try {

      let sql = `insert into tbl_musica_playlist  ( 
                                          id_musica,
                                          id_playlist
                                        ) 
                                          values 
                                        (
                                          '${musicaPlaylist.id_musica}',
                                          '${musicaPlaylist.id_playlist}'
                                        )`

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
const updateMusicaPlaylist = async function(musicaPlaylist){
  try {
      let sql = `update tbl_musica_playlist set        id_musica       = ${musicaPlaylist.id_musica},
                                                    id_playlist      = ${musicaPlaylist.id_playlist}
                                        
                            where id = ${musicaPlaylist.id}                
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
const deleteMusicaPlaylist = async function(id){
  try {
    let sql = `delete from tbl_musica_playlist where id = ${id}`

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
const selectAllMusicaPlaylist = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_musica_playlist order by id desc'

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
const selectByIdMusicaPlaylist = async function(id){
  try {
    let sql = `select * from tbl_musica_playlist where id = ${id}`

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
const selectMusicaByIdPlaylist = async function(idPlaylist){
  try {
      let sql = `select tbl_musica.* from tbl_musica 
                                            inner join tbl_musica_playlist
                                              on tbl_musica.id = tbl_musica_playlist.id_musica
                                            inner join tbl_playlist
                                              on tbl_playlist.id = tbl_musica_playlist.id_playlist
                  where tbl_musica_playlist.id_playlist = ${idPlaylist}`

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
const selectPlaylistByIdMusica = async function(idMusica){
 try {
      let sql = `select tbl_playlist.* from tbl_musica 
                                            inner join tbl_musica_playlist
                                              on tbl_musica.id = tbl_musica_playlist.id_musica
                                            inner join tbl_playlist
                                              on tbl_playlist.id = tbl_musica_playlist.id_playlist
                  where tbl_musica_playlist.id_musica = ${idMusica}`
                  
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
    insertMusicaPlaylist,
    updateMusicaPlaylist,
    deleteMusicaPlaylist,
    selectAllMusicaPlaylist,
    selectByIdMusicaPlaylist,
    selectMusicaByIdPlaylist,
    selectPlaylistByIdMusica
} 