import { runCode } from "@e2b/sdk";
import type { CodeRuntime } from "@e2b/sdk";

export async function runSandboxedPythonScript(script: string, apiKey: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  return await runCode(<CodeRuntime>"Python3", script, { apiKey } );
}

export async function runSandboxedNodeScript(script: string, apiKey: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  return await runCode(<CodeRuntime>"Node16", script, { apiKey });
}

export async function runSandboxedBashScript(script: string, apiKey: string): Promise<{
  stdout: string;
  stderr: string;
}> {
  return await runCode(<CodeRuntime>"Bash", script, { apiKey });
}
