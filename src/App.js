import React from 'react';
import './App.css';

import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

const TOKEN_NONE = "";
const TOKEN_X = "X";
const TOKEN_O = "O";

const STATE_PLAYING = "playing";
const STATE_END_X = "end_x";
const STATE_END_O = "end_o";
const STATE_END_DRAW = "end_draw";

const ACTION_TYPE_PLACE = "PLACE";
const ACTION_TYPE_RESET = "RESET";

const initial_data = {
    '0_0': TOKEN_NONE,
    '0_1': TOKEN_NONE,
    '0_2': TOKEN_NONE,
    '1_0': TOKEN_NONE,
    '1_1': TOKEN_NONE,
    '1_2': TOKEN_NONE,
    '2_0': TOKEN_NONE,
    '2_1': TOKEN_NONE,
    '2_2': TOKEN_NONE,
    "start_player": TOKEN_X,
    "current_player": TOKEN_X,
    "current_state": STATE_PLAYING,
    "winning_line": ["0_0", "0_1", "0_2"]
};

const possible_slots = ["0_0", "0_1", "0_2", "1_0", "1_1", "1_2", "2_0", "2_1", "2_2"];
const win_conditions = [
    ["0_0", "0_1", "0_2"],
    ["1_0", "1_1", "1_2"],
    ["2_0", "2_1", "2_2"],
    ["0_0", "1_0", "2_0"],
    ["0_1", "1_1", "2_1"],
    ["0_2", "1_2", "2_2"],
    ["0_0", "1_1", "2_2"],
    ["0_2", "1_1", "2_0"],
];

const reducer = (state = initial_data, action) => {
    
    return state;
};

const store = createStore(reducer);

const action_place = (pos) => {
    return {
        "type": ACTION_TYPE_PLACE,
        "data": pos
    }
};

const action_reset = () => {
    return {
        "type": ACTION_TYPE_RESET
    }
};

const shouldHighlightEnd = (props, pos) => {
    if (props.current_state === STATE_END_O || props.current_state === STATE_END_X) {
        if (props.winning_line.indexOf(pos) >= 0) return true;
    }
    return false;
}

const App = (props) => (
    <div className="App">
        <table>
            <tbody>
            {[0, 1, 2].map((y) => (
                <tr key={"y" + y}>
                    {[0, 1, 2].map((x) => (
                        <td key={"y" + y + "x" + x} onClick={() => {
                            props.place(`${y}_${x}`)
                        }}
                            style={(shouldHighlightEnd(props, `${y}_${x}`) ? {color: "red"} : {})}>{props[`${y}_${x}`]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>

        <div>
            ตาของ {props.current_player}
        </div>
        <div>
            {props.current_state !== STATE_PLAYING ? {
                [STATE_END_X]: "X ชนะ",
                [STATE_END_O]: "O ชนะ",
                [STATE_END_DRAW]: "เสมอ"
            }[props.current_state] : ""}
        </div>
        <div>
            <input type="button" onClick={() => {
                props.reset()
            }} value="รีเซ็ท"/>
        </div>

    </div>
);

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    'place': (pos) => {
        dispatch(action_place(pos))
    },
    'reset': () => {
        dispatch(action_reset())
    },
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Application = () => (
    <Provider store={store}>
        <ConnectedApp/>
    </Provider>
);

const HOC = (Comp) => {
    return (props) => (
        <div>
            Hi
            <Comp {...props}/>
        </div>
    )
};

//
// store.subscribe(() => {
//     console.log(store.getState());
// });

export default Application;
