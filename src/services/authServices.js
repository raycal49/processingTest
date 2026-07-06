import argon2 from "argon2";
import { SignJWT, jwtVerify } from 'jose';
import { InvalidCredentialError} from '../errors/authErrors.js'

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19 * 1024,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = (password) => {
  return argon2.hash(password, ARGON2_OPTIONS);
}

const verifyPassword = (password, passwordHash) => {
  return argon2.verify(passwordHash, password);
}

const createClaims = (id, role) => {
  return {"id":id, "role":role};
}

const createToken = (claims) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    new SignJWT(claims)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret)
};

const issueToken = (id, role) => {
  const claims = createClaims(id, role);

  const token = createToken(claims);

  return token;
}

export const createAuthServices = (authRepository) => ({
    authenticateUser: async (name, password) => {
        const userCredentials = await authRepository.findUserCredentials(name) ?? null;
        
        if (!userCredentials) {
            throw new InvalidCredentialError();
        }

        const { id, role, hash } = userCredentials;

        const queryResult = await verifyPassword(password, hash);

        if (!queryResult) {
          throw new InvalidCredentialError();
        }
        
        const signedToken = issueToken(id,role);

        return signedToken;
    },
    addUser: async (user) => {
        const existingUser = await authRepository.checkUserExists(user) ?? null;

        if (existingUser) {
          throw new AccountAlreadyExistsError();
        }
        
        const hash = hashPassword(user.password);

        const {id, role} = await authRepository.insertUser(
          "Customer",
          user.username,
          hash,
          user.email
        );

        const signedToken = issueToken(id,role);

        return signedToken;
    },    
});

