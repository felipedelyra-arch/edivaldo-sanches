// Run: node scripts/check-whatsapp.mjs
import assert from "node:assert/strict";
import { buildWhatsAppLink } from "../lib/whatsapp.ts";

const hero = new URL(buildWhatsAppLink({ kind: "hero" }));
assert.equal(hero.origin + hero.pathname, "https://wa.me/5514996018212");
assert.match(hero.searchParams.get("text"), /^Olá, Edivaldo!/);
const work = buildWhatsAppLink({ kind: "obras", work: "Clínica & Cia #1" });
assert.ok(!work.includes("&C") && !work.includes("#"), "work name must be encoded");
assert.equal(new URL(work).searchParams.get("text"), "Olá! Vi o projeto Clínica & Cia #1 no site e quero algo nesse estilo.");
console.log("whatsapp ok");
