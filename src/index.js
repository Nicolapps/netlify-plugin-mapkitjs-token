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
  const ttl = inputs.ttl || process.env.MAPKIT_JS_TTL || 31_536_000; // 1 year
  const origin = inputs.origin || process.env.MAPKIT_JS_ORIGIN || process.env.DEPLOY_PRIME_URL;

  if (!teamId || !keyId || !authKey || !tokenEnvVariable || !ttl) {
    build.failBuild('Missing mandatory parameters');
    return;
  }

  const iat = Date.now() / 1000;
  const payload = {
    iat,
    exp: iat + ttl,
    iss: teamId,
    origin,
  };

  const header = {
    typ: 'JWT',
    alg: 'ES256',
    kid: keyId,
  };

  try {
    const token = jwt.sign(payload, atob(authKey), { header });
    process.env[tokenEnvVariable] = token;
    status.show({
      title: 'MapKit JS token generated successfully',
      summary: `Origin: ${origin}, expires in ${ttl} seconds.`,
      text: `process.env.${tokenEnvVariable} = '${token}';`,
    });
  } catch (error) {
    build.failBuild('Error', { error });
  }
}
