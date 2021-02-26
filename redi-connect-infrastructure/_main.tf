#---------------------------------------------------------
# Local declarations
#----------------------------------------------------------
locals {
  env_prefix              = "${var.environment}-${var.organisation}"
  env_prefix_no_separator = "${var.environment}${var.organisation}"
  // todo these two need to be removed when we move to REDI connect azure account.
  resource-group-name     = "rediconnect"
  resource-group-location = "germanywestcentral"
}


#---------------------------------------------------------
# Storage Account Creation and enable static website
#----------------------------------------------------------
// todo
//  In reality we would like terraform to create this resource group for us in azure.
//  However since we are operating now under the microsoft account we have a resource group created for us.
//resource "azurerm_resource_group" "webapp-rg" {
//  name     = "rg-${local.env_prefix}"
//  location = var.location
//}

resource "azurerm_storage_account" "static_storage" {
  //  resource_group_name       = azurerm_resource_group.webapp-rg.name
  //  location                  = azurerm_resource_group.webapp-rg.location
  name                      = "storagefront${local.env_prefix_no_separator}"
  resource_group_name       = local.resource-group-name
  location                  = local.resource-group-location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  enable_https_traffic_only = true

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }

  tags = {
    product = var.organisation
  }
}


#---------------------------------------------------------
# CDN profile and endpoint to static website
#----------------------------------------------------------
resource "azurerm_cdn_profile" "cdn-profile" {
  //  resource_group_name = azurerm_resource_group.webapp-rg.name
  name                = "cdn-profile-front-${local.env_prefix}"
  resource_group_name = local.resource-group-name
  location            = var.location_europe # accepts only this location
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "cdn-endpoint" {
  //  resource_group_name           = azurerm_resource_group.webapp-rg.name
  name                          = "cdn-endpoint-front-${local.env_prefix}"
  profile_name                  = azurerm_cdn_profile.cdn-profile.name
  resource_group_name           = local.resource-group-name
  location                      = var.location_europe # accepts only this location
  origin_host_header            = azurerm_storage_account.static_storage.primary_web_host
  querystring_caching_behaviour = "IgnoreQueryString"

  origin {
    name      = "websiteorginaccount"
    host_name = azurerm_storage_account.static_storage.primary_web_host
  }

  delivery_rule {
    name  = "EnforceHTTPS"
    order = "1"

    request_scheme_condition {
      operator     = "Equal"
      match_values = ["HTTP"]
    }

    url_redirect_action {
      redirect_type = "Found"
      protocol      = "Https"
    }
  }
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

  app_settings = {
    MONGO_PRODUCTION_URL = element(azurerm_cosmosdb_account.db.connection_strings, 0)
  }

  // todo have different slots
  plan = {
    name     = "plan-${local.env_prefix}"
    sku_size = var.sku_size
  }
}
