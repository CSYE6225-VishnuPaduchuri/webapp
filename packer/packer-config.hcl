# Reference from the link https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1.0.0"
    }
  }
}