# language: es

Característica: Flujo de compra

  Antecedentes:
    Dado abro la página de login de Sauce Demo

  Esquema del escenario: Comprar un producto exitosamente
    Cuando inicio sesión con "standard_user" y "secret_sauce"
    Y agrego el producto "<producto>" al carrito
    Y voy al carrito
    Entonces debería ver "<producto>" en el carrito
    Cuando inicio el pago con "<nombre>" "<apellido>" "<codigo_postal>"
    Entonces debería ver la confirmación del pedido

    Ejemplos:
      | producto             | nombre | apellido | codigo_postal |
      | Sauce Labs Backpack  | Pedro  | Perez    | 12345         |
      | Sauce Labs Bike Light | Ana  | Gomez    | 54321         |