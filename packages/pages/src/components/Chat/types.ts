export interface SearchChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface SearchChatSource {
  href: string;
  title: string;
}
