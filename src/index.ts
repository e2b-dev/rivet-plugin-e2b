import type { RivetPlugin, RivetPluginInitializer } from "@ironclad/rivet-core";

import {
  runSandboxedBashScriptNode,
  runSandboxedNodeScriptNode,
  runSandboxedPythonScriptNode
} from "./nodes/RunSandboxedScriptNode";

const initializer: RivetPluginInitializer = (rivet) => {
  // Initialize nodes by passing them the Rivet instance
  const plugin: RivetPlugin = {
    id: "rivet-plugin-e2b",
    name: "E2B Rivet Plugin",
    configSpec: {
      e2bApiKey: {
        type: 'secret',
        label: 'E2B API Key',
        description: 'The API key required to use the E2B. Get your at https://e2b.dev/docs',
        pullEnvironmentVariable: 'E2B_API_KEY',
        helperText: 'You may also set the E2B_API_KEY environment variable.',
      }
    },
    contextMenuGroups: [
      {
        id: "e2b",
        label: "E2B",
      },
    ],
    register: (register) => {
      register(runSandboxedPythonScriptNode(rivet));
      register(runSandboxedNodeScriptNode(rivet));
      register(runSandboxedBashScriptNode(rivet));
    },
  };
  return plugin;
};

export default initializer;
