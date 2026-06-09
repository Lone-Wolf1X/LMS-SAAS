# Next Gen Innovations - SaaS LMS-SIS Implementation Plan

This document outlines the architecture, roadmap, and security considerations for building the Next Gen Innovations SaaS LMS-SIS.

## Goal Description

To build a highly scalable, multi-tenant LMS-SIS SaaS platform using **NestJS**. The architecture will feature a "Central Hub" operated by Next Gen Innovations, and independent "Client Nodes" deployed for schools/colleges. The system includes an automated Over-The-Air (OTA) update mechanism to push patches from the central hub to client nodes.

## User Review Required

> [!IMPORTANT]
> Please review the architecture and roadmap below. If this aligns with your vision, we will begin executing Phase 1 (setting up the foundational NestJS projects).

## Open Questions

> [!WARNING]
> 1. **Database Strategy:** Do we want a single global database with Tenant IDs (faster to build but harder to scale), or separate database instances for each client (more secure, easier to scale, but requires dynamic DB routing in NestJS)?
> 2. **Client Node Deployment:** Are we deploying the client nodes on our own servers (e.g., AWS EC2 instances managed by us) or are we giving them Docker images/scripts to host on their *own* private servers? This affects how the OTA patching works.

---

## Proposed Architecture

### 1. Central Hub (Next Gen Innovations HQ)
*   **Superadmin Panel:** Web interface for Next Gen staff.
*   **Licensing Service:** Generates and validates license keys for clients.
*   **Invoice & Billing Service:** Manages customer subscriptions.
*   **OTA Patch Server:** Stores update packages (`.zip` or Docker Images) and notifies clients of new versions.
*   **Telemetry & Error Logging API:** Receives automated crash reports and error logs from client nodes.

### 2. Client Node (LMS-SIS Tenant)
*   **Technical Support Admin Panel (IT Panel):**
    *   Connects to the Central Hub using a specific License Key.
    *   Checks for new patches.
    *   Downloads updates, runs migration scripts, and restarts the local NestJS server.
    *   Monitors local server health and syncs logs back to the Central Hub.
*   **User Management & Operations Admin Panel (LMS/SIS Panel):**
    *   The core product used by school/college staff.
    *   Manages Students, Teachers, Courses, Operations, and Reporting.

---

## Development Roadmap (Phases)

### Phase 1: Foundation & Mono-Repo Setup
*   Initialize a NestJS Monorepo (or separate repos if preferred) for the `central-hub` and `client-node`.
*   Setup PostgreSQL databases and TypeORM/Prisma.
*   Implement basic Authentication (JWT) and Role-Based Access Control (RBAC).

### Phase 2: Central Hub Core Features
*   Build the Licensing generation logic.
*   Create the Customer/Invoice management models.
*   Build the Patch Registry (an API that lists the latest software versions).

### Phase 3: Client Node Technical Setup & OTA
*   Implement License Key validation on startup.
*   Build the "Update Applicator" script (a script that pulls the latest code/patch from the Hub, applies it, runs DB migrations, and restarts the app).
*   Setup the Error Catcher (intercepts unhandled exceptions and pushes them to the Central Hub API).

### Phase 4: Client Node Operational Features (The actual LMS)
*   Build the Course Management System.
*   Build User Management (Students, Teachers).
*   Build Reporting and Operations dashboards.

## Verification Plan

### Automated Tests
- We will write Jest unit tests for the Licensing validation logic and the OTA Patch version comparison logic to ensure bad patches aren't applied.

### Manual Verification
- We will simulate a "Client Server" locally.
- We will generate a patch on the "Central Hub" and trigger the update on the "Client Server".
- We will verify that the client server downloads the patch, restarts, and runs successfully without data loss.
