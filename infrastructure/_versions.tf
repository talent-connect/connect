# Define Terraform provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }

  backend "azurerm" {
    storage_account_name = "redplatformtfprod12555"
    resource_group_name  = "red-platform"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
  // todo when we will be having our REDI connect azure account the next line will have to be deleted
  skip_provider_registration = true
}
