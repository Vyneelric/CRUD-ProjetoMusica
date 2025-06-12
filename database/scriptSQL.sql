#Cria o database
create database db_controle_musicas_aa;

use db_controle_musicas_aa;

CREATE TABLE tbl_assinatura (
	id 			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	tipo_plano 	VARCHAR(100) NOT NULL,
	data_inicio DATE, 
	data_fim 	DATE 
);

CREATE TABLE tbl_artista (
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome 			VARCHAR(100) NOT NULL,
	nome_completo 	VARCHAR(150) NOT NULL,
	biografia 		TEXT,
	foto_perfil 		TEXT,
	senha 			VARCHAR(100) NOT NULL,
	email 			VARCHAR(150) NOT NULL
);

CREATE TABLE tbl_genero (
	id 		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome 	VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_musica (
	id 					INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 				VARCHAR(100) NOT NULL,
    duracao 			TIME NOT NULL,
    data_lancamento 	DATE NOT NULL,
    letra 				TEXT,
    link 				VARCHAR(200)
);

CREATE TABLE tbl_usuarios (
	id     				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome_usuario    	VARCHAR(45) NOT NULL,
	email           	VARCHAR(100) NOT NULL,
	senha           	VARCHAR(50) NOT NULL,
	data_criacao    	DATE NOT NULL,
	foto_perfil     	TEXT,
	id_assinatura   	INT NOT NULL,
    
    CONSTRAINT FK_USUARIOS_ASSINATURA
		FOREIGN KEY (id_assinatura) REFERENCES tbl_assinatura(id)
);

CREATE TABLE tbl_playlist (
	id 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	titulo          VARCHAR(45) NOT NULL,
	imagem_capa     TEXT NOT NULL,
	id_usuario      INT NOT NULL,
    
	CONSTRAINT FK_USUARIOS_PLAYLISTS
		FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id)
);

CREATE TABLE tbl_albuns (
	id        		INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	titulo           VARCHAR(45) NOT NULL,
	data_lancamento  DATE,
	imagem_capa      TEXT NOT NULL,
	id_artista       INT NOT NULL,

	CONSTRAINT FK_ARTISTAS_ALBUNS
		FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

CREATE TABLE tbl_musica_genero (
	id_musica_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_musica 		INT NOT NULL,
	id_genero 		INT NOT NULL,

	CONSTRAINT fk_musica_genero_musica
		FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),

	CONSTRAINT fk_musica_genero_genero
		FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

CREATE TABLE tbl_musica_playlist (
	id_musica_playlist INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_musica 		INT NOT NULL,
	id_playlist 		INT NOT NULL,

	CONSTRAINT fk_musica_playlist_musica
		FOREIGN KEY (id_musica) REFERENCES tbl_musica(id),

	CONSTRAINT fk_musica_playlist_playlist
		FOREIGN KEY (id_playlist) REFERENCES tbl_playlist(id)
);

CREATE TABLE tbl_artistas_generos (
	id_artista_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_artista 		INT NOT NULL,
	id_genero 		INT NOT NULL,

	CONSTRAINT fk_artistas_generos_genero
		FOREIGN KEY (id_genero) REFERENCES tbl_genero(id),

	CONSTRAINT fk_artistas_generos_artista
		FOREIGN KEY (id_artista) REFERENCES tbl_artista(id)
);

CREATE TABLE tbl_tipo_email (
	id_tipo_email INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome 		VARCHAR(20) NULL,
	id_artista 	INT NOT NULL,
	id_usuario 	INT NOT NULL,

	CONSTRAINT fk_tipo_email_artista
		FOREIGN KEY (id_artista) REFERENCES tbl_artista(id),

	CONSTRAINT fk_tipo_email_usuario
		FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id)
);

CREATE TABLE tbl_curtidas (
	id_curtida INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	id_musica 	INT NOT NULL,

	CONSTRAINT fk_curtidas_usuario
		FOREIGN KEY (id_usuario) REFERENCES tbl_usuarios(id),

	CONSTRAINT fk_curtidas_musica
		FOREIGN KEY (id_musica) REFERENCES tbl_musica(id)
);




#Mostrar tabelas
show tables;

select * from tbl_assinatura;
select * from tbl_genero;


