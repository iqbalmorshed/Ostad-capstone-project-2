# ──────────────────────────────────────────────
#  Outputs
# ──────────────────────────────────────────────

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "ID of the public subnet"
  value       = aws_subnet.public.id
}

output "master_public_ip" {
  description = "Public IP of the K8s master node"
  value       = aws_instance.master.public_ip
}

output "master_private_ip" {
  description = "Private IP of the K8s master node"
  value       = aws_instance.master.private_ip
}

output "worker_public_ips" {
  description = "Public IPs of the K8s worker nodes"
  value       = aws_instance.worker[*].public_ip
}

output "worker_private_ips" {
  description = "Private IPs of the K8s worker nodes"
  value       = aws_instance.worker[*].private_ip
}

output "ssh_command_master" {
  description = "SSH command to connect to the master node"
  value       = "ssh -i ~/.ssh/aws_rsa ubuntu@${aws_instance.master.public_ip}"
}
