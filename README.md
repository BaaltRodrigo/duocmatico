# Duocmatico (En construccion 🚧)

Hola! Este repo es una especie de app para ayudar a planear tu horario para los semestres.

Ojo! la idea de esto no es que la app tome ramos por ti. Solamente ayudamos a organizar mejor tu horario para que puedas ver como va quedando con los ramos que seleccionas.

## ⚠️ Importante

Este proyecto esta siendo actualmente desarrollado por alumnos y no es algo que sea parte de la institucion.

**Si estas usando esta aplicacion actualmente, puede ser que tengas que volver a subir el archivo de los cursos entre las releases**. Esto debido a que aun estamos mejorando la conversion de los datos y quizas necesitemos leer otra vez la informacion del excel con los cursos disponibles.

# Documentacion

## Transformacion de datos

Para poder mostrar los datos de una forma mas amigable, nos fijamos en las siguientes columnas del excel de cursos disponibles:

| Columna    | Motivo                                                                                                              |
| :--------- | :------------------------------------------------------------------------------------------------------------------ |
| Asignatura | Nombre de la asignatura                                                                                             |
| Carrera    | Usada para agrupar las distintas asignaturas y secciones por la carrera a la que pertenecen                         |
| Dia        | Dia de la semana en que se imparte la asignatura                                                                    |
| Docente    | Nombre del docente encargado de la seccion                                                                          |
| Escuela    | Aun no tenemos algun motivo en especifico del _por que_ de esta columna                                             |
| Horario    | Bloque del dia y hora en que se imparte la seccion en formato `Dia HH:MM:SS - HH:MM:SS`                             |
| Jornada    | Para identificar si una seccion es `diurna` o `vespertina`                                                          |
| Nivel      | Semestre al que pertenece una asignatura                                                                            |
| Plan       | Identifica el plan de estudio al que pertenece la seccion de una asignatura. **Actualmente sin repercucion visual** |
| Sala       | Lugar fisico en la sede donde se imparte la seccion                                                                 |
| Seccion    | Identificador de la seccion. Suelen ser una combinacion entre `Sigla` + `###` + `jornada`                           |
| Sigla      | Identificador abreviado de las asignaturas                                                                          |
| Tipo       | Identifica si una asignatura es `presencial` u `online`                                                             |

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

Por ultimo, para no tener que mostrar todos los cursos disponibles de una sede juntos, las secciones se separaron por carrears. Basicamente es un array con las distintas carreras y sus cursos.

```js
{
  carrera: "INGENIERÍA EN INFORMÁTICA",
  cursos: [
    ...
  ]
}
```
