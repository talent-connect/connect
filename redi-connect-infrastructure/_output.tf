output "resource_group_name" {
  value = azurerm_resource_group.webapp-rg.name
}

output "storage_account_id" {
  value       = azurerm_storage_account.static_storage.id
  description = "The ID of the storage account."
}

output "storage_account_name" {
  value       = azurerm_storage_account.static_storage.name
  description = "The name of the storage account."
}

output "storage_primary_connection_string" {
  value       = azurerm_storage_account.static_storage.primary_connection_string
  sensitive   = true
  description = "The primary connection string for the storage account."
}

output "storage_primary_access_key" {
  value       = azurerm_storage_account.static_storage.primary_access_key
  sensitive   = true
  description = "The primary access key for the storage account."
}

output "static_website_cdn_endpoint_hostname" {
  value       = element(concat(azurerm_cdn_endpoint.cdn-endpoint.*.name, [""]), 0)
  description = "CDN endpoint URL for Static website"
}

output "static_website_cdn_profile_name" {
  value       = element(concat(azurerm_cdn_profile.cdn-profile.*.name, [""]), 0)
  description = "CDN profile name for the static website"
}

output "static_website_url" {
  value       = azurerm_storage_account.static_storage.primary_web_host
  description = "static web site URL from storage account"
}