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
const insertArtistaGenero = async function(artistaGenero){
  try {

      let sql = `insert into tbl_artistas_generos  ( 
                                          id_artista,
                                          id_genero
                                        ) 
                                          values 
                                        (
                                          '${artistaGenero.id_artista}',
                                          '${artistaGenero.id_genero}'
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
const updateArtistaGenero = async function(artistaGenero){
  try {
      let sql = `update tbl_artistas_generos set      id_artista     = ${artistaGenero.id_artista},
                                                    id_genero      = ${artistaGenero.id_genero}
                                        
                            where id = ${artistaGenero.id}                
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
const deleteArtistaGenero = async function(id){
  try {
    let sql = `delete from tbl_artistas_generos where id = ${id}`

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
const selectAllArtistaGenero = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_artistas_generos order by id desc'

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
const selectByIdArtistaGenero = async function(id){
  try {
    let sql = `select * from tbl_artistas_generos where id = ${id}`

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
const selectArtistaByIdGenero = async function(idGenero){
  try {
      let sql = `select tbl_artista.* from tbl_artista
                                            inner join tbl_artistas_generos
                                              on tbl_artista.id = tbl_artistas_generos.id_artista
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_artistas_generos.id_genero
                  where tbl_artistas_generos.id_genero = ${idGenero}`

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
const selectGeneroByIdArtista = async function(idArtista){
 try {
      let sql = `select tbl_genero.* from tbl_artista 
                                            inner join tbl_artistas_generos
                                              on tbl_musica.id = tbl_artistas_generos.id_artista
                                            inner join tbl_genero
                                              on tbl_genero.id = tbl_artistas_generos.id_genero
                  where tbl_artistas_generos.id_artista = ${idArtista}`
                  
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
    insertArtistaGenero,
    updateArtistaGenero,
    deleteArtistaGenero,
    selectAllArtistaGenero,
    selectByIdArtistaGenero,
    selectArtistaByIdGenero,
    selectGeneroByIdArtista
} 