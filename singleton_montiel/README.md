# Implementación del Patrón Singleton – Historial de Acciones

## ¿En qué consiste el patrón Singleton?

En esta implementación, el patrón Singleton asegura que exista **una única instancia global del historial de acciones** dentro del sistema. Esto es útil porque queremos que todas las partes de la aplicación (como la creación, edición o eliminación de productos) puedan registrar y consultar el mismo historial, sin duplicar datos ni perder coherencia.

Al usar el patrón Singleton, cada vez que se importa la clase `HistorialAcciones`, se obtiene la **misma instancia compartida**, lo que garantiza que todas las acciones queden centralizadas y disponibles en un solo lugar.

---

## ¿Cómo lo implementé?

Se creó una clase llamada `HistorialAcciones` que mantiene un arreglo con todas las acciones realizadas por el usuario en la aplicación. Usando una propiedad estática (`HistorialAcciones.instancia`), se asegura que solo exista una instancia del historial sin importar cuántas veces se intente crear otra.

Al final del archivo, la instancia se exporta y se **congela** con `Object.freeze()` para evitar modificaciones no deseadas desde otros módulos.

---

## ¿Qué hace mi ejemplo?

Mi Singleton actúa como un registro de historial del sistema. Permite:

- Registrar acciones realizadas por el usuario, como agregar, editar o eliminar productos.
- Consultar todo el historial acumulado.
- Limpiar el historial cuando sea necesario.

Esto facilita el seguimiento de lo que sucede en la aplicación, mejora el control del sistema y puede servir como base para una futura sección de auditoría o reportes.

---

**Autor:** Luis Alberto Montiel Díaz  
**Fecha:** 1 de agosto de 2025  
