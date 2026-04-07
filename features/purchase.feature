 # language: es

Característica: Flujo de compra

  Antecedentes:
    Dado abro la página de login de Sauce Demo

  Escenario: Comprar un producto exitosamente
    Cuando inicio sesión con "standard_user" y "secret_sauce"
    Y agrego el producto "Sauce Labs Backpack" al carrito
    Y voy al carrito
    Entonces debería ver "Sauce Labs Backpack" en el carrito
    Cuando inicio el pago con "Pedro" "Perez" "12345"
    Entonces debería ver la confirmación del pedido