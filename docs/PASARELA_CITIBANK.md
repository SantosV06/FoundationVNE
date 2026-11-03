# Pasarela de Citibank

Consultado el 3 de noviembre de 2026 en la documentación pública de Spring by Citi. No es una respuesta del banco ni una aprobación de la cuenta.

La página [https://foundationvne.com/donaciones](https://foundationvne.com/donaciones) pide monto, nombre y correo, y deja un espacio vacío. No cobra, no guarda la tarjeta y no confirma el pago. Tampoco guarda el intento en Neon. Zelle sigue abajo, como instrucción: el donante lo manda desde la app de su banco.

## ¿El banco permite un iframe?

Sí, pero no del modo que se había dejado preparado.

La guía de Hosted Checkout describe una **página embebida**. El navegador carga el script del gateway y el banco pinta el formulario dentro de un elemento de nuestra página. No publican una URL para armar nosotros con `amount`, `name` y `email` en la consulta.

Host de ejemplo, región NA:

`https://na.gateway.spring.citi.com/static/checkout/checkout.min.js`

Si la cuenta no es de Norteamérica, el host cambia. Hay que pedirlo.

Flujo que sí está escrito:

1. El servidor llama a Initiate Checkout. El navegador no lleva la clave.
2. La respuesta trae `session.id` (texto ASCII, 31 a 35 caracteres).
3. `Checkout.configure({ session: { id } })`. Desde la API v67, `configure` solo acepta la sesión. Lo demás ya fue en el paso 1 y no se pisa.
4. `Checkout.showEmbeddedPage('#destino')` abre el cobro en la página. `Checkout.showPaymentPage()` manda al pagador a la página alojada. También hay un modo modal.

La guía no dice nada de `frame-ancestors`. Hasta que el banco lo escriba, no inventamos un `src` de iframe. El espacio de `/donaciones` sigue cerrado.

Autenticación del servidor, una de las dos:

- certificado de cliente, o
- `apiUsername` = `merchant.<id del comercio>` y `apiPassword`.

Esas credenciales no van al repositorio ni al JavaScript público.

## Parámetros de Initiate Checkout

Operación: `POST https://<host>/api/nvp/version/100` con `apiOperation=INITIATE_CHECKOUT`.

Lo que la especificación NVP v100 marca como obligatorio para esta operación:

| Campo                       | Qué es                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `merchant`                  | Id del comercio. 1 a 40 caracteres (`0-9`, `a-z`, `A-Z`, `-`, `_`). El texto dice que suele ser de hasta 12. |
| `order.id`                  | Id único del intento. 1 a 40.                                                                                |
| `order.currency`            | ISO 4217, tres letras. Aquí, `USD`.                                                                          |
| `interaction.operation`     | `PURCHASE` para cobrar en el momento. También existen `AUTHORIZE`, `NONE` y `VERIFY`.                        |
| `interaction.merchant.name` | Nombre que ve quien paga. 1 a 40.                                                                            |

`order.amount` figura como opcional, pero el texto exige `amount` o `netAmount`. Para una donación se manda `order.amount`: decimal de 1 a 14 caracteres, dígitos y punto, entre 1.00 y 25000.00, que es el tope de esta página.

Útiles, no obligatorios:

| Campo                   | Notas                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `customer.email`        | Correo. Más de 3 caracteres, formato de email.                                                                      |
| `customer.firstName`    | 1 a 50. El formulario pide el nombre completo; si el banco quiere nombre y apellido por separado, hay que partirlo. |
| `interaction.returnUrl` | URL absoluta de vuelta. No vale `javascript:`. El banco añade `resultIndicator`.                                    |
| `checkoutMode`          | `WEBSITE` (por defecto: página alojada o embebida) o `PAYMENT_LINK`.                                                |

`session.id` no se envía en la petición. Lo devuelve el banco.

## Lo que hace el código hoy

Sigue el respaldo anterior, apagado:

- `CITIBANK_GATEWAY_TOKEN` o, si no está, `CITYBANK_GATEWAY_TOKEN`
- `CITIBANK_IFRAME_URL` o, si no está, `CITYBANK_IFRAME_URL`

La plantilla es HTTPS, lleva `{token}` y puede llevar `{amount}`, `{name}` y `{email}`. Si no los trae, se añaden al continuar. Se rechazan `localhost`, IP, usuario y contraseña en la URL, y placeholders en el dominio. El token admite letras, números y `._~+/=-`, de 8 a 512 caracteres (el `session.id` real cabe: 31 a 35).

Esa plantilla solo se usa si el banco entrega por escrito una dirección de embebido. No es el flujo de `checkout.min.js`. Sin las dos variables, el formulario se puede rellenar y no se abre ningún marco.

Al desplegar con una URL válida, el CSP añade solo ese origen a `frame-src`. El script de `na.gateway.spring.citi.com` no está permitido todavía, a propósito: hace falta el host que confirme la cuenta y un cambio aparte de `script-src`.

## Qué preguntarle al banco para la revisión

La guía pública no trae la lista del expediente. Esto no es una lista oficial de Citi. Es lo que conviene llevar, y lo que hay que pedirles que confirmen por escrito.

Llevar:

- Constitución de Fundación Venezuela Nueva Esperanza LLC (Nueva York) y quienes firman, con identificación vigente.
- EIN 93-4222627 y la carta del IRS.
- Cuenta de depósito a nombre de la entidad: cheque anulado o carta del banco.
- Estados de cuenta recientes.
- Dirección, teléfono y correo que ya publica el sitio: 433 Sackett St, Brooklyn, NY 11231; info@foundationvne.com.
- Descripción del cobro: donación voluntaria en USD, no venta de un bien, entre 1 y 25 000.
- Estas páginas en HTTPS: `/donaciones`, `/legal/privacidad`, `/legal/terminos` y [docs/ORIGEN_DESTINO_DONACIONES.md](ORIGEN_DESTINO_DONACIONES.md).

Pedir que contesten:

- Host del gateway (NA u otro) y si `foundationvne.com` puede usar la página embebida.
- Si hace falta registrar el dominio antes de que `showEmbeddedPage` cargue.
- Si exigen `returnUrl`, descriptor del estado de cuenta, o más datos del donante que monto, nombre y correo.
- Si el embebido entra en SAQ A o quieren otro cuestionario, y si piden inventario de scripts de la página de pago (PCI DSS 6.4.3 y 11.6.1).
- Comisión, plazo de depósito, reembolsos y a qué cuenta liquida.
- Cualquier documento extra de su mesa de revisión que no esté arriba.

Hasta esa respuesta, el cobro con tarjeta no se enciende.
