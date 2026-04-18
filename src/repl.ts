import * as readline from "readline";
import { Swarm } from "./core";
import { scientificAgent } from "./agents/scientist";

export async function startRepl() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const swarm = new Swarm();
  console.log("Welcome to Isaac Forge REPL (Scientific Research Mode)");
  console.log("Type your query or 'exit' to quit.\n");

  const ask = () => {
    rl.question("research> ", async (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
        return;
      }

      const response = await swarm.run({
        agent: scientificAgent,
        messages: [{ role: "user", content: input }],
      });

      const lastMessage = response.messages[response.messages.length - 1];
      console.log(`\nAgent: ${lastMessage.content}\n`);
      ask();
    });
  };

  ask();
}
