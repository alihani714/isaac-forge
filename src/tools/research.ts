import { z } from "zod";
import type { AgentFunction, FunctionDescriptor } from "../types";

/**
 * Tool for searching scientific literature via Semantic Scholar API
 */
export const fetch_papers: AgentFunction = async ({ query, limit = 5 }: { query: string; limit?: number }) => {
  const S2_API_URL = "https://api.semanticscholar.org/graph/v1/paper/search";
  
  try {
    const response = await fetch(`${S2_API_URL}?query=${encodeURIComponent(query)}&limit=${limit}&fields=title,url,abstract,year,authors`);
    
    if (!response.ok) {
        throw new Error(`Semantic Scholar API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
        return "No scientific papers found for this query.";
    }

    const results = data.data.map((paper: any, index: number) => {
        return `[${index + 1}] ${paper.title} (${paper.year})\nURL: ${paper.url}\nAbstract: ${paper.abstract?.substring(0, 300)}...`;
    }).join("\n\n");

    return "Found the following scientific papers:\n\n" + results;
  } catch (error) {
    return `Error fetching research data: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const fetch_papers_descriptor: FunctionDescriptor = {
  name: "fetch_papers",
  description: "Searches for peer-reviewed scientific papers and research literature. Use this for academic, medical, or technical queries that require verified sources.",
  parameters: z.object({
    query: z.string().describe("The research topic or scientific question to search for."),
    limit: z.number().optional().describe("Number of papers to retrieve (default 5)."),
  }),
};
