
import type { VisitorsPoint } from "../data/visitors"

export async function fetchVisitorsLast30d(): Promise<VisitorsPoint[]> {
  // TODO: trocar por chamada real
  const { visitorsLast30d } = await import("../data/visitors")
  return visitorsLast30d
}
