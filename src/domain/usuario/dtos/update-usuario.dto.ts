import { numberSchema } from "@src/domain/common/dtos/number.dto";
import { boolean, z } from "zod";

export interface UpdateUsuarioDTO {
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string | null;
	tokenRecuperacion: string | null;
}

export const UpsertUsuarioRolSchema = z.object({
	body: z.object({
		idUsuario: numberSchema.optional(),
		idRol: numberSchema.optional(),
		fechaAsignacion: z.string().optional(),
		expiracion: z.string().optional(),
		estado: z.boolean(),
	}),
});
export type UpsertUsuarioRolDTO = z.infer<typeof UpsertUsuarioRolSchema>["body"];

export const UpsertUnidadOrganizativaIdSchema = z.object({
	body: z.object({
		idUsuario: numberSchema,
		unidadOrganizativaId: numberSchema,
	}),
});
export type UpsertUnidadOrganizativaIdDTO = z.infer<typeof UpsertUnidadOrganizativaIdSchema>["body"];
