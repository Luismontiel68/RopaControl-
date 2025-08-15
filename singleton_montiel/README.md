# Implementación del Patrón Singleton – Logger de Historial de Acciones

## ¿En qué consiste el patrón Singleton?

El patrón **Singleton** garantiza que solo exista **una única instancia** de una clase en toda la aplicación.  
En este caso, se utiliza para centralizar el **historial de acciones** dentro del sistema, asegurando que todos los módulos compartan y consulten la misma información.

Esto es útil porque, sin importar cuántas veces se importe o cree la clase `Logger`, siempre se obtendrá **la misma instancia compartida**, evitando duplicados y manteniendo la coherencia de los datos.

---

## ¿Cómo se implementó?

Se creó una clase llamada `Logger` que cumple las siguientes características:

- **Propiedad estática `Logger.instance`**  
  Al instanciar la clase, se revisa si ya existe una instancia previa.  
  - Si existe, se devuelve esa misma.  
  - Si no, se crea una nueva y se guarda como referencia única.

- **Uso de `localStorage`**  
  El historial de acciones se persiste en `localStorage`, lo que permite que las acciones registradas se mantengan incluso al recargar la página.

- **Exportación única**  
  Al final del archivo, se crea e **inicializa una sola instancia** (`const logger = new Logger()`) y se exporta como valor por defecto.  
  De esta manera, todos los módulos que lo importen estarán utilizando siempre el mismo `Logger`.

---

## ¿Qué funcionalidades tiene?

El `Logger` ofrece métodos para manejar el historial de acciones en la aplicación:

- **`registrarAccion(accion, detalle)`**  
  Registra una acción con la fecha, el tipo y un detalle descriptivo.  
  Además, guarda los datos tanto en memoria como en `localStorage`.

- **`obtenerHistorial()`**  
  Devuelve el historial completo de acciones registradas.

- **`limpiarHistorial()`**  
  Vacía el historial en memoria y elimina el registro de `localStorage`.

---

## Ejemplo de uso

```javascript
import logger from "./singleton_montiel/singleton.js";

// Registrar una acción
logger.registrarAccion("Agregar", "Se añadió un nuevo producto (Camisa, Talla M)");

// Obtener historial
console.log(logger.obtenerHistorial());

// Limpiar historial
logger.limpiarHistorial();


**Autor:** Luis Alberto Montiel Díaz  
**Fecha:** 14 de agosto de 2025  
