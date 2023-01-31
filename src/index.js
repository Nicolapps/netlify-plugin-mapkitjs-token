import jwt from 'jsonwebtoken';

export const onPreBuild = async function ({
  inputs,
  utils: { build, status },
}) {
  const teamId = inputs.teamId || process.env.MAPKIT_JS_TEAM_ID;
  const keyId = inputs.keyId || process.env.MAPKIT_JS_KEY_ID;
  const authKey = inputs.authKey || process.env.MAPKIT_JS_AUTH_KEY;
  const tokenEnvVariable = inputs.tokenEnvVariable
    || process.env.MAPKIT_JS_TOKEN_ENV_VARIABLE
    || 'MAPKIT_JS_TOKEN';

  if (!teamId || keyId || authKey || tokenEnvVariable) {
    build.failBuild('Missing mandatory parameters');
    return;
  }

  const origin = process.env.DEPLOY_PRIME_URL;

  const payload = {
    iat: Date.now() / 1000,
    iss: teamId,
  };

  const header = {
    typ: 'JWT',
    alg: 'ES256',
    kid: keyId,
    origin,
  };

  try {
    const token = jwt.sign(payload, authKey, { header });
    process.env[tokenEnvVariable] = token;
    status.show({ summary: `MapKit JS token generated for ${origin} with success. Access it using process.env.${tokenEnvVariable}.` });
  } catch (error) {
    build.failBuild('Error', { error });
  }
}
