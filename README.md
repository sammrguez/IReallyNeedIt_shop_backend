# E-Commerce Back-End

Este es el proyecto del back-end para un sitio web de e-commerce. Proporciona las APIs necesarias para la gestión de productos, usuarios, direcciones de envío, carrito de compras y procesamiento de pedidos.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose


## Instalación

1. Clona el repositorio:
 
2. Navega al directorio del proyecto:
   
3. Instala las dependencias:
    npm install

## Ejecución

1. Inicia el servidor:
    npm dev

2. El servidor estará disponible en [http://localhost:3000]

## API Endpoints

    -POST/registro: crea un nuevo usuario e inicia sesión con Google

    -PATCH/users/me/address: editar dirección de usuario

    -GET /productos: catálogo de productos.
    
     -POST /orders/confirm: confirma la orden.
    

## Próximas Mejoras

- Integración con Mercado Pago para pagos.

## Contribuciones

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request


