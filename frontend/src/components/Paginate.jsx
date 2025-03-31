
import {Pagination} from "react-bootstrap";
import {NavLink} from "react-bootstrap";

export default function Paginate({pages, page, isAdmin = false, keyword = "" }) {
    return (
        pages > 1 && (
            <Pagination>
                { [...Array(pages).keys()].map((x) => (

                    <NavLink
                    key={x + 1}
                    to={
                        !isAdmin ? keyword ? `/search/${keyword}/page${x + 1}` : `/page/${x+ 1}` : `/admin/productlist/${x + 1}`
                    }>
                        <Pagination.Item active={x + 1 === page}> {x + 1}</Pagination.Item>
                    </NavLink>
                ))}
            </Pagination>
        )
    )
}