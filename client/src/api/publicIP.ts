import PublicIP from '../models/PublicIP';

export function getPublicId(): Promise<PublicIP> {
	return fetch('https://api.ipify.org/?format=json', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	}).then((res: Response) => res.json());
}
