
// src/nodes/RunSandboxedPythonScriptNode.ts
function RunSandboxedPythonScriptNode_default(rivet) {
  const nodeImpl = {
    create() {
      return {
        id: rivet.newId(),
        data: {},
        title: "Run Sandboxed Python Script",
        type: "runSandboxedPythonScript",
        // must match the type of your node
        visualData: {
          x: 0,
          y: 0,
          width: 200
        }
      };
    },
    getInputDefinitions(data, _connections, _nodes, _project) {
      return [
        {
          id: "scriptText",
          dataType: "string",
          required: true,
          title: "Script"
        }
      ];
    },
    getOutputDefinitions(_data, _connections, _nodes, _project) {
      return [
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
    },
    getUIData() {
      return {
        group: "E2B",
        contextMenuTitle: "Run Sandboxed Python Script",
        infoBoxTitle: "Run Sandboxed Python Script",
        infoBoxBody: "Run a python script in a sandboxed environment."
      };
    },
    getEditors(_data) {
      return [];
    },
    getBody(data) {
      return ``;
    },
    async process(data, inputData, context) {
      let scriptText = rivet.coerceType(
        inputData["scriptText"],
        "string"
      );
      return {
        ["stdout"]: {
          type: "string",
          value: ""
        },
        ["stderr"]: {
          type: "string",
          value: ""
        }
      };
    }
  };
  return rivet.pluginNodeDefinition(
    nodeImpl,
    "Run Python Script in E2B sandboxed environment"
  );
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
      register(RunSandboxedPythonScriptNode_default(rivet));
    }
  };
  return plugin;
};
var src_default = initializer;
export {
  src_default as default
};
