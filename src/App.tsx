import React from 'react';
import useStore from "./hooks/useStore";
import {observer} from "mobx-react-lite";
import Dashboard from "./components/common/Dashboard";

function App() {
    const {users, boards} = useStore();
    console.log(users)
    console.log(boards.selected?.sections[0]?.tasks.toJSON())

    return (
        <div className="App">
            Start
            <Dashboard/>
        </div>
    );
}

export default observer(App);
