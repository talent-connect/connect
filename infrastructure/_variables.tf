variable "organisation" {
  type        = string
  description = "This variable defines the name of the company"
  default     = "red"
}

variable "location" {
  type        = string
  description = "Azure region where resources will be created"
  default     = "germanywestcentral"
}

variable "location_europe" {
  type        = string
  description = "Azure region where resources will be created"
  default     = "westeurope"
}

variable "tier" {
  type        = string
  description = "Pricing tier"
  default     = "Standard"
}

variable "sku_size" {
  type        = string
  description = "The SKU size of a new app service plan. The options are: F1, D1, B1, B2, B3, S1, S2, S3, P1v2, P2v2, P3v2."
  default     = "S1"
}
