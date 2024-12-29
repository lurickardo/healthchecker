# HealthChecker

<p align="center">
  <img src="https://github.com/user-attachments/assets/e2917402-5e0e-42c4-a311-6968b1ce163e" alt="logo" style="height: 180px; width: 150px;">
</p>

**HealthChecker** is a tool designed to implement synthetic tests for your services using your own infrastructure, enabling reliable SLA compliance monitoring. With HealthChecker, you can schedule periodic checks for endpoints and analyze their availability and performance, all within your infrastructure.

## Explanatory video
https://www.youtube.com/watch?v=1yRw1hga6k4

## Table of Contents

1. [Overview](#overview)  
2. [Benefits](#benefits)  
3. [Architecture](#architecture)  
4. [Cron Concept](#cron-concept)  
5. [Example Payload](#example-payload)  
7. [Running Locally](#running-locally)  

---

## Overview

HealthChecker's purpose is to simplify the creation, management, and monitoring of synthetic tests for APIs. You can register one or more endpoints, define execution intervals (by minute, hour, day of the week, etc.), and HealthChecker will run the tests in the background, saving the results (status, data, errors) in a database for analysis or audits.

### Benefits:
- Ensure constant availability of critical services.
- Monitor latency, status, and potential failures of internal or external endpoints.
- Maintain a log of requests to proactively diagnose issues.

---

## Architecture

The following diagram illustrates the HealthChecker's workflow:

![healthcheck](https://github.com/user-attachments/assets/34a5cdd5-55a8-47d3-a497-b43455f4d753)

## Cron Concept

- `0 */5 * * * *` → executes **every 5 minutes**.
- `* * * * *` → executes **every minute**.
- `0 0 */1 * * *` → executes **every hour**.
- `0 0 0 * * *` → executes **once a day** (at midnight).

## Example Payload

When a frontend or another service sends data to HealthChecker to create or update a test (schedule), the payload follows this format:

```json
{
  "method": "GET",
  "url": "https://viacep.com.br/ws/01001000/json/",
  "body": "{\"test\": \"sample\"}",
  "daysOfWeek": [0, 1, 2, 3, 4, 5, 6],
  "intervalType": "minute",
  "interval": "1",
  "params": {
    "paramKey": "paramValue"
  },
  "headers": {
    "headersKey": "headersValue"
  },
  "cronInterval": "* */1 * * 0,1,2,3,4,5,6"
}
```

## Running Locally

`docker-compose up --build`
