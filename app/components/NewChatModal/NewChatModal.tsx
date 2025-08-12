import { useState } from "react";
import ModalMechanism from "../ModalMechanism/ModalMechanism";
import AddButtonList from "../AddButtonList/AddButtonList";
import DropdownBottom from "../../(app)/addSocial/common/dropdownBottom";
import InviteUserPicker from "./common/InviteUserPicker";

const NewChatModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModalUser = () => {
    setIsModalOpen(false);
  };
  return <ModalMechanism open={isModalOpen} setOpen={setIsModalOpen} triggerButton={<AddButtonList onButtonClick={() => setIsModalOpen(true)} />} children={<DropdownBottom closeModal={closeModalUser} children={<InviteUserPicker closeModal={closeModalUser} />} />}></ModalMechanism>;
};

export default NewChatModal;
