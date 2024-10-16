import kb from "./keyboardButtons.js";

const keyboard = {
    main: [
        [kb.main],
    ],
    oneGame: (payload: { prev: string, deleteId: string }) => [
        [kb.back(payload.prev), kb.delete(payload.deleteId)],
    ],
    back: (prev: string) => [
        [kb.back(prev)],
    ],
    games: (games: any) => [
        ...games?.map((game: any) => ([kb.game(game)])),
        [kb.back()],
    ],
}

export default keyboard