import { useState, useRef } from 'react';
import { updateNote, deleteNote } from '../../api/notes';
import NoteInterface from '../../models/NoteInterface';
import './NoteListItem.scss';

export default function NoteListItem(props: any) {
  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  let titleRef = useRef<HTMLInputElement>(null);
  let descriptionRef = useRef<HTMLInputElement>(null);

  const editDoneClicked = async () => {
    const newNote: NoteInterface = {
      title: titleRef.current?.value || '',
      description: descriptionRef.current?.value || '',
      noteId: props.note.noteId,
    };

    await updateNote(newNote);
    setIsEditActive(false);
  };

  const deleteClicked = async () => {
    await deleteNote(props.note.noteId);
  };

  return (
    <div>
      <input
        defaultValue={props.note.title}
        style={isEditActive ? { cursor: 'text' } : { cursor: 'default' }}
        ref={titleRef}
        readOnly={!isEditActive}
      ></input>
      <input
        defaultValue={props.note.description}
        style={isEditActive ? { cursor: 'text' } : { cursor: 'default' }}
        ref={descriptionRef}
        readOnly={!isEditActive}
      ></input>
      <button
        onClick={editDoneClicked}
        style={isEditActive ? { display: 'block' } : { display: 'none' }}
      >
        Done
      </button>
      <button
        onClick={() => setIsEditActive(true)}
        style={isEditActive ? { display: 'none' } : { display: 'block' }}
      >
        Edit
      </button>
      <button onClick={deleteClicked}>Delete</button>
    </div>
  );
}
