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

create table tbl_playlists (
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



#Mostrar tabelas

show tables;

select * from tbl_assinatura;
select * from tbl_genero;


