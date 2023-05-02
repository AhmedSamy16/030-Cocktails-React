import { Link } from "react-router-dom"

const Error = () => {
    return (
        <section className="section error-page">
            <div className="error-container">
                <h1>oops! it's a dead end</h1>
                <Link className="btn btn-primary" to="/">
                    back Home
                </Link>
            </div>
        </section>
    )
}

export default Error