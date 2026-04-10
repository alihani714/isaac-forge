import { Swarm } from "../core";
import { scientificAgent } from "../agents/scientist";

/**
 * DEMO: Scientific Research Synthesis
 * This example demonstrates the RAG pipeline retrieving peer-reviewed
 * papers and generating a cited response.
 */
async function runResearchDemo() {
    const swarm = new Swarm();
    const query = "What are the latest findings on using Metformin for lifespan extension in non-diabetics?";

    console.log(`\n🔬 Topic: ${query}`);
    console.log("--------------------------------------------------\n");
    console.log("Searching scientific databases... 🛰️\n");

    const messages = [{ role: "user", content: query }];
    
    // Execute the Swarm loop with the Scientific Agent
    const response = await swarm.run({
        agent: scientificAgent,
        messages: messages,
    });

    console.log("RESEARCH SYNTHESIS:\n");
    console.log(response.messages[response.messages.length - 1].content);
}

runResearchDemo().catch(console.error);
