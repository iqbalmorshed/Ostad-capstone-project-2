# ──────────────────────────────────────────────
#  Ansible Inventory Template
#  Populated from Terraform outputs by generate-inventory.sh
# ──────────────────────────────────────────────

[master]
${master_public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/aws_rsa private_ip=${master_private_ip}

[workers]
%{ for i, ip in worker_public_ips ~}
${ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/aws_rsa private_ip=${worker_private_ips[i]}
%{ endfor ~}

[k8s:children]
master
workers
