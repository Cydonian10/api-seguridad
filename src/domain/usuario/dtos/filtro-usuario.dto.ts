import { numbersSchema } from "@src/domain/common/dtos/number.dto";
import { z } from "zod";


export const FiltroUsuarioSchema = z.object({
	query: z.object({
		unidadOrganizativas: numbersSchema,
    roles: numbersSchema
	}),
});

export type FiltroUsuarioDTO = z.infer<typeof FiltroUsuarioSchema>["query"]