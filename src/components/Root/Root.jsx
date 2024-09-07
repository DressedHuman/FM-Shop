import { Outlet } from "react-router-dom";
import Contexts from "../Contexts";

const Root = () => {
    return (
        <div>
            <Contexts>
                <Outlet />
            </Contexts>
        </div>
    );
};

export default Root;