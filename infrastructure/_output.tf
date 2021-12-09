output "resource_group_name" {
  value = "red-platform"
  // todo when we will be having our REDI connect azure account this will have to return
  //  value = azurerm_resource_group.webapp-rg.name
}

output "storage_account_name" {
  value       = module.static-website-berlin.storage_account_name
  description = "The name of the storage account."
}
output "storage_account_name_munich" {
  value       = module.static-website-munich.storage_account_name
  description = "The name of the storage account."
}
output "storage_account_name_picker" {
  value       = module.static-website-picker.storage_account_name
  description = "The name of the storage account."
}
output "storage_account_name_nrw" {
  value       = module.static-website-nrw.storage_account_name
  description = "The name of the storage account."
}
output "storage_account_name_tp" {
  value       = module.static-website-tp.storage_account_name
  description = "The name of the storage account."
}

output "static_website_cdn_profile_name_berlin" {
  value       = module.static-website-berlin.static_website_cdn_profile_name
  description = "CDN profile name for the static website for berlin"
}
output "static_website_cdn_profile_name_munich" {
  value       = module.static-website-munich.static_website_cdn_profile_name
  description = "CDN profile name for the static website for munich"
}
output "static_website_cdn_profile_name_picker" {
  value       = module.static-website-picker.static_website_cdn_profile_name
  description = "CDN profile name for the static website for location picker"
}
output "static_website_cdn_profile_name_nrw" {
  value       = module.static-website-nrw.static_website_cdn_profile_name
  description = "CDN profile name for the static website for munich"
}
output "static_website_cdn_profile_name_tp" {
  value       = module.static-website-tp.static_website_cdn_profile_name
  description = "CDN profile name for the static website for TP"
}

output "static_website_cdn_host_name_berlin" {
  value       = module.static-website-berlin.static_website_cdn_endpoint_hostname
  description = "CDN profile name for the static website for berlin"
}
output "static_website_cdn_host_name_munich" {
  value       = module.static-website-munich.static_website_cdn_endpoint_hostname
  description = "CDN profile name for the static website for munich"
}
output "static_website_cdn_host_name_picker" {
  value       = module.static-website-picker.static_website_cdn_endpoint_hostname
  description = "CDN profile name for the static website for location picker"
}
output "static_website_cdn_host_name_nrw" {
  value       = module.static-website-nrw.static_website_cdn_endpoint_hostname
  description = "CDN profile name for the static website for munich"
}
output "static_website_cdn_host_name_tp" {
  value       = module.static-website-tp.static_website_cdn_endpoint_hostname
  description = "CDN profile name for the static website TP"
}

output "static_website_url_berlin" {
  value       = module.static-website-berlin.static_website_url
  description = "static web site URL from storage account"
}
output "static_website_url_munich" {
  value       = module.static-website-munich.static_website_url
  description = "static web site URL from storage account"
}
output "static_website_url_nrw" {
  value       = module.static-website-nrw.static_website_url
  description = "static web site URL from storage account"
}
output "static_website_url_picker" {
  value       = module.static-website-picker.static_website_url
  description = "static web site URL from storage account"
}
output "static_website_url_tp" {
  value       = module.static-website-tp.static_website_url
  description = "static web site URL from storage account"
}

# output "azure_app_service_name" {
#   value = module.web_app_container.name
# }

output "azure_container_registry" {
  value = azurerm_container_registry.acr.login_server
}

output "azure_container_username" {
  value     = azurerm_container_registry.acr.admin_username
  sensitive = true
}

output "azure_container_password" {
  value     = azurerm_container_registry.acr.admin_password
  sensitive = true
}
