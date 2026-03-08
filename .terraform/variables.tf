# ---------- Region & AZ ----------
variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "ap-southeast-1"
}

variable "availability_zone" {
  description = "AZ for the public subnet"
  type        = string
  default     = "ap-southeast-1a"
}

# ---------- Networking ----------
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

# ---------- EC2 ----------
variable "key_name" {
  description = "Name of an existing EC2 Key Pair for SSH access"
  type        = string
  default     = "aws_rsa"
}

variable "master_instance_type" {
  description = "Instance type for the K8s master node"
  type        = string
  default     = "m7i-flex.large"
}

variable "worker_instance_type" {
  description = "Instance type for the K8s worker nodes"
  type        = string
  default     = "m7i-flex.large"
}

variable "worker_count" {
  description = "Number of worker nodes"
  type        = number
  default     = 2
}

# ---------- Tags ----------
variable "project_name" {
  description = "Project name used for resource tagging"
  type        = string
  default     = "ostad-capstone"
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into instances (0.0.0.0/0 = open)"
  type        = string
  default     = "0.0.0.0/0"
}
