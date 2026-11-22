import { cityAgents } from "./city";
import { demoWorkspace } from "./demo";
import {
  agentFormSchema,
  runFormSchema,
  workspaceSchema,
  type AgentFormValues,
  type RunFormValues,
  type Workspace,
} from "./schema";

const storageKey = "showpass-qa-city:workspace:v1";
const workspaceChanged = "qa-city-workspace-changed";
const cityAgentIds = new Set(cityAgents.map(({ id }) => id));

export function readWorkspaceSnapshot() {
  try {
    return window.localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

export function decodeWorkspace(snapshot: string | null): Workspace {
  if (snapshot === null) return demoWorkspace;

  try {
    const result = workspaceSchema.safeParse(JSON.parse(snapshot));
    if (!result.success) return demoWorkspace;
    const { agents, runs } = result.data;
    return {
      agents: [...cityAgents, ...agents.filter(({ id }) => !cityAgentIds.has(id))],
      runs: runs.map((run) =>
        /^demo-10[1-4]$/.test(run.id) ? { ...run, sample: true } : run,
      ),
    };
  } catch {
    return demoWorkspace;
  }
}

export function subscribeToWorkspace(listener: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) listener();
  }

  window.addEventListener("storage", onStorage);
  window.addEventListener(workspaceChanged, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(workspaceChanged, listener);
  };
}

function updateWorkspace(update: (workspace: Workspace) => Workspace) {
  const save = () => {
    let current: Workspace;
    try {
      current = decodeWorkspace(window.localStorage.getItem(storageKey));
    } catch {
      throw new Error("Browser storage is unavailable.");
    }

    const next = update(current);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      throw new Error("Couldn’t save the workspace in this browser.");
    }
    window.dispatchEvent(new Event(workspaceChanged));
  };

  // Serialize changes across tabs when the browser supports Web Locks.
  if (navigator.locks) return navigator.locks.request(storageKey, save);
  return Promise.resolve().then(save);
}

export function addAgent(input: AgentFormValues) {
  const agent = agentFormSchema.parse(input);
  return updateWorkspace((workspace) => {
    const name = agent.name.toLowerCase();
    if (workspace.agents.some((existing) => existing.name.toLowerCase() === name)) {
      throw new Error("An agent with this name already exists.");
    }

    return {
      ...workspace,
      agents: [...workspace.agents, { ...agent, id: crypto.randomUUID() }],
    };
  });
}

export function queueRun(input: RunFormValues) {
  const run = runFormSchema.parse(input);
  return updateWorkspace((workspace) => {
    if (!workspace.agents.some((agent) => agent.id === run.agentId)) {
      throw new Error("Choose an agent from the current workspace.");
    }

    const previousRun = workspace.runs.find(({ id }) => id === run.sourceRunId);
    if (run.sourceRunId && !previousRun) {
      throw new Error("The handoff run is no longer in the workspace.");
    }

    return {
      ...workspace,
      runs: [
        {
          ...run,
          target: run.target || previousRun?.target || "",
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: "queued",
          sample: false,
        },
        ...workspace.runs,
      ],
    };
  });
}

export function cancelRun(id: string) {
  return updateWorkspace((workspace) => {
    const run = workspace.runs.find((entry) => entry.id === id);
    if (run?.status !== "queued") throw new Error("This run can no longer be cancelled.");

    return {
      ...workspace,
      runs: workspace.runs.map((entry) =>
        entry.id === id ? { ...entry, status: "cancelled" } : entry,
      ),
    };
  });
}
