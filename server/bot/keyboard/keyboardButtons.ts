import ACTION_TYPE from './action.js';

const keyboardButtons = {
    main: {
        text: 'Мои игры',
        callback_data: JSON.stringify({
            type: ACTION_TYPE.SHOW_MY_GAMES,
        })
    },
    delete: (deleteId: string) => ({
        text: 'Удалить игру',
        callback_data: JSON.stringify({
            type: ACTION_TYPE.REMOVE_GAME,
            deleteId
        })
    }),
    back: (prev: string = ACTION_TYPE.INIT) => ({
        text: 'Назад',
        callback_data: JSON.stringify({
            type: prev,
        })
    }),
    game: (game: { id: string, name: string }) => ({
        text: game.name,
        callback_data: JSON.stringify({ type: ACTION_TYPE.SHOW_ONE_GAME, gameId: game.id })
    })
}

export default keyboardButtons;