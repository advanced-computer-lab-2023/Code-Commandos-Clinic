import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "./ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "./ChatLogics";
import UserListItem from "./UserListItem";
import { ChatState } from "../../ChatProvider";
import SearchIcon from '@mui/icons-material/Search';

function SideDrawer() {
  const [search, setSearch] = useState("none");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    // if (!search) {
    //   toast({
    //     title: "Please Enter something in search",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-left",
    //   });
    //   return;
    // }

    try {
      setLoading(true);

      const config = {
        headers: {

        },
      };

      if(user.role==='PATIENT'){
        const { data } = await axios.get(`/api/doctor/searchDoctorsToChatClinic/${search}/none`, config);
        setLoading(false);
        setSearchResult(data);
      }
      else {
        const { data } = await axios.get(`/api/patient/searchPatientsToChat/${search}`, config);
        setLoading(false);
        setSearchResult(data);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/chat/accessChat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white" 
        m="5px 5px 5px 5px"
        p="5px 10px 5px 10px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tooltip label="Search for users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen} display="flex" verticalAlign="middle" alignContent="center" background={"#e7e7e7"}>
            <SearchIcon/>
            <Text display={{ base: "none", md: "flex" }} paddingTop="15px">
              Search for {user.role==='PATIENT'?<>Doctors</>:<>Patients</>}
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl">
          Talk to a {user.role==='PATIENT'?<>Doctor</>:<>Patient</>}
          <span>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          </span>
        </Text>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search {user.role==='PATIENT'?<>Doctors</>:<>Patients</>}</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name"
                mr={2}
                value={search==="none"?"":search}
                onChange={(e) => setSearch(e.target.value===""?"none":e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((userx) => (
                <UserListItem
                  key={userx.userId}
                  user={userx}
                  handleFunction={() => accessChat(userx.userId)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;