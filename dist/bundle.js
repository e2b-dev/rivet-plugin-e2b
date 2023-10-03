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
      if (context.executor !== "nodejs")
        throw new Error("This node can only be run using a nodejs executor.");
      let scriptText = rivet.coerceType(
        inputData["scriptText"],
        "string"
      );
      const { runSandboxedPythonScript } = await import("../dist/nodeEntry.cjs");
      const { stdout, stderr } = await runSandboxedPythonScript(scriptText);
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
    configSpec: {},
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
