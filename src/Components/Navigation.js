import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { centralState } from "../App";
import Home from "./Home";
import Publisher from "./Publisher";

const Navigation = () => {
    const cState = useContext(centralState);
    const [publishers, setPublishers] = useState([]);

    const getPublishers = () => {
        const copy_store = [...cState.store]
        const temp = copy_store.map((item) => item.PUBLISHER);
        const uniquePublishers = [...new Set(temp)];
        setPublishers(uniquePublishers);
    }

    useEffect(() => {
        getPublishers();
    }, [cState.store]);

    return (
        <BrowserRouter>
            <Switch>
                {
                    publishers.map((eachPublisher, index) =>
                        <Route path={'/' + eachPublisher.replace(/[\\()]/g, "")} key={index}>
                            <Publisher publisher={eachPublisher} />
                        </Route>
                    )
                }

                <Route path={'/'}>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
export default Navigation;