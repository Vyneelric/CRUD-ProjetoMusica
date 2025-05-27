use db_controle_musicas_aa;

#Criação da tabela de músicas
create table tbl_musica(
	id 					int not null primary key auto_increment,
    nome 				varchar(100) not null,
    duracao 			time not null,
    data_lancamento 	date not null,
    letra 				text,
    link 				varchar(200)
);

create table tbl_artista (
	id 				int not null primary key auto_increment,
	nome 			varchar(100) not null,
	nome_completo 	varchar(150) not null,
	biografia 		text,
	foto_perfil 	text,
	senha 			varchar(100) not null,
	email 			varchar(150) not null
);

create table tbl_genero (
	id 		int not null primary key auto_increment,
	nome 	varchar(100) not null
);

CREATE TABLE tbl_musica_genero (
  id_musica_genero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_musica INT NOT NULL,
  id_genero INT NOT NULL,

  CONSTRAINT fk_musica_genero_musica
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),

  CONSTRAINT fk_musica_genero_genero
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

CREATE TABLE tbl_musica_playlist (
  id_musica_playlist INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_musica INT NOT NULL,
  id_playlist INT NOT NULL,

  CONSTRAINT fk_musica_playlist_musica
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),

  CONSTRAINT fk_musica_playlist_playlist
    FOREIGN KEY (id_playlist) REFERENCES tbl_playlist(id)
);


create table tbl_assinatura (
	id 			int not null primary key auto_increment,
	tipo_plano 	varchar(100) not null,
	data_inicio date, 
	data_fim 	date 
);

drop table tbl_assinatura;

create table tbl_usuarios (
	id      int not null primary key auto_increment,
	nome_usuario    varchar(45) not null,
	email           varchar(100) not null,
	senha           varchar(50) not null,
	data_criacao    date not null,
	foto_perfil     text,
	id_assinatura   int not null,
    
    constraint FK_USUARIOS_ASSINATURA 	#Cria um nome para o relacionamento
	foreign key (id_assinatura) 		#Especifica qual o atributo desta tabela será a FK
    references tbl_assinatura(id) 		#Especifica a origem da Chave, de qual tabela virá a PK
);

drop table tbl_usuarios;


create table tbl_playlist (
	id  int not null primary key auto_increment,
	titulo        varchar(45) not null,
	imagem_capa   text not null,
	id_usuario    int not null,
    
	constraint FK_USUARIOS_PLAYLISTS
	foreign key (id_usuario) 
    references tbl_usuarios(id)
);


create table tbl_albuns (
	id         int not null primary key auto_increment,
	titulo           varchar(45) not null,
	data_lancamento  date,
	imagem_capa      text not null,
	id_artista       int not null,

	constraint FK_ARTISTAS_ALBUNS
	foreign key (id_artista) 
    references tbl_artista(id)
);

CREATE TABLE tbl_artistas_generos (
  id_artista_genero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_artista INT NOT NULL,
  id_genero INT NOT NULL,

  CONSTRAINT fk_artistas_generos_genero
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id),

  CONSTRAINT fk_artistas_generos_artista
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);


CREATE TABLE tbl_tipo_email (
  id_tipo_email INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(20) NULL,
  id_artista INT NOT NULL,
  id_usuario INT NOT NULL,

  CONSTRAINT fk_tipo_email_artista
    FOREIGN KEY (id_artista) REFERENCES tbl_artista(id),

  CONSTRAINT fk_tipo_email_usuario
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id)
);

CREATE TABLE tbl_curtidas (
  id_curtida INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_musica INT NOT NULL,

  CONSTRAINT fk_curtidas_usuario
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id),

  CONSTRAINT fk_curtidas_musica
    FOREIGN KEY (id_musica) REFERENCES tbl_musica(id)
);


#Mostrar tabelas

show tables;

select * from tbl_assinatura;
select * from tbl_genero;


