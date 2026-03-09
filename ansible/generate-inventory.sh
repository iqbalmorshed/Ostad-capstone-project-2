#!/usr/bin/env bash
# ──────────────────────────────────────────────
#  Generate Ansible inventory from Terraform outputs
#
#  Run from the .terraform/ directory:
#    ../ansible/generate-inventory.sh
#
#  Or from repo root:
#    cd .terraform && ../ansible/generate-inventory.sh
# ──────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INVENTORY_FILE="${SCRIPT_DIR}/inventory.ini"

# Ensure we're in the Terraform directory
if [[ ! -f "main.tf" ]]; then
  echo "Error: Run this script from the .terraform/ directory."
  echo "  cd .terraform && ../ansible/generate-inventory.sh"
  exit 1
fi

echo "Reading Terraform outputs..."

MASTER_PUBLIC_IP=$(terraform output -raw master_public_ip)
MASTER_PRIVATE_IP=$(terraform output -raw master_private_ip)
WORKER_PUBLIC_IPS=$(terraform output -json worker_public_ips)
WORKER_PRIVATE_IPS=$(terraform output -json worker_private_ips)

SSH_KEY="~/.ssh/aws_rsa"

cat > "${INVENTORY_FILE}" <<EOF
# Auto-generated from Terraform outputs — do not edit manually
# Generated on: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

[master]
${MASTER_PUBLIC_IP} ansible_user=ubuntu ansible_ssh_private_key_file=${SSH_KEY} private_ip=${MASTER_PRIVATE_IP}

[workers]
EOF

# Parse worker IPs from JSON arrays
WORKER_COUNT=$(echo "${WORKER_PUBLIC_IPS}" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")

for i in $(seq 0 $((WORKER_COUNT - 1))); do
  PUB_IP=$(echo "${WORKER_PUBLIC_IPS}" | python3 -c "import sys,json; print(json.load(sys.stdin)[$i])")
  PRIV_IP=$(echo "${WORKER_PRIVATE_IPS}" | python3 -c "import sys,json; print(json.load(sys.stdin)[$i])")
  echo "${PUB_IP} ansible_user=ubuntu ansible_ssh_private_key_file=${SSH_KEY} private_ip=${PRIV_IP}" >> "${INVENTORY_FILE}"
done

cat >> "${INVENTORY_FILE}" <<EOF

[k8s:children]
master
workers
EOF

echo "Inventory written to ${INVENTORY_FILE}"
echo ""
cat "${INVENTORY_FILE}"
