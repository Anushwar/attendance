/** @jsxImportSource @emotion/core */

import { Button } from "@chakra-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

const Dashboard = () => {
    const { path } = useRouteMatch();
    return (
        <>
        <Link to={`${path}/details`}>
            <Button css={{ marginRight: 20 }}>Student Details</Button>
        </Link>
        </>
    );
};

export default Dashboard;