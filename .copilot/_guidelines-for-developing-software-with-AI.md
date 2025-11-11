# Protocolo de Desarrollo Asistido por IA - Guía Práctica

**`Guidelines for Developing Software with AI`**

## Protocolo de Desarrollo Asistido por IA

### Objetivo

Aprovechar la inteligencia artificial para acelerar el desarrollo sin perder calidad, manteniendo el control técnico y reduciendo deuda técnica.

Este protocolo define cómo interactuar con la IA en el ciclo de vida del software.

---

### Roles

### 🤖 Rol de la IA

**Responsabilidad principal:** ejecutar el trabajo mecánico, rutinario y pesado.

⚠️ Importante: La IA **no tiene criterio**. Trabaja bajo las reglas del proyecto (`architecture.md`) y siempre requiere revisión humana.

### 👨‍💻 Rol del Software Engineer

**Responsabilidad principal:** resolver problemas y aportar criterio técnico.

⚠️ El ingeniero no delega su rol en la IA, sino que la usa como **multiplicador de productividad**.

### 🏗️ Rol del Arquitecto de Software

**Responsabilidad principal:** dirigir, controlar y preservar la salud del proyecto.
⚠️ El arquitecto actúa como “director de orquesta”: no escribe cada nota, pero garantiza la armonía de toda la sinfonía.

---

## 1. La Constitución del Proyecto

📄 Cada proyecto debe tener un archivo raíz: **`architecture.md`**

Este documento es obligatorio y contiene:

- Patrones de diseño permitidos (ej. Repository, Factory, CQRS).
- Lenguajes y frameworks soportados (ej. TypeScript 5.x, Vue 3, Nuxt 4).
- Estándares de seguridad (ej. OWASP Top 10, cifrado de contraseñas con Argon2).
- Convenciones de código (ej. ESLint + Prettier, nombres en inglés).
- Políticas de performance (ej. consultas < 200ms, carga inicial < 2s).

🔹 **Regla de interacción**:

Siempre que se use IA, la primera instrucción debe ser:

```bash
Lee el archivo architecture.md y confirma que entiendes y obedecerás 
estas reglas.

```

---

## 2. AI-TDD (Test-Driven AI)

🔹 **Regla de oro**: No pedimos código primero, pedimos pruebas.

Ejemplo de flujo:

1. Orden a la IA:

```
Escribe los tests unitarios y de integración para una función que calcule el precio final de un carrito de compras con descuentos y cupones. 
Incluye casos de éxito, error y seguridad.
```

1. Validar los tests generados.
2. Segunda orden:

```
Genera el código que haga pasar todos los tests anteriores.
```

✅ Beneficios:

- Menos errores en producción.
- Documentación viva de los casos de uso.
- La IA piensa en escenarios límite desde el inicio.

---

## 3. El Agente Adversario

🔹 Para código crítico (seguridad, finanzas, integraciones externas), se debe usar un segundo agente IA con la orden:

```
Actúa como un hacker. Intenta romper este código.

```

El equipo debe revisar los ataques propuestos y reforzar el código.

---

## 4. Code review

El **code review** es una etapa crítica del protocolo, ya que asegura que el código generado por la IA cumpla con los estándares del equipo y respete la arquitectura definida.

- **Criterio humano como autoridad final**:
    
    La decisión de aceptar o rechazar la PR siempre la toma el equipo, nunca la IA.
    
- **Doble validación humana**:
    - En lo posible, toda PR/MR debe ser revisada por **al menos 2 desarrolladores**.
    - Esto asegura diversidad de criterio y evita sesgos.
- **Checklist mínima de revisión**:
    - [ ]  ¿Cumple con `architecture.md`?
    - [ ]  ¿Los tests cubren casos de éxito, error y seguridad?
    - [ ]  ¿El código es claro y mantenible?
    - [ ]  ¿Se documentaron los supuestos y justificaciones técnicas?
    - [ ]  ¿Pasó por el Agente Adversario (si aplica)?
- **Registro de decisiones**:
    
    Cada PR debe incluir en la descripción:
    
    - Resumen del aporte de la IA.
    - Observaciones de la IA durante el análisis.
    - Decisiones humanas tomadas.

---

## 5. Reglas de Refuerzo

- **Briefing inicial**:
    
    La IA debe repetir en sus palabras el contexto del proyecto antes de generar código.
    
- **Explicación de supuestos**:
    
    Cada bloque de código debe venir con una justificación técnica.
    
- **Documentación obligatoria**:
    
    Todo código generado debe incluir:
    
    - [JSDocs](https://jsdoc.app/) o comentarios claros.
    - Ejemplos de uso.
    - Si aplica, un diagrama UML o de flujo simple.
- **Revisión humana final**:
    
    Ningún código entra al repositorio sin validación de un desarrollador.
    

---

## 6. Ejemplo de Flujo en la Práctica

1. Crear o actualizar `architecture.md`.
2. Pedir a la IA que lo lea y confirme.
3. Solicitar los tests para la función a desarrollar.
4. Revisar y ajustar los tests.
5. Ordenar a la IA que genere el código que pase los tests.
6. Pasar el código al **Agente Adversario**.
7. Incorporar mejoras sugeridas.
8. Validación humana final.
9. Merge en el repositorio.

---

## 7. Integración con CI/CD

- **Pre-commit hooks**: correr linters y tests automáticamente.
- **Pipeline**:
    - Paso 1: ejecutar todos los tests.
    - Paso 2: correr análisis de seguridad (ej. Snyk, SonarQube).
    - Paso 3: revisión de performance básica (ej. tiempos de respuesta en endpoints clave).

---

## 8. Recomendaciones para el Equipo

- Nunca aceptar código de IA sin **tests + explicación**.
- Si la IA propone una nueva librería o patrón, primero validar con el Arquitecto.
- Documentar siempre la interacción con IA en la descripción del PR.
- Usar la IA como **asistente**, no como **autor único**.

---

## 9. Adaptación para Proyectos Nuxt Layers

**Nuxt Layers Específico**:

🔹 Para desarrollo con Nuxt Layers, siempre mencionar:
- `architecture.md` debe leer **SIEMPRE** antes de generar código
- Usar **TypeScript estricto** con tipos Nuxt/Vue
- Tests deben cubrir las **capas completas del layer** (frontend + backend)
- Validación con **Zod** para APIs del servidor
- Documentar con **JSDoc** para componentes y endpoints
- Respetar la **arquitectura stack-full** de cada layer

🔹 Checklist específica para Nuxt Layers:
- [ ] ¿El layer sigue la estructura completa app/ + server/ + shared/?
- [ ] ¿Los componentes Vue tienen su API correspondiente en server/api/?
- [ ] ¿Las pruebas cubren tanto frontend como backend del layer?
- [ ] ¿Se utiliza Nitro/H3 para los endpoints del servidor?
- [ ] ¿El layer es completamente independiente y reutilizable?
- [ ] ¿Se siguen las convenciones de Nuxt 4 para namespacing?

## 10. Lema Final

👉 La IA acelera, pero **el equipo mantiene el timón**.

La velocidad sin dirección solo nos lleva más rápido al lugar equivocado.
