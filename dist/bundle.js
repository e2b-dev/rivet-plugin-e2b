// src/nodes/RunSandboxedScriptNode.ts
var scriptTextInputDefinition = {
  id: "scriptText",
  dataType: "string",
  required: true,
  title: "Script"
};
var scriptOutputDefinitions = [
  {
    id: "stdout",
    dataType: "string",
    title: "stdout"
  },
  {
    id: "stderr",
    dataType: "string",
    title: "stderr"
  }
];
function runSandboxedScriptNodeFactory(rivet, runtime) {
  return rivet.pluginNodeDefinition(
    {
      create() {
        return {
          id: rivet.newId(),
          data: {},
          // no internal data
          title: `Run Sandboxed ${runtime} Script`,
          // @ts-ignore
          type: `runSandboxed${runtime}Script`,
          // must match the type of your node
          visualData: {
            x: 0,
            y: 0,
            width: 300
          }
        };
      },
      getInputDefinitions(data, _connections, _nodes, _project) {
        return [
          scriptTextInputDefinition
        ];
      },
      getOutputDefinitions(_data, _connections, _nodes, _project) {
        return scriptOutputDefinitions;
      },
      getUIData() {
        return {
          group: "E2B",
          contextMenuTitle: `Run Sandboxed ${runtime} Script`,
          infoBoxTitle: `Run Sandboxed ${runtime} Script`,
          infoBoxBody: `Run a ${runtime} script in a sandboxed environment.`
        };
      },
      getEditors(_data) {
        return [];
      },
      getBody(data) {
        return ``;
      },
      async process(data, inputData, context) {
        const apiKey = context.getPluginConfig("e2bApiKey");
        if (!apiKey) {
          throw new Error("E2B API key not set.");
        }
        if (context.executor !== "nodejs")
          throw new Error("This node can only be run using a nodejs executor.");
        const scriptText = rivet.coerceType(
          inputData["scriptText"],
          "string"
        );
        const nodeEntry = await import("../dist/nodeEntry.cjs");
        const { stdout, stderr } = await nodeEntry[`runSandboxed${runtime}Script`](scriptText, apiKey);
        return {
          ["stdout"]: {
            type: "string",
            value: stdout
          },
          ["stderr"]: {
            type: "string",
            value: stderr
          }
        };
      }
    },
    `Run ${runtime} Script in E2B sandboxed environment`
  );
}
function runSandboxedPythonScriptNode(rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Python");
}
function runSandboxedNodeScriptNode(rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Node");
}
function runSandboxedBashScriptNode(rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Bash");
}

// src/index.ts
var initializer = (rivet) => {
  const plugin = {
    id: "rivet-plugin-e2b",
    name: "E2B Rivet Plugin",
    configSpec: {
      e2bApiKey: {
        type: "secret",
        label: "E2B API Key",
        description: "The API key required to use the E2B. Get your at https://e2b.dev/docs",
        pullEnvironmentVariable: "E2B_API_KEY",
        helperText: "You may also set the E2B_API_KEY environment variable."
      }
    },
    contextMenuGroups: [
      {
        id: "e2b",
        label: "E2B"
      }
    ],
    register: (register) => {
      register(runSandboxedPythonScriptNode(rivet));
      register(runSandboxedNodeScriptNode(rivet));
      register(runSandboxedBashScriptNode(rivet));
    }
  };
  return plugin;
};
var src_default = initializer;
export {
  src_default as default
};
