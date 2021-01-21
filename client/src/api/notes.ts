import NoteInterface from '../models/NoteInterface';
import { getPublicId } from './publicIP';

//  !   change endpoint later
// const endPoint = 'http://localhost/api'; //  development endpoint
const endPoint = '/api'; //  production endpoint
export async function addNote(Note: NoteInterface): Promise<Response> {
  return fetch(`${endPoint}/addNote`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...Note,
      publicId: await getPublicId().then((res) => res.ip),
    }),
  }).then((res: Response) => res.json());
}

export function getAllNotes(): Promise<NoteInterface[]> {
  return fetch(`${endPoint}/getNotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res: Response) => res.json());
}

export function getNote(noteId: number): Promise<NoteInterface> {
  return fetch(`${endPoint}/getNote/${noteId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res: Response) => res.json());
}

export async function updateNote(newNote: NoteInterface): Promise<Response> {
  return fetch(`${endPoint}/updateNote`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newNote,
      publicId: await getPublicId().then((res) => res.ip),
    }),
  }).then((res: Response) => res.json());
}

export function deleteNote(noteId: number): Promise<Response> {
  return fetch(`${endPoint}/deleteNote/${noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res: Response) => res.json());
}
