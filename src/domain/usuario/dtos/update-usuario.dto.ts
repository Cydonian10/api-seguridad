import { numberSchema } from "@src/domain/common/dtos/number.dto";
import { z } from "zod";

export interface UpdateUsuarioDTO {
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string | null;
	tokenRecuperacion: string | null;
}

export interface UpsertUsuarioRolDTO {
	idUsuario?: number,
	idRol?: number;
	fechaAsignacion?: Date;
	expiracion?: Date;
	estado?: boolean
}

export const UpsertUnidadOrganizativaIdSchema = z.object({
	body: z.object({
		idUsuario: numberSchema,
		unidadOrganizativaId: numberSchema,
	}),
});
export type UpsertUnidadOrganizativaIdDTO = z.infer<typeof UpsertUnidadOrganizativaIdSchema>["body"]