export const WHATSAPP_NUMBER = "5514996018212";

export type WhatsAppContext =
  | { kind: "hero" }
  | { kind: "obras"; work: string }
  | { kind: "metodo" }
  | { kind: "contato" };

const messages = {
  hero: () => "Olá, Edivaldo! Vi seu site e gostaria de marcar um café para conversar sobre um projeto.",
  obras: (c: { work: string }) => `Olá! Vi o projeto ${c.work} no site e quero algo nesse estilo.`,
  metodo: () => "Olá! Quero entender como funciona o acompanhamento do terreno à chave.",
  contato: () => "Olá! Gostaria de agendar uma visita ao escritório.",
};

export function buildWhatsAppLink(context: WhatsAppContext): string {
  const text = context.kind === "obras" ? messages.obras(context) : messages[context.kind]();
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
