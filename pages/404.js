import Layout from "../components/layout.js"
import Navbar from "../components/navbar.js"

export default function Custom404() {
    return (
        <div className="columns mt-5">
            <div className="column has-text-centered">
                <h1 className="subtitle">404 - Page Not Found</h1>
            </div>
        </div>
    )

}

Custom404.getLayout = function getLayout(page) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}



