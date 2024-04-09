import {Content} from "@tiptap/react";

export type Note={
    id:string;
    content:Content;
    title:string;
    updatedAt:Date;
  }