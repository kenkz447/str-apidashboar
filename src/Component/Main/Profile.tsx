import * as React from "react";
import { Row, Col } from "antd";

export const Profile = () => {
    const [data, setData] = React.useState({
        name: "",
        Username: "",
        email: "",
    });
    React.useEffect(() => {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    setData(JSON.parse(c.substring(name.length, c.length)));
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        getCookie("successfullyLogin");
    }, []);
    console.log(data);
    return (
        <Row>
            <Col>
                <h2>Profile</h2>
                <span>Your name : </span> <span>{data.name}</span>
                <br />
                <span>Your Username : </span> <span>{data.Username}</span>
                <br />
                <span>Your email : </span> <span>{data.email}</span>
            </Col>
        </Row>
    );
};
