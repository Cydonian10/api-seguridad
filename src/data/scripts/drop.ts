import { DatabasePool } from "../init";
const resetDatabase = async () => {
    const db =  new DatabasePool();
    const request = await db.getPool()
    try {
        console.log('Eliminando claves foráneas...');
        let query = `
      DECLARE @sql NVARCHAR(MAX) = '';

      -- Generar script para eliminar todas las claves foráneas
      SELECT @sql += 'ALTER TABLE [' + OBJECT_SCHEMA_NAME(parent_object_id) + '].[' 
        + OBJECT_NAME(parent_object_id) + '] DROP CONSTRAINT [' + name + '];'
      FROM sys.foreign_keys;

      EXEC sp_executesql @sql;
    `;
        await request.query(query);

        console.log('Eliminando todas las tablas...');
        query = `
      DECLARE @sql NVARCHAR(MAX) = '';

      -- Generar script para eliminar todas las tablas
      SELECT @sql += 'DROP TABLE [' + SCHEMA_NAME(schema_id) + '].[' + name + '];'
      FROM sys.tables;

      EXEC sp_executesql @sql;
    `;
        await request.query(query);

        console.log('Base de datos reiniciada exitosamente.');
    } catch (err) {
        console.error('Error al reiniciar la base de datos:', err);
    } finally {
        db.closePool()
    }
};

resetDatabase();
