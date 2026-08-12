# language: es

Característica: Inicio de sesión en Sauce Demo

  Antecedentes:
    Dado abro la página de login de Sauce Demo

  Esquema del escenario: Inicio de sesión con credenciales variadas
    Cuando inicio sesión con "<username>" y "<password>"
    Entonces debería ver "<resultado>"

    Ejemplos:
      | username        | password      | resultado                    |
      | standard_user   | secret_sauce | la página de productos      |
      | locked_out_user | secret_sauce | un mensaje de error         |
