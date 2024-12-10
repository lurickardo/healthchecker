# healthchecker
Tool for implementing synthetic tests in services

*/5   -> A cada 5 segundos.
*     -> Todos os minutos.
*     -> Todas as horas.
*     -> Todos os dias do mês.
*     -> Todos os meses.
*     -> Todos os dias da semana. 0 = domingo - 1 = segunda...

## Contract

Example 1:
```json
{
  "_id": "b5cedeb4-6a88-43fb-9d3b-7ed4ce26ef0d",
  "_rev": "3-e7a0dd7eddadfea7e9aefec3f4afbf9f",
  "method": "GET",
  "url": "http://localhost:3001/routeOne",
  "interval": "1 minuto",
  "daysOfWeek": [
    0,
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "cronInterval": "*/1 * * * 0,1,2,3,4,5,6"
}
```