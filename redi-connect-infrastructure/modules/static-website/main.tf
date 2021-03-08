locals {
  name_no_separator = replace(var.name, "-", "")
}
resource "azurerm_storage_account" "static_storage" {
  //  resource_group_name       = azurerm_resource_group.webapp-rg.name
  //  location                  = azurerm_resource_group.webapp-rg.location
  name                      = "${local.name_no_separator}${var.env_prefix_no_separator}"
  resource_group_name       = var.resource-group-name
  location                  = var.resource-group-location
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
  name                = "cdn-profile-${var.name}-${var.env_prefix}"
  resource_group_name = var.resource-group-name
  location            = var.location_europe # accepts only this location
  sku                 = "Standard_Microsoft"
}

resource "azurerm_cdn_endpoint" "cdn-endpoint" {
  //  resource_group_name           = azurerm_resource_group.webapp-rg.name
  name                          = "cdn-endpoint-${var.name}-${var.env_prefix}"
  profile_name                  = azurerm_cdn_profile.cdn-profile.name
  resource_group_name           = var.resource-group-name
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