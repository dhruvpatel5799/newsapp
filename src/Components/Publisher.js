import { Fragment, useContext, useEffect, useState } from "react";
import { centralState } from "../App";

const Publisher = (props) => {
    const cState = useContext(centralState);
    const [publisherNews, setPublisherNews] = useState([]);
    const [displayNews, setDisplayNews] = useState([]);
    const [searchFilters, setSearchFilters] = useState({
        Search: '',
        Business: true,
        Technology: true
    });

    const getNewsFromPublisher = () => {
        const copy_store = [...cState.store]
        const temp = copy_store.filter(news => news.PUBLISHER === props.publisher);
        temp.sort((a, b) => b.TIMESTAMP - a.TIMESTAMP);
        setPublisherNews(temp);
        setDisplayNews(temp);
    }

    useEffect(() => {
        getNewsFromPublisher();
    }, [cState.store]);

    const handleInputChange = (e) => {
        const copy_searchFilters = { ...searchFilters }
        copy_searchFilters[e.target.id] = e.target.value
        setSearchFilters(copy_searchFilters);
        filterNews(copy_searchFilters);
    }

    const handleChange = (e) => {

        const copy_searchFilters = { ...searchFilters }
        copy_searchFilters[e.target.id] = e.target.checked
        setSearchFilters(copy_searchFilters);

        filterNews(copy_searchFilters);
    }

    const filterNews = (filters) => {
        let temp = publisherNews

        //filter logic based on search value
        if (filters.Search !== null) {
            const copy_publisherNews = [...publisherNews]
            const val = filters.Search.toLowerCase();
            temp = copy_publisherNews.filter(news => news.TITLE.toLowerCase().includes(val))
        }

        //filter logic based on category
        if (filters.Business === true && filters.Technology === true) {
            setDisplayNews(temp)
        }
        else if (filters.Business === false && filters.Technology === true) {
            temp = temp.filter(news => news.CATEGORY === 't')
            setDisplayNews(temp)
        }
        else if (filters.Business === true && filters.Technology === false) {
            temp = temp.filter(news => news.CATEGORY === 'b')
            setDisplayNews(temp)
        }
        else if (filters.Business === false && filters.Technology === false) {
            temp = temp.filter(news => news.CATEGORY !== 'b' && news.CATEGORY !== 't')
            setDisplayNews(temp)
        }
    }

    const getDate = (timeStamp) => {
        const dateObject = new Date(timeStamp)
        let date = dateObject.getDate() + '/' + (dateObject.getMonth() + 1) + '/' + dateObject.getFullYear()
        return (date)
    }

    const getCategory = (news) => {
        if (news.CATEGORY === 'b')
            return ('Business')
        else
            if (news.CATEGORY === 't')
                return ('Technology')
            else
                return ('No category information available to calssify this news!')
    }

    return (
        <Fragment>
            <br />
            <div className="container" style={{ maxWidth: '50%' }}>
                <input type="text"
                    value={searchFilters.Search}
                    onChange={handleInputChange}
                    placeholder="Search News......"
                    className="form-control"
                    id="Search" />
            </div><br />

            <div className="row justify-content-end">
                <div className="col-4">
                    <label>Choose Category</label>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Business" onChange={handleChange} defaultChecked />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Business
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="Technology" onChange={handleChange} defaultChecked />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Technology
                        </label>
                    </div><br />
                </div>
            </div>

            <div className="row row-cols-4">

                {
                    displayNews.map((eachNews) =>
                        <div className="col" key={eachNews.ID}>
                            <div className="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
                                <div className="card-header">{getDate(eachNews.TIMESTAMP)}</div>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{eachNews.TITLE}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Publisher : {eachNews.PUBLISHER.replace(/[\\]/g, "")}</h6>
                                    <p className="card-text">Category : {getCategory(eachNews)}</p>
                                    <p className="card-text">HOSTNAME : {eachNews.HOSTNAME}</p>
                                    <a href={eachNews.URL} className="card-link">Read More</a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="row justify-content-center">
                <div className="col-4" style={{ display: displayNews.length === 0 ? 'block' : 'none' }}>
                    <h6 >No news found based on search criteria !</h6>
                </div>
            </div>
        </Fragment>
    );
}
export default Publisher;