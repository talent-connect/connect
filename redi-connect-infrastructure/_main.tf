#---------------------------------------------------------
# Local declarations
#----------------------------------------------------------
resource "random_string" "unique" {
  length  = 4
  upper   = false
  number  = true
  lower   = true
  special = false
}

locals {
  env_prefix              = "${var.environment}-${var.organisation}-${random_string.unique.result}"
  env_prefix_no_separator = "${var.environment}${var.organisation}${random_string.unique.result}"
}


#---------------------------------------------------------
# Storage Account Creation and enable static website
#----------------------------------------------------------
resource "azurerm_resource_group" "webapp-rg" {
  name     = "rg-${local.env_prefix}"
  location = var.location
}

resource "azurerm_storage_account" "static_storage" {
  name                      = "storage${local.env_prefix_no_separator}"
  resource_group_name       = azurerm_resource_group.webapp-rg.name
  location                  = azurerm_resource_group.webapp-rg.location
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
  name                = "cdn-profile-${local.env_prefix}"
  resource_group_name = azurerm_resource_group.webapp-rg.name
  location            = var.location_europe
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "cdn-endpoint" {
  name                          = "cdn-endpoint-${local.env_prefix}"
  profile_name                  = azurerm_cdn_profile.cdn-profile.name
  resource_group_name           = azurerm_resource_group.webapp-rg.name
  location                      = var.location_europe
  origin_host_header            = azurerm_storage_account.static_storage.primary_web_host
  querystring_caching_behaviour = "IgnoreQueryString"

  origin {
    name      = "websiteorginaccount"
    host_name = azurerm_storage_account.static_storage.primary_web_host
  }
}
