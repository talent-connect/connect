# Define Terraform provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }

  backend "azurerm" {
    storage_account_name  = "terraformstate32053"
    resource_group_name   = "terraform-state"
    container_name        = "terraform-state"
    key                   = "terraform.tfstate"
  }

}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}
