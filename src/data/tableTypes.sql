CREATE 
TYPE UnidadOrganizacionalIdTableType AS
TABLE (
    [Id] int NULL
);

CREATE
TYPE MenuTableType AS
TABLE (
    [titulo] VARCHAR(100),
    [icon] VARCHAR(50),
    [url] VARCHAR(MAX)
);

CREATE
TYPE RolesUsuarioTableType AS
TABLE (
    [titulo] VARCHAR(100),
    [icon] VARCHAR(50),
    [url] VARCHAR(MAX)
);

CREATE
TYPE UnidadesOrganizativaUsuarioTableType AS
TABLE (
    [unidadesOrganizacionalesId] INT
);

CREATE TYPE RolesIdTableType AS TABLE (
	[Id] INT  
)