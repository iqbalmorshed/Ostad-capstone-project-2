# QuickHire (Job-Task)

A full-stack job board: **QuickHire** lets users browse jobs, filter by category and location, and submit applications. The backend is a NestJS REST API with JWT auth and MongoDB; the frontend is a Next.js app.

## Project structure

| Directory       | Description |
|----------------|-------------|
| `quick-hire/`  | Backend — NestJS API (auth, jobs, applications, users) |
| `quick-hire-app/` | Frontend — Next.js app (home, job list, job detail, application form) |
| `monitoring/`  | Loki Helm values and Grafana dashboard JSON files |
| `ansible/`     | Ansible playbooks to bootstrap K8s, ArgoCD, and monitoring on EC2 instances |
| `scripts/`     | Root scripts (e.g. `build-test.sh` for build verification) |

## Run locally

### Option 1: Docker (recommended)

From the repo root:

```bash
# Copy env and adjust if needed (see Environment variables below)
cp quick-hire/.env.example .env

# Start MongoDB, backend, and frontend
docker compose up --build
```

- **Frontend:** http://localhost:2020  
- **Backend API:** http://localhost:2021  
- **Swagger docs:** http://localhost:2021/api/docs  

**Restart policy:** All services use `restart: unless-stopped` so containers restart on failure or after a host reboot, and stay stopped only if you stop them manually. For always-on behaviour you can use `restart: always` instead (both are valid).  

### Option 2: Run backend and frontend separately

**Prerequisites:** Node.js 22+, MongoDB (local or remote).

1. **Backend**

   ```bash
   cd quick-hire
   cp .env.example .env
   # Edit .env: set MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET
   npm install
   npm run start:dev
   ```

   API runs at http://localhost:3000 (or the port in your env). Default in Nest is 3000; if you use 3001, set that in the frontend env.

2. **Frontend**

   ```bash
   cd quick-hire-app
   npm install
   # Optional: set NEXT_PUBLIC_API_URL if backend is not at http://localhost:2021/api
   npm run dev
   ```

   App runs at http://localhost:3000 (Next.js default). If the backend is on 2021, set `NEXT_PUBLIC_API_URL=http://localhost:2021/api` (or use the default in code).

3. **Seed jobs (optional)**  
   From `quick-hire/`: `npm run seed:jobs` (requires `MONGODB_URI` in `.env`).

## Environment variables

### Root / Docker

When using Docker Compose, you can put these in a root `.env` (or pass them into compose). The backend and frontend containers read from there.

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes (prod) | MongoDB connection string. Dev default in compose: `mongodb://mongo:27017/quick-hire` |
| `JWT_ACCESS_SECRET` | Yes (prod) | Secret for access JWT (min 32 chars). Dev default in compose is set. |
| `JWT_REFRESH_SECRET` | Yes (prod) | Secret for refresh JWT. Dev default in compose is set. |
| `JWT_ACCESS_EXPIRES` | No | Access token TTL (e.g. `15m`). |
| `JWT_REFRESH_EXPIRES` | No | Refresh token TTL (e.g. `7d`). |
| `NEXT_PUBLIC_API_URL` | For frontend | Public API base URL (e.g. `http://localhost:2021/api`). Used by the browser to call the backend. |

### Backend (`quick-hire/`)

See `quick-hire/README.md` and `quick-hire/.env.example`. Main variables: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`.

### Frontend (`quick-hire-app/`)

See `quick-hire-app/README.md`. Main variable: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:2021/api` if unset).

## Production

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

Set in `.env`: `MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `NEXT_PUBLIC_API_URL` (the **public** API URL users’ browsers will use).

**Restart policy:** Same as dev: `restart: unless-stopped` (or `restart: always` if you prefer).

## Build test

From repo root, run both backend and frontend builds:

```bash
npm run test:build
```

Requires Node 22+ and `npm install` in both `quick-hire` and `quick-hire-app`. For the frontend build, `NEXT_PUBLIC_API_URL` is optional (defaults to `https://api.example.com/api` in the script).

## Deployment Strategies

The project supports three deployment strategies via Kubernetes and ArgoCD:

### Rolling Update (default)

The stable deployments in `k8s/backend.yaml` and `k8s/frontend.yaml` use a `RollingUpdate` strategy (`maxSurge: 1`, `maxUnavailable: 0`). ArgoCD auto-syncs these on every push to `main`.

To trigger a stable release:

```bash
git tag v1.2.0
git push origin v1.2.0
```

The [release pipeline](.github/workflows/release.yml) builds images, updates the stable manifests, and ArgoCD rolls them out with zero downtime.

### Canary Release

Canary deploys a single replica of the new version alongside the stable pods, routing ~33% of traffic to it for validation before a full rollout.

**Prerequisites (one-time):**

1. Add GitHub repo secrets: `ARGOCD_SERVER` and `ARGOCD_AUTH_TOKEN`
2. Register the canary ArgoCD app:
   ```bash
   kubectl apply -f argocd/canary-application.yaml
   ```

**Deploy a canary:**

```bash
# 1. Tag with -canary suffix to trigger the canary pipeline
git tag v1.2.0-canary
git push origin v1.2.0-canary
```

The [canary pipeline](.github/workflows/canary.yml) builds the images, updates `k8s/canary/` manifests, and syncs the `quickhire-canary` ArgoCD app.

**Monitor the canary:**

```bash
kubectl get pods -n quickhire -l track=canary
kubectl logs -l track=canary -n quickhire
```

**Promote to stable** (if canary looks good):

```bash
# Release the same version as stable
git tag v1.2.0
git push origin v1.2.0

# Remove the canary
kubectl delete deployment backend-canary frontend-canary -n quickhire
```

**Rollback** (if canary fails):

```bash
kubectl delete deployment backend-canary frontend-canary -n quickhire
```

### Blue-Green

Blue-green keeps two full environments. Traffic switches instantly by updating the Service selector.

**Setup:**

```bash
kubectl apply -f argocd/blue-green-application.yaml
argocd app sync quickhire-blue-green
```

**Switch traffic from blue to green:**

```bash
kubectl patch svc backend -n quickhire -p '{"spec":{"selector":{"version":"green"}}}'
kubectl patch svc frontend -n quickhire -p '{"spec":{"selector":{"version":"green"}}}'
```

**Rollback to blue:**

```bash
kubectl patch svc backend -n quickhire -p '{"spec":{"selector":{"version":"blue"}}}'
kubectl patch svc frontend -n quickhire -p '{"spec":{"selector":{"version":"blue"}}}'
```

### Strategy file layout

```
k8s/                        ← Auto-synced by ArgoCD (rolling update)
├── backend.yaml
├── frontend.yaml
├── canary/                 ← Manual sync only
│   ├── backend-canary.yaml
│   └── frontend-canary.yaml
└── blue-green/             ← Manual sync only
    ├── backend-blue.yaml
    ├── backend-green.yaml
    ├── backend-service.yaml
    ├── frontend-blue.yaml
    ├── frontend-green.yaml
    └── frontend-service.yaml

argocd/
├── application.yaml             ← Stable (auto-sync)
├── canary-application.yaml      ← Canary (manual sync)
└── blue-green-application.yaml  ← Blue-green (manual sync)
```

## Cluster Bootstrap (Ansible)

After provisioning EC2 instances with Terraform, use the Ansible playbooks to automatically set up Kubernetes, ArgoCD, and the full monitoring stack.

### Prerequisites

- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/) installed on your local machine
- SSH key (`~/.ssh/aws_rsa`) that matches the `key_name` in Terraform
- Terraform outputs available (instances must be running)

### Quick start

```bash
# 1. Provision infrastructure
cd .terraform
terraform apply

# 2. Generate Ansible inventory from Terraform outputs
../ansible/generate-inventory.sh

# 3. Run the playbook (bootstraps everything)
cd ../ansible
ansible-playbook -i inventory.ini playbook.yml
```

### What the playbook does

The playbook runs 6 stages in order:

| Stage | Hosts | Role | What it does |
|-------|-------|------|-------------|
| 1 | All nodes | `common` | Disables swap, installs containerd, kubeadm, kubelet, kubectl |
| 2 | Master | `master` | Runs `kubeadm init`, installs Calico CNI, generates join token |
| 3 | Workers | `worker` | Joins each worker to the cluster using the token from stage 2 |
| 4 | Master | *(verify)* | Waits for all nodes to reach `Ready` state |
| 5 | Master | `argocd` | Installs ArgoCD, exposes it on NodePort 30443, deploys the QuickHire ArgoCD application |
| 6 | Master | `monitoring` | Installs Helm, kube-prometheus-stack (with Loki datasource auto-configured), Loki, and Promtail |

### Running individual roles

You can run specific stages using tags or `--limit`:

```bash
# Only set up monitoring (assumes cluster is already running)
ansible-playbook -i inventory.ini playbook.yml --start-at-task="Install monitoring"

# Only run on workers
ansible-playbook -i inventory.ini playbook.yml --limit workers
```

### File layout

```
ansible/
├── ansible.cfg               ← Ansible configuration (SSH settings, inventory path)
├── generate-inventory.sh     ← Generates inventory.ini from terraform output
├── inventory.ini.tpl         ← Inventory template (reference)
├── playbook.yml              ← Main playbook (runs all stages)
└── roles/
    ├── common/               ← containerd, kubeadm, kubelet, kubectl
    │   ├── defaults/main.yml
    │   ├── handlers/main.yml
    │   └── tasks/main.yml
    ├── master/               ← kubeadm init, Calico CNI
    │   ├── defaults/main.yml
    │   └── tasks/main.yml
    ├── worker/               ← kubeadm join
    │   └── tasks/main.yml
    ├── argocd/               ← ArgoCD install + NodePort
    │   ├── defaults/main.yml
    │   └── tasks/main.yml
    └── monitoring/           ← kube-prometheus-stack, Loki, Promtail
        ├── defaults/main.yml
        └── tasks/main.yml
```

### Access after bootstrap

| Service | URL | Credentials |
|---------|-----|-------------|
| **ArgoCD** | `https://<ANY_NODE_IP>:30443` | `admin` / printed at end of playbook run |
| **Grafana** | `http://<ANY_NODE_IP>:30300` | `admin` / printed at end of playbook run |
| **Prometheus** | Internal: `http://kube-prom-stack-kube-prome-prometheus.monitoring.svc:9090` | — |

## Monitoring (Loki + Grafana)

The `monitoring/` directory contains the Loki Helm values and pre-built Grafana dashboard JSON files used for log aggregation and cluster observability.

### Files

| File | Description |
|------|-------------|
| `monitoring/loki-values.yaml` | Helm values for deploying Loki in single-binary mode (filesystem storage, no caching/gateway) |
| `monitoring/grafana-dashboard.json` | Grafana dashboard — NestJS backend CPU usage (Prometheus) + application logs (Loki) |
| `monitoring/backend-logs-dashboard.json` | Grafana dashboard — backend log volume, error logs, and all logs (Loki) |
| `monitoring/worker-node-dashboard.json` | Grafana dashboard — worker node system metrics (CPU, memory, disk, network, load, pods) |

### What gets installed

The Ansible playbook (stage 6) automatically installs and configures the entire monitoring stack:

| Component | Purpose |
|-----------|---------|
| **Prometheus** | Scrapes and stores all metrics |
| **Node Exporter** | DaemonSet exposing host-level metrics (CPU, memory, disk, network, load) |
| **kube-state-metrics** | Exposes Kubernetes object metrics (`kube_pod_info`, etc.) |
| **Grafana** | Visualization and dashboarding (NodePort 30300) |
| **Loki** | Log aggregation |
| **Promtail** | Ships container logs to Loki |

> **Note:** Both Prometheus and Loki are automatically configured as Grafana data sources. No manual setup needed.

### View logs in Grafana

1. Go to **Explore** (compass icon in the sidebar).
2. Select the **Loki** data source.
3. Run a LogQL query, for example:
   ```
   {namespace="quickhire", pod=~"backend.*"}
   ```
4. Use label filters (`namespace`, `pod`, `container`) to narrow results.

### Import dashboards

1. Go to **Dashboards → Import** (or the **+** icon → **Import**).
2. Click **Upload JSON file** and select one of:
   - `monitoring/grafana-dashboard.json` — shows backend CPU usage alongside live application logs.
   - `monitoring/backend-logs-dashboard.json` — shows backend log volume, error/warning logs, and all logs.
   - `monitoring/worker-node-dashboard.json` — shows per-node CPU, memory, disk, network, load averages, and pod counts.
3. Select the appropriate Prometheus and Loki data sources when prompted.
4. Click **Import**.

The dashboards will auto-refresh (10 s for the backend dashboard, 30 s for the worker-node dashboard).

## More details

- **Backend:** [quick-hire/README.md](quick-hire/README.md) — API, auth, RBAC, endpoints.  
- **Frontend:** [quick-hire-app/README.md](quick-hire-app/README.md) — app structure and run instructions.
