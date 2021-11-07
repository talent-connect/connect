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

resource "azurerm_cosmosdb_account" "db" {
  name                = "cosmos-${local.env_prefix}"
  location            = var.location
  resource_group_name = local.resource-group-name
  offer_type          = "Standard"
  kind                = "MongoDB"

  enable_automatic_failover = true

  capabilities {
    name = "EnableMongo"
  }
  capabilities {
    name = "MongoDBv3.4"
  }

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = var.location
    failover_priority = 0
  }
}

module "web_app_container" {
  depends_on               = [azurerm_cosmosdb_account.db]
  source                   = "innovationnorway/web-app-container/azurerm"
  name                     = "app-${local.env_prefix}"
  resource_group_name      = local.resource-group-name
  docker_registry_url      = azurerm_container_registry.acr.login_server
  docker_registry_username = azurerm_container_registry.acr.admin_username
  docker_registry_password = azurerm_container_registry.acr.admin_password
  https_only               = true
  container_image          = "${azurerm_container_registry.acr.login_server}/red-platform-backend:latest"

  app_settings = {
    // we are having this connection url structured this way because it is necessary for the primary key to be encoded before passed in as an environment variable in the loppback dataresources.json folder.
    MONGO_CONNECTION_URL = "mongodb://${azurerm_cosmosdb_account.db.name}:${urlencode(azurerm_cosmosdb_account.db.primary_master_key)}@${azurerm_cosmosdb_account.db.name}.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${azurerm_cosmosdb_account.db.name}@"
  }

  plan = {
    name     = "plan-${local.env_prefix}"
    sku_size = var.sku_size
  }
}
