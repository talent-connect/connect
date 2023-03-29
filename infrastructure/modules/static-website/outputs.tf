output "storage_account_name" {
  value       = azurerm_storage_account.static_storage.name
  description = "The name of the storage account"
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
  description = "Static web site URL from storage account"
}