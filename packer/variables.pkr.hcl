variable "gcp_project_id" {
  description = "The GCP project Id"
  type        = string
  default     = "csye6225-vishnupaduchuri"
}

variable "gcp_zone" {
  description = "The GCP zone"
  type        = string
  default     = "us-west4-b"
}

variable "gcp_ssh_name" {
  description = "The ssh key name"
  type        = string
  default     = "packer"
}

variable "image_disk_size" {
  description = "The size of the image disk"
  type        = number
  default     = 20
}

variable "image_disk_type" {
  description = "The type of the image disk"
  type        = string
  default     = "pd-standard"
}

variable "image_description" {
  description = "The description of the image"
  type        = string
  default     = "Custom Image for webapp-centos"
}

variable "image_family" {
  description = "The family of the image"
  type        = string
  default     = "csye-6225-app-image"
}

variable "image_storage_locations" {
  description = "The storage locations of the image"
  type        = list(string)
  default     = ["us"]
}

variable "source_image_family" {
  description = "The source image family"
  type        = string
  default     = "centos-stream-8"
}

variable "gcp_region" {
  description = "The region where the image will be created"
  type        = string
  default     = "us-west4"
}

variable "gcp_network" {
  description = "The network tag is set to default"
  type        = string
  default     = "default"
}

variable "gcp_machine_type" {
  description = "The machine type of the image"
  type        = string
  default     = "n1-standard-1"
}