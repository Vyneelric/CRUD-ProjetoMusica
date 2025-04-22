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

create table tbl_assinatura (
	id 			int not null primary key auto_increment,
	tipo_plano 	varchar(100) not null,
	data_inicio date, 
	data_fim 	date 
);


#Mostrar tabelas

show tables;

select * from tbl_genero;


