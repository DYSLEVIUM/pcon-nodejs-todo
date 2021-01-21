import { useState, useEffect, useRef } from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';

import './NoteList.scss';
import { motion } from 'framer-motion';

import NoteInterface from '../../models/NoteInterface';

import { getAllNotes, addNote } from '../../api/notes';

export default function NoteList() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [isCanceled, setIsCanceled] = useState<boolean>(false);

  let titleRef = useRef<HTMLDivElement>(null);
  let descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCanceled) {
      (async () => {
        await getAllNotes().then((res: NoteInterface[]) => setNotes(res));
      })();
      setIsCanceled(true);
    }
  }, [isCanceled]);

  const addClicked = async () => {
    const newNote: NoteInterface = {
      title: titleRef.current?.innerText || '',
      description: descriptionRef.current?.innerText || '',
    };

    await addNote(newNote);

    if (titleRef.current) titleRef.current.innerText = '';
    if (descriptionRef.current) descriptionRef.current.innerText = '';

    await getAllNotes().then((res: NoteInterface[]) => setNotes(res));
  };

  return (
    <motion.div
      className="noteListContainerWrapper"
      initial={{ opacity: 0, translateY: 25 }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{ delay: 1 }}
    >
      <div className="noteListContainer">
        {notes
          .map((note: NoteInterface, index) => {
            return (
              <NoteListItem
                key={index}
                note={note}
                onDeleteNote={() => setIsCanceled(false)}
              />
            );
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
    </motion.div>
  );
}
