import { generateText,EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { Note } from "./types";
import styles from "./NoteEditor.module.css";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];
type Props = {
  note: Note;
  onChange: (content: JSONContent,title?:string) => void;
};

function NoteEditor({ note, onChange }: Props) {
  const editor = useEditor({
    extensions,
    content: note.content,
    editorProps: {
      attributes: {
        class: styles.textEditor,
      },
    },
    onUpdate({ editor }) {
      const editorContent = editor.getJSON();
      const firstNodeContent=editorContent.content?.[0];
      onChange(
        editorContent,
        firstNodeContent && generateText(firstNodeContent, extensions)
      );
    },
  }, [note.id]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          className={
            editor?.isActive("bold")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          onClick={toggleBold}
        >
          Bold
        </button>

        <button
          className={
            editor?.isActive("italic")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          onClick={toggleItalic}
        >
          Italic
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

export default NoteEditor;