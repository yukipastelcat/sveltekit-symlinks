import { getUsers } from "../../../services/users.service";

export async function load({ params }) {
	const entries = await getUsers(params.page);

	return {
		title: 'Users list',
		entries
	};
}
