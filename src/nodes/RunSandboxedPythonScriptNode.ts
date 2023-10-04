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
  PluginNodeImpl,
  PortId,
  Project,
  Rivet,
} from "@ironclad/rivet-core";
import { runCode } from "@e2b/sdk";

export type RunSandboxedPythonScriptNode = ChartNode<
  "runSandboxedPythonScript",
  RunSandboxedPythonScriptNodeData
>;

export type RunSandboxedPythonScriptNodeData = {
  /** The python script to run */
  scriptText?: string;
};

export default function (rivet: typeof Rivet) {
  const nodeImpl: PluginNodeImpl<RunSandboxedPythonScriptNode> = {
    create(): RunSandboxedPythonScriptNode {
      return {
        id: rivet.newId<NodeId>(),
        data: {},
        title: "Run Sandboxed Python Script",
        type: "runSandboxedPythonScript", // must match the type of your node
        visualData: {
          x: 0,
          y: 0,
          width: 200,
        },
      };
    },

    getInputDefinitions(
      data: RunSandboxedPythonScriptNodeData,
      _connections: NodeConnection[],
      _nodes: Record<NodeId, ChartNode>,
      _project: Project
    ): NodeInputDefinition[] {
      return [
        {
          id: "scriptText" as PortId,
          dataType: "string",
          required: true,
          title: "Script",
        },
      ];
    },

    getOutputDefinitions(
      _data: RunSandboxedPythonScriptNodeData,
      _connections: NodeConnection[],
      _nodes: Record<NodeId, ChartNode>,
      _project: Project
    ): NodeOutputDefinition[] {
      return [
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
    },

    getUIData(): NodeUIData {
      return {
        group: "E2B",
        contextMenuTitle: "Run Sandboxed Python Script",
        infoBoxTitle: "Run Sandboxed Python Script",
        infoBoxBody: "Run a python script in a sandboxed environment.",
      };
    },

    getEditors(
      _data: RunSandboxedPythonScriptNodeData
    ): EditorDefinition<RunSandboxedPythonScriptNode>[] {
      return []; // Node accepts only inputs
      // return [
      //   {
      //     type: "string",
      //     dataKey: "scriptText",
      //     label: "Script",
      //   },
      // ];
    },

    getBody(
      data: RunSandboxedPythonScriptNodeData
    ): string | NodeBodySpec | NodeBodySpec[] | undefined {
      return ``; // Does not make much sense to show again
    },

    async process(
      data: RunSandboxedPythonScriptNodeData,
      inputData: Inputs,
      context: InternalProcessContext
    ): Promise<Outputs> {
      // TODO: Take scriptText option optionally from data
      // const scriptText = rivet.getInputOrData(
      //   data,
      //   inputData,
      //   "scriptText",
      //   "string"
      // );
      let scriptText = rivet.coerceType(
        inputData["scriptText" as PortId],
        "string"
      );

      await runCode(
        // @ts-ignore
        "Python3",
        scriptText
      );

      const { stdout, stderr } = { stdout: "", stderr: ""}

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
  };

  return rivet.pluginNodeDefinition(
    nodeImpl,
    "Run Python Script in E2B sandboxed environment"
  );
}
