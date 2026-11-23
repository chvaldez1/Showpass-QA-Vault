"use client";

import { useSyncExternalStore } from "react";
import { demoWorkspace } from "@/lib/workspace/demo";
import { readWorkspaceSnapshot, subscribeToWorkspace } from "@/lib/workspace/store";

function getServerSnapshot() {
  return demoWorkspace;
}

export function useWorkspace() {
  return useSyncExternalStore(
    subscribeToWorkspace,
    readWorkspaceSnapshot,
    getServerSnapshot,
  );
}
