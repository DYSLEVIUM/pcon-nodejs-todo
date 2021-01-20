import NoteInterface from '../../models/NoteInterface';

export default function NoteListItem(props: any) {
  const note: NoteInterface = props.note;

  return (
    <div>
      <div>{note.title}</div>
      <div>{note.description}</div>
    </div>
  );
}
