import styles from './App.module.css'
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import NoteEditor from './NoteEditor';
import { JSONContent } from '@tiptap/react';

const App = () => {
  const [notes, setNotes] = useState<Record<string,Note>>({});
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  
  const activeNote = activeNoteId ? notes[activeNoteId] : null;

  const handleCreateNewNote =()=>{
    const newNote={
      id:uuid(),
      title:"New note",
      content:`<h1>Hello World</h1>`,
      updatedAt:new Date(),
    }
    setNotes((notes)=>({
      ...notes,
      [newNote.id]:newNote,
    }))
  }

  const handleChangeActiveNote=(id:string)=>{
    setActiveNoteId(id);
    //editor?.commands.setContent(notes[id].content);
  }
  const notesList=Object.values(notes).sort((a,b)=>b.updatedAt.getTime()-a.updatedAt.getTime())

  const handleChangeNoteContent=(
    noteId:string,
    content:JSONContent,
    title="New note")=>{
    setNotes((notes)=>({
      ...notes,
      [noteId]:{
        ...notes[noteId],
        content,
        updatedAt:new Date(),
        title,
      }
    }))
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sidebar}>
      <button className={styles.sidebarButton} onClick={handleCreateNewNote}>
        New Note
      </button>
      <div className={styles.sidebarList}>
        {
          notesList.map((note)=>(
            <div 
            key={note.id}
            role='button'
            tabIndex={0}
            className={note.id===activeNoteId
              ?styles.sidebarListItemActive
              :styles.sidebarListItem}
            onClick={()=>handleChangeActiveNote(note.id)}
            >
              {note.title}
            </div>
          ))
        }
      </div>
      </div>
      {activeNote ? ( <NoteEditor note={activeNote} onChange={(content,title)=>{handleChangeNoteContent(activeNote.id,content,title)}} />):(<div>Select a note to get started</div> )}
    </div>
  );
}

export default App