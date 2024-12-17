import { DatabasePool } from "../init";

const seedDatabase = async () => {
    const db = new DatabasePool();
    const request = await db.getPool()
    try {
        console.log('Insertando datos iniciales...');

        const query = `
            -- UnidadOrganizacional
            INSERT INTO UnidadOrganizacional (Nombre, Abreviatura, Estado) VALUES
            ('Gerencia General', 'GGG', 1),
            ('Recursos Humanos', 'RRH', 1),
            ('Finanzas', 'FIN', 1),
            ('Marketing', 'MKT', 1),
            ('Operaciones', 'OPS', 1);

            -- Usuario
            INSERT INTO Usuario (Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Password, Imagen, Estado, TokenRecuperacion) VALUES
            ('Juan', 'Pérez', 'García', 'juan.perez@example.com', 'password123', 'imagen1.png', 1, 'token1'),
            ('María', 'López', 'Martínez', 'maria.lopez@example.com', 'password123', 'imagen2.png', 1, 'token2'),
            ('Carlos', 'Sánchez', 'Hernández', 'carlos.sanchez@example.com', 'password123', 'imagen3.png', 1, 'token3'),
            ('Ana', 'Ramírez', 'Díaz', 'ana.ramirez@example.com', 'password123', 'imagen4.png', 1, 'token4'),
            ('Luis', 'Fernández', 'Cruz', 'luis.fernandez@example.com', 'password123', 'imagen5.png', 1, 'token5');


            -- UnidadOrganizacionalUsuario
            INSERT INTO UnidadOrganizacionalUsuario (UsuarioId, UnidadOrganizacionalId) VALUES
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5);

            -- Sistema
            INSERT INTO Sistema (Titulo, Descripcion, Color, Url, Estado, Imagen) VALUES
            ('Gestión de Usuarios', 'Sistema para gestionar usuarios', 'Azul', 'http://sistema1.com', 1, 'sistema1.png'),
            ('Finanzas Corporativas', 'Sistema para gestionar finanzas', 'Verde', 'http://sistema2.com', 1, 'sistema2.png'),
            ('Marketing Digital', 'Sistema para campañas de marketing', 'Rojo', 'http://sistema3.com', 1, 'sistema3.png'),
            ('Operaciones Logísticas', 'Sistema para logística y transporte', 'Amarillo', 'http://sistema4.com', 1, 'sistema4.png'),
            ('Recursos Humanos', 'Sistema para gestionar personal', 'Naranja', 'http://sistema5.com', 1, 'sistema5.png');

            -- UnidadOrganizacionalSistema
            INSERT INTO UnidadOrganizacionalSistema (UnidadOrganizacionalId, SistemaId, Estado) VALUES
            (1, 1, 1),
            (2, 2, 1),
            (3, 3, 1),
            (4, 4, 1),
            (5, 5, 1);

            -- Rol
            INSERT INTO Rol (Titulo, Estado) VALUES
            ('Administrador', 1),
            ('Supervisor', 1),
            ('Analista', 1),
            ('Operador', 1),
            ('Auditor', 1);

            -- Permisos
            INSERT INTO Permisos (Titulo, Estado) VALUES
            ('Crear', 1),
            ('Leer', 1),
            ('Actualizar', 1),
            ('Eliminar', 1),
            ('Exportar', 1);

            -- UsuarioRol
            INSERT INTO UsuarioRol (RolId, UsuarioId, FechaAsigancion, Expiracion, Estado) VALUES
            (1, 1, GETDATE(), DATEADD(YEAR, 1, GETDATE()), 1),
            (2, 2, GETDATE(), DATEADD(YEAR, 1, GETDATE()), 1),
            (3, 3, GETDATE(), DATEADD(YEAR, 1, GETDATE()), 1),
            (4, 4, GETDATE(), DATEADD(YEAR, 1, GETDATE()), 1),
            (5, 5, GETDATE(), DATEADD(YEAR, 1, GETDATE()), 1);


            -- RolPermisos
            INSERT INTO RolPermisos (PermisoId, RolId) VALUES
            (1, 1),
            (2, 2),
            (3, 3),
            (4, 4),
            (5, 5);

            -- Modulo
            INSERT INTO Modulo (Titulo, Descripcion, Color, Icon, Estado, SistemaId) VALUES
            ('Usuarios', 'Módulo de usuarios', 'Azul', 'icon1', 1, 1),
            ('Finanzas', 'Módulo de finanzas', 'Verde', 'icon2', 1, 2),
            ('Marketing', 'Módulo de marketing', 'Rojo', 'icon3', 1, 3),
            ('Logística', 'Módulo de logística', 'Amarillo', 'icon4', 1, 4),
            ('Personal', 'Módulo de personal', 'Naranja', 'icon5', 1, 5);

            -- Menu
            INSERT INTO Menu (Titulo, Icon, Url, Estado, ModuloId) VALUES
            ('Inicio', 'home', '/inicio', 1, 1),
            ('Reportes', 'report', '/reportes', 1, 2),
            ('Campañas', 'campaign', '/campanas', 1, 3),
            ('Transporte', 'transport', '/transporte', 1, 4),
            ('Empleados', 'employee', '/empleados', 1, 5),
            ('Prueba', 'fa-prueba','/prueba', 1, 1);


            -- MostrarMenu
            INSERT INTO MostrarMenu (UnidadOrganizacionalId, MenuId, Estado) VALUES
            (1, 1, 1),
            (2, 2, 1),
            (3, 3, 1),
            (4, 4, 1),
            (5, 5, 1);

            -- ConfigMenuRol
            INSERT INTO ConfigMenuRol (MenuId, RolId, Activo, Estado) VALUES
            (1, 1, 1, 1),
            (2, 2, 1, 1),
            (3, 3, 1, 1),
            (4, 4, 1, 1),
            (5, 5, 1, 1),
            (6, 1, 1, 1);

    `;
        await request.query(query);

        console.log('Datos iniciales insertados correctamente.');
    } catch (err) {
        console.error('Error al insertar datos iniciales:', err);
    } finally {
        db.closePool()
    }
};

seedDatabase();
