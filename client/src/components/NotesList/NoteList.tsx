import { useState, useEffect } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

import NoteInterface from '../../models/NoteInterface';

import { getAllNotes, addNote } from '../../api/notes';

export default function NoteList() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  useEffect(() => {
    (async () => {
      await getAllNotes().then((res: NoteInterface[]) => setNotes(res));
    })();
  }, [notes]);

  const addClicked = async () => {
    const newNote: NoteInterface = {
      title: 'hello from front',
      description: 'front desc',
    };

    await addNote(newNote);
  };

  return (
    <div>
      {notes.map((note: NoteInterface, index) => {
        return <NoteListItem key={index} note={note} />;
      })}

      <button type="submit" onClick={addClicked}>
        Add
      </button>
    </div>
  );
}
