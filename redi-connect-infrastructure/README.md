# redi-connect-infrastructure

In this project we keep all the infrastructure redi-connect needs to run. We do that writing infrastructure as code using [terraform](https://www.terraform.io/).

## Prerequisites

The first time one executes terraform on an azure subscription they would have to create an azure container where they can store terraform state.


This is the list of prerequisites required for the `connect` ci/cd pipeline:

1. Before you run `terraform init` - Create the backend for azure.

    resource:  https://docs.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage
    
    We do this using terraform. The tf code to provision the backend is in the `az-remote-backend-*` files.
    When you `terraform aply` for the first time the backend will be provisioned for you in azure.
    Also you will see the outputs, something like:
    
    ```
    storage_account_name: tstate8694
    container_name: tstate
    access_key: ****
    
    ``` 
    You will have to copy the `storage_account_name: terraformstateXXXX` and paste them in the `_versions.tf` file like so
    ```
     backend "azurerm" {
       storage_account_name  = "terraformstateXXXX"
        .
        .
        .
     }
    ```
    
    Then you can run `terraform init`
    
2. Creating a Service Principal and a Client Secret

    Using a Service Principal, also known as SPN, is a best practice for DevOps or CI/CD environments.
    First, we need to authenticate to Azure. To authenticate using Azure CLI, we type:
    ```
    az login
    ```
    The process will launch the browser and after the authentication is complete we are ready to go.
    We will use the following command to get the list of Azure subscriptions:
    ```
    az account list --output table
    ```
    We can select the subscription using the following command (both subscription id and subscription name are accepted):
    ```
    az account set --subscription <Azure-SubscriptionId>
    ```
    Then create the service principal account using the following command:
    ```
    az ad sp create-for-rbac --role="Contributor" 
    --scopes="/subscriptions/SUBSCRIPTION_ID"
    ```
    Executing the function above will return you the following values on a json
    These values will be mapped to these Terraform variables:
    ```
    appId (Azure) → client_id (Terraform).
    password (Azure) → client_secret (Terraform).
    tenant (Azure) → tenant_id (Terraform).
    ```

### how to get your `AZURE_CREDENTIALS`

after you created you principal as described above you can recover your credentials using the command bellow
```
az ad sp create-for-rbac --name "your_principal_name" --sdk-auth --role contributor --scopes /subscriptions/your_subscription_id/resourceGroups/your_resource_group_name
```

### how to get your `REGISTRY_USERNAME` & `REGISTRY_PASSWORD`

Run the az acr show command to retrieve credentials for the registry:

```
az acr credential show --resource-group AppSvc-DockerTutorial-rg --name <registry-name>
```

## Caveats on terraform code

### custom cdn endpoints are not supported

https://github.com/terraform-providers/terraform-provider-azurerm/issues/398
That means the user needs to add a custom cdn via the cli.

----

Resources: 

https://github.com/Azure/webapps-deploy
https://docs.microsoft.com/en-us/azure/app-service/tutorial-custom-container?pivots=container-linux
https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli


### `.tfvars`

#### The file `development.auto.tfvars`
In this file we are storing the variables we are using for development environment

#### The file `production.tfvars`
For production deployment of the redi-connect infrastructure you will need to pass the `-var-file=production.tfvars` in your terraform commands

For example `terraform plan -var-file=production.tfvars` or `terraform apply -var-file=production.tfvars` 

The difference between these two environments is that the production env will be using a more expensive `sku` and tier than the development one.

NOTE: at the time I am writing this tough we dont have any production system yet.