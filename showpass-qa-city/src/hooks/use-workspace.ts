"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  decodeWorkspace,
  readWorkspaceSnapshot,
  subscribeToWorkspace,
} from "@/lib/workspace/store";

function getServerSnapshot() {
  return null;
}

export function useWorkspace() {
  const snapshot = useSyncExternalStore(
    subscribeToWorkspace,
    readWorkspaceSnapshot,
    getServerSnapshot,
  );
  return useMemo(() => decodeWorkspace(snapshot), [snapshot]);
}
