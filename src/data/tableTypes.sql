CREATE
TYPE UnidadOrganizacionalTableType AS
TABLE (
    unidadOrganizacionalId int NULL
);

CREATE
TYPE MenuTableType AS
TABLE (
    [titulo] VARCHAR(100),
    [icon] VARCHAR(50),
    [url] VARCHAR(MAX)
);