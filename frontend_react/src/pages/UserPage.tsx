import AuthContext from "@/contexts/authContext";
import { List } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const UserPage = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        <Navigate to="/login" />;
    }

    return (
        <List.Root>
            <List.Item>{user!.first_name}</List.Item>
            <List.Item>{user!.last_name}</List.Item>
            <List.Item>{user!.email}</List.Item>
            <List.Item>{user!.username}</List.Item>
        </List.Root>
    );
};

export default UserPage;
