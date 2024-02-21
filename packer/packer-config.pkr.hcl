# Reference from the link https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1.0.0"
    }
  }
}

source "googlecompute" "webapp-centos-custom-image" {
  project_id              = "${var.gcp_project_id}"
  zone                    = "${var.gcp_zone}"
  ssh_username            = "${var.gcp_ssh_name}"
  disk_size               = "${var.image_disk_size}"
  disk_type               = "${var.image_disk_type}"
  image_name              = "vishnu-csye225-{{timestamp}}"
  image_description       = "${var.image_description}"
  image_family            = "${var.image_family}"
  image_project_id        = "${var.gcp_project_id}"
  image_storage_locations = "${var.image_storage_locations}"
  source_image_family     = "${var.source_image_family}"
}

build {
  name    = "testing-image-build"
  sources = ["source.googlecompute.webapp-centos-custom-image"]

  // The zip of the webapp is copied to the /tmp/ directory of the image
  provisioner "file" {
    source      = "webapp.zip"
    destination = "/tmp/"
  }

  // The webapp.service file is copied to the /tmp/ directory of the image
  // it was referenced from the lecture slides https://spring2024.csye6225.cloud/lectures/06/
  provisioner "file" {
    source      = "./imageScripts/webapp.service"
    destination = "/tmp/"
  }

  provisioner "shell" {
    scripts = [
      "./imageScripts/install_node.sh",
    ]
  }

}