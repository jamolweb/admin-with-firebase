import AdminPanel from "@/components/admin/AdminPanel";
import Form from "@/components/admin/Form";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./firebase/app-data";

export default function index() {
  const [isPassword, setIsPassword] = useState(!true);

  return (
    <Box fontFamily={"monospace"} w={"100%"}>
      {!isPassword && <Form handleOpen={() => setIsPassword(true)} />}
      {isPassword && <AdminPanel />}
    </Box>
  );
}
