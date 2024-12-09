# healthchecker
Tool to implement synthetic tests of your services using your own infrastructure.
In order to enable monitoring of SLA compliance.

# Architecture

![healthcheck](https://github.com/user-attachments/assets/e2f67f78-ca28-4a8d-96ab-802da9947d85)

<p>
*/5   -> A cada 5 segundos.
</p>
<p>
*     -> Todos os minutos.
</p>
<p>
*     -> Todas as horas.
</p>
<p>
*     -> Todos os dias do mês.
</p>
<p>
*     -> Todos os meses.
</p>
<p>
*     -> Todos os dias da semana. 0 = domingo - 1 = segunda...
</p>

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