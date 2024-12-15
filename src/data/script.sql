CREATE TABLE [UnidadOrganizacional] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [EmpresaId] INT,
    [Nombre] varchar(255),
    [Abreviatura] char(3),
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [UnidadOrganizacionalUsuario] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [UsuarioId] int,
    [UnidadOrganizacionalId] int
)

CREATE TABLE [UnidadOrganizacionalSistema] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [UnidadOrganizacionalId] int,
    [SistemaId] int,
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [MostrarMenu] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [UnidadOrganizacionalId] int,
    [MenuId] int,
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [Usuario] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Nombre] varchar(50),
    [ApellidoMaterno] varchar(50),
    [ApellidoPaterno] varchar(50),
    [Correo] nvarchar(255) UNIQUE,
    [Password] varchar(100),
    [Imagen] varchar(MAX),
    [Estado] bit DEFAULT 1,
    [TokenRecuperacion] varchar(MAX)
)

CREATE TABLE [UsuarioRol] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [RolId] int,
    [UsuarioId] int,
    [FechaAsigancion] datetime,
    [Expiracion] datetime,
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [Rol] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Titulo] varchar(50),
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [RolPermisos] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [PermisoId] int,
    [RolId] int UNIQUE
)

CREATE TABLE [Permisos] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Titulo] varchar(50),
    [Estado] bit DEFAULT 1,
)

CREATE TABLE [Sistema] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Titulo] varchar(100) UNIQUE,
    [Descripcion] varchar(MAX),
    [Color] varchar(50),
    [Url] varchar(MAX),
    [Estado] bit DEFAULT 1,
    [Imagen] varchar(MAX)
)

CREATE TABLE [Modulo] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Titulo] varchar(100),
    [Descripcion] varchar(MAX),
    [Color] varchar(50),
    [Icon] varchar(50),
    [Estado] bit DEFAULT 1,
    [SistemaId] int
)


CREATE TABLE [Menu] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [Titulo] varchar(100),
    [Icon] varchar(50),
    [Url] varchar(MAX),
    [Estado] bit DEFAULT 1,
    [ModuloId] int
)

CREATE TABLE [ConfigMenuRol] (
    [Id] int PRIMARY KEY IDENTITY(1, 1),
    [MenuId] int,
    [RolId] int,
    [Activo] bit,
    [Estado] bit DEFAULT 1
)

ALTER TABLE [Modulo]
ADD FOREIGN KEY ([SistemaId]) REFERENCES [Sistema] ([Id])

ALTER TABLE [Menu]
ADD FOREIGN KEY ([ModuloId]) REFERENCES [Modulo] ([Id])

ALTER TABLE [UsuarioRol]
ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])

ALTER TABLE [UsuarioRol]
ADD FOREIGN KEY ([UsuarioId]) REFERENCES [Usuario] ([Id])

ALTER TABLE [ConfigMenuRol]
ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])

ALTER TABLE [ConfigMenuRol]
ADD FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id])

ALTER TABLE [RolPermisos]
ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])

ALTER TABLE [RolPermisos]
ADD FOREIGN KEY ([PermisoId]) REFERENCES [Permisos] ([Id])

ALTER TABLE [UnidadOrganizacionalUsuario]
ADD FOREIGN KEY ([UnidadOrganizacionalId]) REFERENCES [UnidadOrganizacional] ([Id])

ALTER TABLE [UnidadOrganizacionalUsuario]
ADD FOREIGN KEY ([Id]) REFERENCES [Usuario] ([Id])

ALTER TABLE [UnidadOrganizacionalSistema]
ADD FOREIGN KEY ([UnidadOrganizacionalId]) REFERENCES [UnidadOrganizacional] ([Id])

ALTER TABLE [MostrarMenu]
ADD FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id])

ALTER TABLE [UnidadOrganizacionalSistema]
ADD FOREIGN KEY ([SistemaId]) REFERENCES [Sistema] ([Id])

ALTER TABLE [MostrarMenu]
ADD FOREIGN KEY ([UnidadOrganizacionalId]) REFERENCES [UnidadOrganizacional] ([Id])