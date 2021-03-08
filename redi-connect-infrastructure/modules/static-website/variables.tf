variable "name" {
  type        = string
  description = "Single word name"
}

variable "resource-group-location" {
  type        = string
  description = "Azure region where resources will be created"
}

variable "resource-group-name" {
  type        = string
  description = "Azure resource group name"
}

variable "env_prefix_no_separator" {
  type        = string
  description = "Prefix no separator"
}

variable "env_prefix" {
  type        = string
  description = "Prefix with separator"
}

variable "organisation" {
  type        = string
  description = "Organisation name"
}

variable "location_europe" {
  type        = string
  description = "Azure region where resources will be created"
}
