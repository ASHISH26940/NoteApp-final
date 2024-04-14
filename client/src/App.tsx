import styles from './App.module.css'
import { useState,useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import NoteEditor from './NoteEditor';
import { Note } from './types';
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

  const handleChangeNoteContent = (
    noteId: string,
    content: JSONContent,
    title = "New note"
  ) => {
    setNotes((notes) => ({
      ...notes,
      [noteId]: {
        ...notes[noteId],
        content,
        updatedAt: new Date(),
        title,
      },
    }));
  };

  //-----------------------------------------------------------------------------------------------------------//
  //just fetching the data.
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/getAll');
        const fetchedNotes = await response.json();
  
        // Create a temporary object to collect updated notes
        const updatedNotes: Record<string, Note> = {};
  
        fetchedNotes.forEach((note: Note) => {
          updatedNotes[note.id] = {
            id: note.id,
            content: note.content,
            title: note.title,
            updatedAt: new Date(note.updatedAt), // Assuming note.updatedAt is a string date
          };
        });
  
        // Update state once after processing all the notes
        setNotes((prevNotes) => ({
          ...prevNotes,
          ...updatedNotes,
        }));
      } catch (err) {
        console.error('Error fetching notes:', err);
      }
    };
  
    fetchNotes();
  }, []);


  

  //============================================================================================================//

  

  const handleSaveContent = ()=>{
    const note = activeNote;
    if(!note){
      return;
    }
    const saveNote = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: note.id,
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt,
          }),
        });
        const newNote = await response.json();
        setNotes((notes) => ({
          ...notes,
          [newNote.id]: newNote,
        }));
      } catch (err) {
        console.error('Error saving note:', err);
      }
    };
    saveNote();
  }

const handleUpdateContent = ()=>{
  const note = activeNote;
  if(!note){
    return;
  }
  const updateNote = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/update/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: note.id,
          title: note.title,
          content: note.content,
          updatedAt: note.updatedAt,
        }),
      });
      const updatedNote = await response.json();
      setNotes((notes) => ({
        ...notes,
        [updatedNote.id]: updatedNote,
      }));
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };
  updateNote();
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