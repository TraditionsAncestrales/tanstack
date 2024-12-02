import type { TypedPocketbase } from "@/lib/pocketbase/schemas";
import Pocketbase from "pocketbase";

let pocketbase: TypedPocketbase;

export function getPocketbase() {
  if (!pocketbase) {
    pocketbase = new Pocketbase(import.meta.env.PUBLIC_ZOD_POCKETBASE_URL);
    pocketbase.autoCancellation(false);
  }
  return pocketbase;
}
