import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chat/Chatbox";
import MyChats from "../components/Chat/MyChats";
import SideDrawer from "../components/Chat/SideDrawer";
import { ChatState } from "../ChatProvider";

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} w="40%"/>}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} w="50%"/>
        )}
      </Box>
    </div>
  );
};

export default Chat;