import usePrivateAxios from "@/hooks/usePrivateAxios";
import { useEffect, useState } from "react";

const PrivatePage = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const privateAxios = usePrivateAxios();

    useEffect(() => {
        privateAxios
            .get("http://127.0.0.1:8000/root/test/")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error: Error) => setError(error.message));
    }, []);

    if (error) return <p>{error}</p>;

    return <div>{message}</div>;
};

export default PrivatePage;
