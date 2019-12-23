# Simple Azure Orchestration with Durable Entity

## Content
This code repository contains a simple HTTP-triggered Azure durable function orchestartor with a durable entity serving as a counter. The counter is triggerd via the durable orchestrator function.

## Setup
Make sure that all requirements for local development of durable functions are fulfilled as described in the [official documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites).

In addition I installed the extensions not via [Extension Bundle](https://docs.microsoft.com/en-US/azure/azure-functions/durable/quickstart-js-vscode#prerequisites) but used the `func install` option i. e. `func extensions install -p Microsoft.Azure.WebJobs.Extensions.DurableTask -v 2.1.0`. (reason, see below)

If you set up the function projetct yourself via Visual Studio Code, make sure to adjust the code as follows due to the fact that teh templates are not up to date (status 23.12.2019):
* Remove the reference to the extension bundle from the `host.json` file
* Adjust the binding in the HTTP orchestration starter to `durableClient` and not `orchestrationClient` as the later is no longer valid for version 2.0 of Azure Functions and the durabel extension

## How to Call
* Start the function locally via `npm run start`
* Use the REST client/CLI you like and trigger the orchestration via a **GET** request at `http://localhost:7071/api/orchestrators/DurableEntityOrchestratorJS`. This will trigger a sequence of interactions between the orchetsrator and the durable entities 

## Deviations from the official documentation (as of 23.12.2019)
The following mismatch with respect to the current [official documentation](https://docs.microsoft.com/en-US/azure/azure-functions/durable/durable-functions-entities) exists :
* The extensions are not installed via extension bundle as the extension `entityTrigger` is not recognized (which is consistent with the [extension bundle JSON](https://github.com/Azure/azure-functions-extension-bundles/blob/master/src/Microsoft.Azure.Functions.ExtensionBundle/extensions.json) ), but via `func install`. This is current state of the art as described in the release notes of [version 2.1.0](https://github.com/Azure/azure-functions-durable-extension/releases) 
* The binding of the EntityClient is an inbound binding as it would be for a OrchestrationClient. The documentation is not consistent here. It is ambivalent if you use in- or outbound binding, but I would stick to the status quo of the orchestration client

## Clearing Local Azure Storage Emulator
If you do local development you might want to purge the history in your local Azure storage emulator. To do so key in the command `AzureStorageEmulator.exe clear all` - and do not forget the `all`, not that taht ever happended to me ;-) 