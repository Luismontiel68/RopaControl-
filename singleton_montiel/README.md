# Implementación del Patrón Singleton

## ¿Qué es el patrón Singleton?

El patrón de diseño Singleton asegura que una clase tenga una única instancia y proporciona un punto de acceso global a ella. Se utiliza para gestionar recursos compartidos como configuraciones, conexiones o registros de sesión.

## ¿Cómo se implementó?

Se creó una clase `ConfiguracionApp` que mantiene una única instancia. Usando una propiedad estática (`ConfiguracionApp.instancia`), se asegura que siempre se retorne la misma instancia de la clase, sin importar cuántas veces se intente crear una nueva.

## ¿Qué hace el ejemplo?

Simula una configuración global de la aplicación donde se controla el modo oscuro y la versión del sistema. Puedes cambiar la configuración desde cualquier módulo del proyecto y siempre estarás trabajando sobre la misma instancia.

## ¿Dónde usarlo?

Este patrón puede ser útil en RopaControl para:

- Configuraciones globales del sistema.
- Establecer preferencias del usuario.
- Controlar el estado de la sesión (en módulos futuros).
