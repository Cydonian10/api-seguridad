CREATE TABLE [UnidadOrganizacional] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [cNombre] varchar(255) UNIQUE,
  [cAbreviatura] char(3) UNIQUE
)


CREATE TABLE [UnidadOrganizacionalUsuario] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UsuarioId] int UNIQUE,
  [UnidadOrganizacionalId] int UNIQUE
)


CREATE TABLE [UnidadOrganizacionalSistema] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UnidadOrganizacionalId] int UNIQUE,
  [SistemaId] int UNIQUE,
  [Estado] bit
)


CREATE TABLE [MostrarMenu] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UnidadOrganizacionalId] int UNIQUE,
  [MenuId] int UNIQUE,
  [Estado] bit
)


CREATE TABLE [Usuario] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Nombre] varchar(50),
  [ApellidoMaterno] varchar(50),
  [ApellidoPaterno] varchar(50),
  [Correo] nvarchar(255) UNIQUE,
  [Password] varchar(100),
  [Imagen] varchar(MAX),
  [Estado] bit,
  [TokenRecuperacion] varchar(MAX)
)


CREATE TABLE [UsuarioRol] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RolId] int UNIQUE,
  [UsuarioId] int UNIQUE,
  [FechaAsigancion] datetime,
  [Expiracion] datetime,
  [Estado] bit
)


CREATE TABLE [Rol] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Titulo] varchar(50),
  [Estado] bit
)


CREATE TABLE [RolPermisos] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PermisoId] int,
  [RolId] int UNIQUE
)


CREATE TABLE [Permisos] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Titulo] varchar(50),
  [Estado] bit
)


CREATE TABLE [Sistema] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Titulo] varchar(100) UNIQUE,
  [Descripcion] varchar(MAX),
  [Color] varchar(50),
  [Url] varchar(MAX),
  [Estado] bit,
  [Imagen] varchar(MAX)
)


CREATE TABLE [Modulo] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Titulo] varchar(100),
  [Descripcion] varchar(MAX),
  [Color] varchar(50),
  [Icon] varchar(50),
  [Estado] bit,
  [SistemaId] int
)


CREATE TABLE [Menu] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Titulo] varchar(100),
  [Icon] varchar(50),
  [Url] varchar(MAX),
  [Estado] bit,
  [ModuloId] int
)


CREATE TABLE [ConfigMenuRol] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [MenuId] int UNIQUE,
  [RolId] int UNIQUE,
  [Activo] bit,
  [Estado] bit
)


ALTER TABLE [Modulo] ADD FOREIGN KEY ([SistemaId]) REFERENCES [Sistema] ([Id])


ALTER TABLE [Menu] ADD FOREIGN KEY ([ModuloId]) REFERENCES [Modulo] ([Id])


ALTER TABLE [UsuarioRol] ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])


ALTER TABLE [UsuarioRol] ADD FOREIGN KEY ([UsuarioId]) REFERENCES [Usuario] ([Id])


ALTER TABLE [ConfigMenuRol] ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])


ALTER TABLE [ConfigMenuRol] ADD FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id])


ALTER TABLE [RolPermisos] ADD FOREIGN KEY ([RolId]) REFERENCES [Rol] ([Id])


ALTER TABLE [RolPermisos] ADD FOREIGN KEY ([PermisoId]) REFERENCES [Permisos] ([Id])


ALTER TABLE [UnidadOrganizacionalUsuario] ADD FOREIGN KEY ([UnidadOrganizacionalId]) REFERENCES [UnidadOrganizacional] ([Id])


ALTER TABLE [UnidadOrganizacionalUsuario] ADD FOREIGN KEY ([Id]) REFERENCES [Usuario] ([Id])


ALTER TABLE [UnidadOrganizacionalSistema] ADD FOREIGN KEY ([UnidadOrganizacionalId]) REFERENCES [UnidadOrganizacional] ([Id])


ALTER TABLE [Sistema] ADD FOREIGN KEY ([Id]) REFERENCES [UnidadOrganizacionalSistema] ([SistemaId])


ALTER TABLE [MostrarMenu] ADD FOREIGN KEY ([Id]) REFERENCES [UnidadOrganizacionalSistema] ([Id])


ALTER TABLE [MostrarMenu] ADD FOREIGN KEY ([MenuId]) REFERENCES [Menu] ([Id])
