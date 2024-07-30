import type { Handle } from "@sveltejs/kit";
import { runQuery } from "@sveltekit-board/db";

/**
 * Records request logs.
 */
const logger: Handle = async ({ event, resolve }) => {
    let UUID: string | null = null;
    if (event.locals.userData) {
        UUID = event.locals.userData.UUID
    }
    await runQuery(async (run) => {
        return await run("INSERT INTO `log` (`UUID`, `ip`, `path`) VALUES (?, ?, ?)", [UUID, event.getClientAddress(), event.url.pathname]);
    })

    return await resolve(event);
}

export default logger