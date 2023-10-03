import type { RivetPlugin, RivetPluginInitializer } from "@ironclad/rivet-core";

import runSandboxedPythonScriptNode from "./nodes/RunSandboxedPythonScriptNode";

const initializer: RivetPluginInitializer = (rivet) => {
  // Initialize nodes by passing them the Rivet instance
  const plugin: RivetPlugin = {
    id: "rivet-plugin-e2b",
    name: "E2B Rivet Plugin",
    configSpec: {},
    contextMenuGroups: [
      {
        id: "e2b",
        label: "E2B",
      },
    ],
    register: (register) => {
      register(runSandboxedPythonScriptNode(rivet));
    },
  };
  return plugin;
};

export default initializer;
