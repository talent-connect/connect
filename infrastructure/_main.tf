#---------------------------------------------------------
# Local declarations
#----------------------------------------------------------
locals {
  env                     = terraform.workspace == "default" ? "staging" : terraform.workspace
  env_prefix              = "${local.env}-${var.organisation}"
  env_prefix_no_separator = "${local.env}${var.organisation}"
  // todo these two need to be rcemoved when we move to REDI connect azure account.
  resource-group-name     = "red-platform"
  resource-group-location = "germanywestcentral"
}

// todo
//  In reality we would like terraform to create this resource group for us in azure.
//  However since we are operating now under the microsoft account we have a resource group created for us.
//resource "azurerm_resource_group" "webapp-rg" {
//  name     = "rg-${local.env_prefix}"
//  location = var.location
//}

#---------------------------------------------------------
# Storage Account Creation and enable static website
#----------------------------------------------------------
module "static-website-berlin" {
  source                  = "./modules/static-website"
  name                    = "front-berlin"
  organisation            = var.organisation
  location_europe         = var.location_europe
  resource-group-name     = local.resource-group-name
  resource-group-location = local.resource-group-location
  env_prefix              = local.env_prefix
  env_prefix_no_separator = local.env_prefix_no_separator
}

module "static-website-munich" {
  source                  = "./modules/static-website"
  name                    = "front-munich"
  organisation            = var.organisation
  location_europe         = var.location_europe
  resource-group-name     = local.resource-group-name
  resource-group-location = local.resource-group-location
  env_prefix              = local.env_prefix
  env_prefix_no_separator = local.env_prefix_no_separator
}

module "static-website-picker" {
  source                  = "./modules/static-website"
  name                    = "front-picker"
  organisation            = var.organisation
  location_europe         = var.location_europe
  resource-group-name     = local.resource-group-name
  resource-group-location = local.resource-group-location
  env_prefix              = local.env_prefix
  env_prefix_no_separator = local.env_prefix_no_separator
}

module "static-website-nrw" {
  source                  = "./modules/static-website"
  name                    = "front-nrw"
  organisation            = var.organisation
  location_europe         = var.location_europe
  resource-group-name     = local.resource-group-name
  resource-group-location = local.resource-group-location
  env_prefix              = local.env_prefix
  env_prefix_no_separator = local.env_prefix_no_separator
}

module "static-website-tp" {
  source                  = "./modules/static-website"
  name                    = "front-tp"
  organisation            = var.organisation
  location_europe         = var.location_europe
  resource-group-name     = local.resource-group-name
  resource-group-location = local.resource-group-location
  env_prefix              = local.env_prefix
  env_prefix_no_separator = local.env_prefix_no_separator
}

#---------------------------------------------------------
# Azure container registry & Web app container
#----------------------------------------------------------
resource "azurerm_container_registry" "acr" {
  name                = "registry${local.env_prefix_no_separator}"
  resource_group_name = local.resource-group-name
  location            = var.location
  sku                 = var.tier
  admin_enabled       = true
}

module "web_app_container" {
  source                   = "innovationnorway/web-app-container/azurerm"
  name                     = "app-${local.env_prefix}"
  resource_group_name      = local.resource-group-name
  docker_registry_url      = azurerm_container_registry.acr.login_server
  docker_registry_username = azurerm_container_registry.acr.admin_username
  docker_registry_password = azurerm_container_registry.acr.admin_password
  https_only               = true
  container_image          = "${azurerm_container_registry.acr.login_server}/red-platform-backend:latest"

  plan = {
    name     = "plan-${local.env_prefix}"
    sku_size = var.sku_size
  }
}
