# Duocmatico

Hola! Este repo es una especie de app para ayudar a planear tu horario para los semestres.

Ojo la idea de esto no es que tome ramos por ti. Solamente ayudarte a organizar mejor tu horario para que puedas ver como va quedando con los ramos que seleccionas.

Actualmente estoy **EN CONSTRUCCION** asi que quizas no veas mucho. Pero si estas aca desde el inicio, podras ver como se va armando todo.

## Importante

Este proyecto esta siendo actualmente desarrollado por un alumno y no es algo que sea parte de la institucion.

# Documentacion

## Transformacion de datos

Para poder mostrar los datos de una forma mas amigable, nos fijamos en las siguientes columnas del excel de cursos disponibles:

- Escuela
- Carrera
- Plan
- Jornada
- Nivel
- Tipo
- Sigla
- Asignatura
- Sección
- Horario
- Sala
- Docente
- Día

Estas 13 columnas nos ayudan a poder crear las siguientes estructura de datos

### Horarios

Esta estructura contiene los datos de la hora, el dia y la sala de un curso.

```js
{
  horario: "Lu HH:MM:SS - HH:MM:SS",
  dia: "Lunes",
  sala: "301"
}
```

### Cursos

Estructura principal para poder mostrar la informacion de los cursos disponbles y ver cuales son sus horarios, el docente, etc.

En este caso usaremos el ejemplo una de las secciones del curso `Big Data` para la sede `San Joaquin` en primer semestre del 2022

```js
{
  asignatura: "BIG DATA",
  docente: "EMILIO GONZALO SOTO",
  escuela: "Informática y Telecomunicaciones",
  horarios: [
    {
      dia: "Viernes",
      horario: "Vi 14:31:00 - 15:50:00",
      sala: "SJ-L10"
    },
    ...
  ],
  jornada: "Diurno",
  nivel: 7,
  planes: [
    // Existen casos en donde un curso pertenece a mas de un plan de estudios
    1446103,
    ...
  ],
  seccion: "BDY7101-006D",
  sigla: "BDY7101",
}
```

### Carreras

Para no tener que mostrar todos los cursos disponibles de una sede juntos, estos se separaron por carrears. Basicamente es un array con las distintas carreras y sus cursos.

```js
{
  carrera: "INGENIERÍA EN INFORMÁTICA",
  cursos: [
    ...
  ]
}
```
