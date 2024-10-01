import { getUser } from "../../services/users.service";

export async function load({ params }) {
	const entry = await getUser(Number(params.id));

	return {
		title: `View user info ${entry.name}`,
		entry
	};
}
