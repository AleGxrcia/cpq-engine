# ⚡ CPQ Engine — Configure, Price, Quote

> Sistema web para empresas con productos configurables: arma cotizaciones paso a paso con reglas de compatibilidad y precios en tiempo real.

---

## ¿Qué es?

**CPQ Engine** es un sistema web de tipo Configure, Price, Quote diseñado para empresas que venden productos configurables — como servidores, pólizas de seguro, o licencias de software. El problema que resuelve es claro: sin una herramienta CPQ, los vendedores arman cotizaciones manualmente, el proceso es lento, propenso a errores, y las combinaciones inválidas pasan desapercibidas hasta que es demasiado tarde.

---

## Arquitectura

```mermaid
graph TB
    admin["👤 Admin"]
    seller["👤 Vendedor"]

    subgraph frontend["frontend/"]
        spa["React SPA
        ───────────
        Vite · TypeScript · React Router
        TanStack Query · Zustand · Axios
        React Hook Form · Zod
        ───────────
        types/ desde el API contract"]

        lib["lib/engines/ (local)
        ───────────
        TypeScript puro
        ───────────
        evalCond · evalRules · calcPrice
        Cálculo en tiempo real sin requests"]
    end

    subgraph backend["backend/"]
        api["Express API
        ───────────
        Express · TypeScript · JWT Auth
        Zod Middleware · Pino Logger
        ───────────
        auth · products · quotes
        clients · configurator · pdf"]

        domain["domain/ (TS puro)
        ───────────
        engines/ — evalCond, evalRules, calcPrice
        types/   — Product, Quote, Engine"]
    end

    subgraph data["Base de Datos"]
        pg["PostgreSQL 16
        ───────────
        Prisma ORM
        ───────────
        Tablas relacionales
        + JSONB para snapshots"]
    end

    admin  -->|"HTTPS"| spa
    seller -->|"HTTPS"| spa
    spa    -->|"REST/JSON · Bearer JWT · :3001"| api
    spa    -.->|"import local"| lib
    api    -.->|"import local"| domain
    api    -->|"Prisma Client"| pg

    style spa    fill:#065f46,color:#d1fae5,stroke:#10b981,stroke-width:2px
    style lib    fill:#1f2937,color:#d1fae5,stroke:#10b981,stroke-width:1px,stroke-dasharray:5 4
    style api    fill:#1e3a8a,color:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style domain fill:#2d1b69,color:#ede9fe,stroke:#8b5cf6,stroke-width:1px,stroke-dasharray:5 4
    style pg     fill:#78350f,color:#fef3c7,stroke:#f59e0b,stroke-width:2px
```

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Backend** | Node.js · Express · TypeScript · Prisma ORM |
| **Frontend** | React · Vite · TypeScript · React Router |
| **Base de Datos** | PostgreSQL (relacional + JSONB para snapshots) |
| **Validación** | Zod |
| **Auth** | JWT |
| **Testing** | Vitest |
| **Logging** | Pino |
