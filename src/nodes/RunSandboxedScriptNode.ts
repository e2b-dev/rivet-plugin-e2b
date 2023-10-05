import type {
  ChartNode,
  EditorDefinition,
  Inputs,
  InternalProcessContext,
  NodeBodySpec,
  NodeConnection,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  NodeUIData,
  Outputs,
  PortId,
  Project,
  Rivet,
} from "@ironclad/rivet-core";

export type RunSandboxedScriptNode = ChartNode<
  "runSandboxedScript",
  RunSandboxedScriptNodeData
>;

export type RunSandboxedScriptNodeData = {
  /** The python script to run */
  scriptText?: string;
};

const scriptTextInputDefinition: NodeInputDefinition = {
  id: "scriptText" as PortId,
  dataType: "string",
  required: true,
  title: "Script",
};

const scriptOutputDefinitions: NodeOutputDefinition[] = [
  {
    id: "stdout" as PortId,
    dataType: "string",
    title: "stdout",
  },
  {
    id: "stderr" as PortId,
    dataType: "string",
    title: "stderr",
  },
];

function runSandboxedScriptNodeFactory(rivet: typeof Rivet, runtime: string) {
  return rivet.pluginNodeDefinition(
    {
      create(): RunSandboxedScriptNode {
        return {
          id: rivet.newId<NodeId>(),
          data: {}, // no internal data
          title: `Run Sandboxed ${runtime} Script`,
          // @ts-ignore
          type: `runSandboxed${runtime}Script`, // must match the type of your node
          visualData: {
            x: 0,
            y: 0,
            width: 300,
          },
        };
      },

      getInputDefinitions(
        data: RunSandboxedScriptNodeData,
        _connections: NodeConnection[],
        _nodes: Record<NodeId, ChartNode>,
        _project: Project
      ): NodeInputDefinition[] {
        return [
          scriptTextInputDefinition,
        ];
      },

      getOutputDefinitions(
        _data: RunSandboxedScriptNodeData,
        _connections: NodeConnection[],
        _nodes: Record<NodeId, ChartNode>,
        _project: Project
      ): NodeOutputDefinition[] {
        return scriptOutputDefinitions;
      },

      getUIData(): NodeUIData {
        return {
          group: "E2B",
          contextMenuTitle: `Run Sandboxed ${runtime} Script`,
          infoBoxTitle: `Run Sandboxed ${runtime} Script`,
          infoBoxBody: `Run a ${runtime} script in a sandboxed environment.`,
        };
      },

      getEditors(
        _data: RunSandboxedScriptNodeData
      ): EditorDefinition<RunSandboxedScriptNode>[] {
        return []; // Node only works with input, does not have any internal data
      },

      getBody(
        data: RunSandboxedScriptNodeData
      ): string | NodeBodySpec | NodeBodySpec[] | undefined {
        return ``; // TODO: Think about what would be useful to show here? Whole script text?
      },

      async process(
        data: RunSandboxedScriptNodeData,
        inputData: Inputs,
        context: InternalProcessContext
      ): Promise<Outputs> {
        const apiKey = context.getPluginConfig('e2bApiKey');
        if (!apiKey) {
          throw new Error('E2B API key not set.');
        }
        
        if (context.executor !== "nodejs")
          throw new Error("This node can only be run using a nodejs executor.");

        const scriptText = rivet.coerceType(
          inputData["scriptText" as PortId],
          "string"
        );

        const nodeEntry = await import("../nodeEntry");

        // @ts-expect-error TS7053
        const { stdout, stderr } = await nodeEntry[`runSandboxed${runtime}Script`](scriptText, apiKey);

        return {
          ["stdout" as PortId]: {
            type: "string",
            value: stdout,
          },
          ["stderr" as PortId]: {
            type: "string",
            value: stderr,
          },
        };
      },
    },
    `Run ${runtime} Script in E2B sandboxed environment`
  );
}

export function runSandboxedPythonScriptNode(rivet: typeof Rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Python");
}

export function runSandboxedNodeScriptNode(rivet: typeof Rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Node");
}

export function runSandboxedBashScriptNode(rivet: typeof Rivet) {
  return runSandboxedScriptNodeFactory(rivet, "Bash");
}
