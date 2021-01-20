import { useState, useEffect, useRef } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

import './NoteList.scss';

import NoteInterface from '../../models/NoteInterface';

import { getAllNotes, addNote } from '../../api/notes';
import { title } from 'process';

export default function NoteList() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  let titleRef = useRef<HTMLDivElement>(null);
  let descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      await getAllNotes().then((res: NoteInterface[]) => setNotes(res));
    })();
  }, [notes]);

  const addClicked = async () => {
    const newNote: NoteInterface = {
      title: titleRef.current?.innerText || '',
      description: descriptionRef.current?.innerText || '',
    };

    await addNote(newNote);
    if (titleRef.current) titleRef.current.innerText = '';
    if (descriptionRef.current) descriptionRef.current.innerText = '';
  };

  return (
    <div className="noteListContainerWrapper">
      <div className="noteListContainer">
        {notes
          .map((note: NoteInterface, index) => {
            return <NoteListItem key={index} note={note} />;
          })
          .reverse()}
      </div>

      <div className="addNoteContainer">
        <div className="noteTitleContainer">
          <div className="heading">Note Title</div>
          <div
            className="noteTitle"
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={titleRef}
          ></div>
        </div>
        <div className="noteDescriptionContainer">
          <div className="heading">Note Description</div>
          <div
            className="noteDescription"
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={descriptionRef}
          ></div>
        </div>
        <button type="submit" onClick={addClicked} className="addBtn">
          Add
        </button>
      </div>
    </div>
  );
}
