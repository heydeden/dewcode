import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "@dewcode-ai/core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~dewcode/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~dewcode/WorkspaceRef", {
  defaultValue: () => undefined,
})
