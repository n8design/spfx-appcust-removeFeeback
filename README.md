# spfx-appcust-removeFeeback
SharePoint Framework Application Customizer to remove the Feedback Button from Modern Experience Pages such as modern Team Sites and Communication Site.

![Remove Feeback and Mobile app button from moder experience page footer][remove-feeback]

The source code follows the guidelines for application customiser described on [official documentation on how to build an Application Customiser](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/build-a-hello-world-extension)

## Installattion

```bash
git clone https://github.com/StfBauer/spfx-appcust-removeFeeback
npm install
```
### Run the code in Debug mode

```bash
gulp serve --no-browser
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Building the code

```bash
gulp build
gulp bundle
gulp package-solution
```

### Additional Deployment step

Once the Solution has been deployed to your test tenant you need to register the Application Customizer as a custom action on every web site in your tenant through the following command.
In order to process please make sure you have the '[Office365 CLI](https://github.com/SharePoint/office365-cli)' installed on your machine.

```bash
spo customaction add --url https://conotoso.sharepoint.com/sites/SalesTeam --title GoodbyeFeedback --name GoodbyeFeedback --location ClientSideExtension.ApplicationCustomizer --clientSideComponentId 1b6c8db5-6877-406a-9bb3-e866418c3c25 --clientSideComponentProperties '{}'
```

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

[remove-feeback]: ./assets/remove-msft-feedback-buttons.png