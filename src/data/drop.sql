-- 1. Eliminar claves foráneas

DECLARE @sql NVARCHAR(MAX) = '';

-- Generar un script para eliminar todas las restricciones de claves foráneas
SELECT @sql += 'ALTER TABLE [' + OBJECT_SCHEMA_NAME(parent_object_id) + '].[' + OBJECT_NAME(parent_object_id) + '] DROP CONSTRAINT [' + name + '];'
FROM sys.foreign_keys;

-- Ejecutar el script generado
EXEC sp_executesql @sql;
------------------------------------------------
-- 2. Eliminar tablas
DECLARE @sql NVARCHAR(MAX) = '';

SET @sql = '';

-- Generar un script para eliminar todas las tablas
SELECT @sql += 'DROP TABLE [' + SCHEMA_NAME(schema_id) + '].[' + name + '];'
FROM sys.tables;

-- Ejecutar el script generado
EXEC sp_executesql @sql;