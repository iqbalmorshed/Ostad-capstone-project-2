# ──────────────────────────────────────────────
#  Security Group – Kubernetes Cluster
# ──────────────────────────────────────────────
resource "aws_security_group" "k8s" {
  name        = "${var.project_name}-k8s-sg"
  description = "Allow SSH, K8s API, NodePorts, and Monitoring"
  vpc_id      = aws_vpc.main.id

  # --- Inbound Rules ---

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.allowed_ssh_cidr]
  }

  # Kubernetes API Server
  ingress {
    description = "K8s API"
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Kubelet API (master & workers)
  ingress {
    description = "Kubelet API"
    from_port   = 10250
    to_port     = 10250
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  # etcd server client API (master only, internal)
  ingress {
    description = "etcd"
    from_port   = 2379
    to_port     = 2380
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  # NodePort Services
  ingress {
    description = "NodePort range"
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
	from_port   = 4789
	to_port     = 4789
	protocol    = "udp"
	self        = true
	description = "Calico VXLAN overlay networking"
  }

  ingress {
	from_port   = 179
	to_port     = 179
	protocol    = "tcp"
	self        = true
	description = "Calico BGP peering"
  }

  ingress {
	from_port   = 30443
	to_port     = 30443
	protocol    = "tcp"
	cidr_blocks = ["0.0.0.0/0"]
	description = "ArgoCD HTTPS NodePort"
  }

  ingress {
	from_port   = 30080
	to_port     = 30080
	protocol    = "tcp"
	cidr_blocks = ["0.0.0.0/0"]
	description = "ArgoCD HTTP NodePort"
  }

  

  # Prometheus
  ingress {
    description = "Prometheus"
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Prometheus"
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {
    description = "Grafana"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Flannel VXLAN (CNI overlay)
  ingress {
    description = "Flannel VXLAN"
    from_port   = 8472
    to_port     = 8472
    protocol    = "udp"
    cidr_blocks = [var.vpc_cidr]
  }

  # --- Outbound ---
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "${var.project_name}-k8s-sg"
    Project = var.project_name
  }
}
