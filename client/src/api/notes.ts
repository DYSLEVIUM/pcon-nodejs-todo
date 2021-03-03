import NoteInterface from '../models/NoteInterface';
import { getPublicId } from './publicIP';

//  !   change endpoint later
// const endPoint = 'http://localhost/api'; //  development endpoint
const endPoint = '/api'; //  production endpoint
export async function addNote(Note: NoteInterface): Promise<Response> {
	return await fetch(`${endPoint}/addNote`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...Note,
			publicId: await getPublicId().then((res) => res.ip),
		}),
	}).then((res: Response) => res.json());
}

export async function getAllNotes(): Promise<NoteInterface[]> {
	return await fetch(`${endPoint}/getNotes`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res: Response) => res.json());
}

export async function getNote(noteId: number): Promise<NoteInterface> {
	return await fetch(`${endPoint}/getNote/${noteId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res: Response) => res.json());
}

export async function updateNote(
	noteId: number,
	newNote: NoteInterface
): Promise<Response> {
	return await fetch(`${endPoint}/updateNote/${noteId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...newNote,
			publicId: await getPublicId().then((res) => res.ip),
		}),
	}).then((res: Response) => res.json());
}

export async function deleteNote(noteId: number): Promise<Response> {
	return await fetch(`${endPoint}/deleteNote/${noteId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((res: Response) => res.json());
}
