import { createStore } from "redux";
import * as ActionTypes from "./actions/ActionTypes";

const initialState = {
    userName: null,
    currentRoom: null,
    rooms: {},
};

const initRoom = (s, room) => {
    s.rooms[room] = s.rooms[room]
        ? { ...s.rooms[room] }
        : { messages: [], users: [] };

    return s.rooms[room];
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.ADD_MESSAGE: {
            const s = { ...state };
            const { room, userName, message } = action;

            const r = initRoom(s, room);

            r.messages.push({
                userName,
                message,
            });

            return s;
        }

        case ActionTypes.ROOM_USERS_UPDATED: {
            const s = { ...state };
            const { room, users } = action;

            const r = initRoom(s, room);

            // eslint-disable-next-line
            r.users = users && [...users] || [];

            return s;
        }

        case ActionTypes.SET_ROOM: {
            const s = {
                ...state,
                currentRoom: action.room,
            };

            initRoom(s, action.room);

            return s;
        }

        case ActionTypes.SET_NAME: {
            return {
                ...state,
                userName: action.userName,
            }
        }

        default:
            return state;
    }
}

const store = createStore(rootReducer);

export default store;
