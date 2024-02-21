# Reference from the link https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1.0.0"
    }
  }
}

source "googlecompute" "webapp-centos" {
  project_id          = "csye6225-vishnupaduchuri"
  zone                = "us-east1"
  ssh_username        = "packer"
  source_image_family = "centos-stream-8"
  description         = "CentOS, CentOS, Stream 8, x86_64 built on 20240110",
}

build {
  name    = "testing-image-build"
  sources = ["source.googlecompute.webapp-centos"]
}