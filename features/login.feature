 # language: es

Característica: Inicio de sesión en Sauce Demo

  Antecedentes:
    Dado abro la página de login de Sauce Demo

  Escenario: Inicio de sesión con credenciales válidas
    Cuando inicio sesión con "standard_user" y "secret_sauce"
    Entonces debería ver la página de productos

  Escenario: Inicio de sesión con credenciales inválidas (locked out)
    Cuando inicio sesión con "locked_out_user" y "secret_sauce"
    Entonces debería ver un mensaje de error
