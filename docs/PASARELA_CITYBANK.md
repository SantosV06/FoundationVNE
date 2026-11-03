# Pasarela de pago · City Bank

La página [https://foundationvne.com/donaciones](https://foundationvne.com/donaciones) pide tres datos y reserva un iframe para la pasarela que entregue City Bank:

- monto a donar, en dólares, entre 1 y 25 000;
- nombre;
- correo.

Esta aplicación no cobra, no guarda tarjetas y no confirma el pago. Tampoco guarda el monto, el nombre ni el correo. El banco lo hace dentro de su propia página, embebida aquí, después de que el visitante pulsa continuar.

Hasta que existan las dos variables de abajo, el visitante puede rellenar el formulario, pero el espacio `#citybank-gateway` sigue vacío y no se envía ningún pago. Zelle sigue publicado debajo. No se inventó una URL del banco: City Bank tiene que indicar la dirección exacta del iframe.

## Qué hay que pegar en Vercel

En el proyecto de Vercel, entorno de Production (y Preview, si se quiere probar), crear:

| Variable                 | Qué es                                                                                                                                                                                                                                                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CITYBANK_GATEWAY_TOKEN` | Token de embebido que entrega City Bank. Es público para el navegador, porque el iframe lo necesita. No es una clave secreta de API. No lo pongas en Git ni con prefijo `VITE_`.                                                                                                                      |
| `CITYBANK_IFRAME_URL`    | Plantilla HTTPS con el texto `{token}`. Puede incluir `{amount}`, `{name}` y `{email}`. Si no los incluye, la página los añade como parámetros al continuar. Ejemplo de forma, no una dirección real: `https://payments.example.bank/embed?session={token}&amount={amount}&name={name}&email={email}` |

Reglas que aplica el código antes de abrir el iframe:

- El token solo puede usar letras, números y `._~+/=-`, entre 8 y 512 caracteres.
- La plantilla tiene que ser `https`, incluir `{token}` y no llevar usuario ni contraseña en la URL.
- Se rechazan `localhost`, nombres `.local` y direcciones IP.
- `{amount}`, `{name}` y `{email}` no pueden ir en el dominio. Si el banco los usa, van en la ruta o en la consulta.
- El monto, el nombre y el correo se validan en el servidor al pulsar continuar. Recién entonces se arma la dirección del iframe y se envía al navegador. Esa dirección no sale en el primer HTML. El número de tarjeta no entra en ella.

Si algo de la plantilla no cumple eso, la pasarela permanece cerrada. No hay formulario de tarjeta propio.

Después de guardar las variables hay que **volver a desplegar**. El HTML añade el origen del banco a `frame-src` solo cuando la URL es válida. `vercel.json` no nombra un host de City Bank a ciegas.

## Qué no hace esta rama

- No sustituye a Zelle.
- No usa Square ni una ruleta de pagos.
- No guarda el intento en Neon.
- No recibe webhooks ni marca un pago como hecho.
- No abre Apple Pay ni Google Pay. Si City Bank lo exige dentro del iframe, habrá que ampliar `Permissions-Policy` en un cambio aparte.

Cuando el banco envíe el token y la URL, se pegan en Vercel y se despliega. En `/donaciones`, al continuar, el iframe muestra su pasarela. El número de tarjeta sigue en City Bank.
