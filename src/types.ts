import { z } from "zod";

export interface Message {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  name?: string;
  tool_call_id?: string;
}

export interface FunctionDescriptor {
  name: string;
  description: string;
  parameters: z.ZodObject<any>;
}

export type AgentFunction = (args: any) => Promise<string>;

export interface AgentConfig {
  name: string;
  instructions: string;
  functions?: FunctionDescriptor[];
  model?: string;
}

export interface RunOptions {
  agent: any;
  messages: Message[];
  context_variables?: Record<string, any>;
  max_turns?: number;
}

export interface RunResponse {
  messages: Message[];
  agent: any;
  context_variables: Record<string, any>;
}
