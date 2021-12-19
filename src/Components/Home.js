import { Fragment, useContext, useEffect, useState } from "react";
import { centralState } from "../App";
import { useHistory } from "react-router-dom";

const Home = () => {
    const cState = useContext(centralState);
    const [publishers, setPublishers] = useState([]);
    const [displayPublishers, setDisplayPublishers] = useState([]);
    const [search, setSearch] = useState('');
    const history = useHistory();

    const getPublishers = () => {
        const copy_props = [...cState.store]
        const temp = copy_props.map((item) => item.PUBLISHER);
        const uniquePublishers = [...new Set(temp)];
        setPublishers(uniquePublishers);
        setDisplayPublishers(uniquePublishers);
    }

    useEffect(() => {
        getPublishers();
    }, [cState.store]);

    const handleInputChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value !== null) {
            const copy_publishers = [...publishers]
            const temp = copy_publishers.filter(publisher => publisher.toLowerCase().includes(e.target.value.toLowerCase()))
            setDisplayPublishers(temp)
        }
        else {
            setDisplayPublishers(publishers)
        }
    }

    return (
        <Fragment>
            <br />
            <div className="container" style={{ maxWidth: '50%' }}>
                <input type="text"
                    value={search}
                    onChange={handleInputChange}
                    placeholder="Search Publishers......"
                    className="form-control"
                    id="search" />
            </div><br />

            <div className="row row-cols-5">
                {
                    displayPublishers.map((eachPublisher, index) =>
                        <Fragment key={index}>
                            <div className="col">
                                <div className="d-grid gap-2 mx-auto">
                                    <button className="btn btn-info" type="button" onClick={() => history.push(eachPublisher.replace(/[\\()]/g, ""))}>
                                        {eachPublisher.replace(/[\\]/g, "")}
                                    </button>
                                    <br />
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </div>

            <div className="row justify-content-center">
                <div className="col-4" style={{ display: displayPublishers.length === 0 ? 'block' : 'none' }}>
                    <h6 >No publisher found based on search criteria !</h6>
                </div>
            </div>
        </Fragment>
    );
}
export default Home;