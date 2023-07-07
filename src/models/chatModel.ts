import { Message } from "ai";

export type chatModel = {
  id:string,
  title:string,
  systemMessage:string,
  tokens:number,
  messages:Message[],
  keptMessages:string[],
}
