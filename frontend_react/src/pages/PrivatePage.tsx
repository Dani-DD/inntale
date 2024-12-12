import AuthContext from "@/contexts/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const PrivatePage = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { tokens } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/root/test/", {
                headers: {
                    Authorization: `JWT ${tokens?.access}`,
                },
            })
            .then((response) => setMessage(response.data))
            .catch((error: Error) => setError(error.message));
    }, []);

    if (error) return <p>{error}</p>;

    return <div>{message}</div>;
};

export default PrivatePage;
