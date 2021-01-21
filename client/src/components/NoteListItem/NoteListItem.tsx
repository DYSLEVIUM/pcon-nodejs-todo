import { useState, useRef } from 'react';
import { updateNote, deleteNote } from '../../api/notes';
import NoteInterface from '../../models/NoteInterface';
import './NoteListItem.scss';

export default function NoteListItem(props: any) {
  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  let titleRef = useRef<HTMLDivElement>(null);
  let descriptionRef = useRef<HTMLDivElement>(null);

  const editDoneClicked = async () => {
    const newNote: NoteInterface = {
      title: titleRef.current?.innerText || '',
      description: descriptionRef.current?.innerText || '',
    };

    setIsEditActive(false);
    await updateNote(props.note.noteId, newNote);
  };

  const deleteClicked = async () => {
    await deleteNote(props.note.noteId);
    props.onDeleteNote();
  };

  return (
    <div className="noteListItemContainer">
      <div className="titleContainer">
        <div
          className="noteTitle"
          contentEditable={isEditActive ? true : false}
          suppressContentEditableWarning={true}
          style={isEditActive ? { cursor: 'text' } : { cursor: 'default' }}
          ref={titleRef}
        >
          {props.note.title}
        </div>
      </div>

      <div className="descriptionContainer">
        <div
          className="noteDesc"
          contentEditable={isEditActive ? true : false}
          suppressContentEditableWarning={true}
          style={isEditActive ? { cursor: 'text' } : { cursor: 'default' }}
          ref={descriptionRef}
        >
          {props.note.description}
        </div>
      </div>
      <div className="btnContainer">
        <button
          onClick={editDoneClicked}
          style={isEditActive ? { display: 'block' } : { display: 'none' }}
          className="doneBtn"
        >
          Done
        </button>
        <button
          onClick={() => setIsEditActive(true)}
          style={isEditActive ? { display: 'none' } : { display: 'block' }}
          className="editBtn"
        >
          Edit
        </button>
        <button onClick={deleteClicked} className="deleteBtn">
          Delete
        </button>
      </div>
    </div>
  );
}
