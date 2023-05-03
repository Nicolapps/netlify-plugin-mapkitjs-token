# netlify-plugin-mapkitjs-token

This Netlify plugin allows you to generate
[MapKit JS](https://developer.apple.com/documentation/mapkitjs) each time you
deploy a website on Netlify. The token’s scope will be reduced to the URL of the
deployment.

## Install

Install this plugin by adding this to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-mapkitjs-token"
```

## Configuration

The following configuration parameters must be specified:

| Environment variable name      | Input name         | Description                                                                        |
| ------------------------------ | ------------------ | ---------------------------------------------------------------------------------- |
| `MAPKIT_JS_TEAM_ID`            | `teamId`           | Apple development team ID                                                          |
| `MAPKIT_JS_KEY_ID`             | `keyId`            | The ID of the private key.                                                         |
| `MAPKIT_JS_AUTH_KEY`           | `authKey`          | The [Base64-encoded](https://www.base64encode.org) contents of the `.p8` key file. |
| `MAPKIT_JS_TOKEN_ENV_VARIABLE` | `tokenEnvVariable` | The name of the environment variable used to store the token.                      |
| `MAPKIT_JS_TTL`                | `ttl`              | The number of seconds the token should be valid.                                   |

The simplest way to define your parameters is to
[set the environment variables](https://docs.netlify.com/environment-variables/get-started/#create-variables-with-the-netlify-ui-cli-or-api)
from Netlify’s web UI. You can also use
[plugin inputs](https://docs.netlify.com/integrations/build-plugins/#configure-settings)
instead.

To get a private key, follow
[Apple’s instructions](https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key).

`MAPKIT_JS_TOKEN_ENV_VARIABLE` specifies the name you can use to access your
token. The
[Netlify documentation](https://docs.netlify.com/integrations/frameworks/environment-variables/#custom-variables)
gives more information about which name you should use depending on your
framework.
