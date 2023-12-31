# Rivet Plugin - E2B

[Rivet](https://github.com/Ironclad/rivet) plugin that allows you to execute arbitrary code in sandboxed [E2B](https://e2b.dev/docs) environments.

![](.assets/demo.png)

## Using the plugin

https://rivet.ironcladapp.com/docs/user-guide/plugins/built-in/all 

## Local Development

1. Run `yarn dev` to start the compiler and bundler in watch mode. This will automatically recombine and rebundle your changes into the `dist` folder.

2. The Rivet application installs plugins from NPM into `%APPLOCALDATA/com.ironcladapp.rivet/plugin/[plugin-id]/package` - This is different for each OS. To copy your plugin install directory, open the Add Plugin dialog, and click the Copy button next to the directory shown.

   To develop locally, you have two options:

   - After each change to your compiled bundled, copy your bundled files into the above directory, and restart Rivet
   - Turn the above plugin directory into your main plugin development directory, and do all your development from that directory. Restart Rivet after each change.
