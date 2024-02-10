import { auth, db } from "@/pages/firebase/app-data";
import { Box, Button, Heading, Icon, Input, Text } from "@chakra-ui/react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaRegUserCircle } from "react-icons/fa";

export default function adminForm({ handleOpen }) {
  const [inputValue, setInputValue] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [signInWithGoogle, _, loading, singInError] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);

  // ! get users data
  let reference = collection(db, "users");
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(reference);
      const data = snapshot.docs.map((doc) => doc.data());
      setUsers(data);
    };

    fetchData();
  }, []);

  // login to the dashboard
  const onSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.name === "admin" && inputValue.password === "pass") {
      // ! create a user
      await signInWithGoogle();
      const isUserHave = users.some((u) => u?.email !== user?.email);

      if (isUserHave) {
        setDoc(doc(db, "users", user?.email), {
          email: user?.email,
          fullName: user?.displayName,
          rule:
            user?.email === "jamoladdinisnatdinov2@gmail.com"
              ? "admin"
              : "user",
          photo: user?.photoURL,
        });
      }

      // ! check a users rule
      if (user) {
        const adminUser = users.filter((u) => u.email === user?.email);
        const errorForUsers = "You're not a admin motherfucker!!! do not try anymore!!!😡";

        if (adminUser.length > 0 && adminUser[0].rule === "admin") {
          setError("");
          setInputValue({ name: "", password: "" });
          handleOpen();
          alert("Welcome to the admin dashboard.");
        } else alert(errorForUsers);
      }
    } else {
      setError("your name or password is wrong");
    }
  };

  // get inputs value
  const onLoginChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          margin: "200px auto",
          border: "1px solid #AE9D9A",
          borderRadius: "5px",
          padding: "10px",
          height: "250px",
          justifyContent: "space-between",
        }}
        onSubmit={onSubmit}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Icon as={FaRegUserCircle} m={"0 auto"} fontSize={"40px"} />
          <Heading
            textAlign={"center"}
            fontFamily={"fantasy"}
            fontSize={"20px"}
            fontWeight={700}
          >
            Admin
          </Heading>
          <Input
            name="name"
            _hover={{ bg: "gray.100" }}
            onChange={(e) => onLoginChange(e)}
            type="text"
            placeholder="write your name"
          />
          <Input
            name="password"
            _hover={{ bg: "gray.100" }}
            onChange={(e) => onLoginChange(e)}
            type="password"
            placeholder="write your password"
          />
        </Box>
        <Text color={"red"}>{error}</Text>
        <Button type="submit" colorScheme={"facebook"} isLoading={loading}>
          GO TO THE CONSOLE
        </Button>
      </form>
    </div>
  );
}
