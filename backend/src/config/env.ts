import z from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3001),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.url('DATABASE_URL debe ser una URL válida'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
    CLIENT_URL: z.url('CLIENT_URL debe ser una URL válida'),
});

export type Env = z.infer<typeof envSchema>

// eslint-disable-next-line no-process-env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error('❌ Variables de entorno inválidas');
    // eslint-disable-next-line no-console
    console.error(z.treeifyError(parsed.error).properties);
    process.exit(1);
}

export const env = parsed.data
