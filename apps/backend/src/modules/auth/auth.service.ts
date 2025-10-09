import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../users/user.repository.js';
import type { RegisterDTO, LoginDTO } from './auth.schemas.js';

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? 'change-me';

// jsonwebtoken aceita string | number | DurationLike para expiresIn;
// declarar com SignOptions['expiresIn'] evita conflito de overloads
const ACCESS_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES_IN ?? '15m') as SignOptions['expiresIn'];
const REFRESH_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

export type JWTPayload = {
  sub: string;
  email: string;
  role: string;
};

function signAccessToken(payload: JWTPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
}

function signRefreshToken(payload: JWTPayload) {
  // marque o token como refresh via claim auxiliar
  return jwt.sign({ ...payload, typ: 'refresh' }, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
}

export function verifyToken<T = JwtPayload>(token: string) {
  return jwt.verify(token, JWT_SECRET) as T;
}

export async function register(data: RegisterDTO) {
  const exists = await findUserByEmail(data.email);
  if (exists) throw new Error('E-mail já cadastrado');

  const hash = await bcrypt.hash(data.password, 10);
  const user = await createUser({ ...data, password: hash });

  const payload: JWTPayload = { sub: user.id, email: user.email, role: user.role };
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export async function login(data: LoginDTO) {
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error('Credenciais inválidas');

  const ok = await bcrypt.compare(data.password, user.password);
  if (!ok) throw new Error('Credenciais inválidas');

  const payload: JWTPayload = { sub: user.id, email: user.email, role: user.role };
  return {
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
}

export function refresh(refreshToken: string) {
  const decoded = verifyToken<JWTPayload & { typ?: string }>(refreshToken);
  if (decoded.typ !== 'refresh') throw new Error('Token inválido');

  const { sub, email, role } = decoded;
  return {
    accessToken: signAccessToken({ sub, email, role }),
    refreshToken: signRefreshToken({ sub, email, role }),
  };
}