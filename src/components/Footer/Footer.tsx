import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import AddModal from "@/components/Modal/Modal";
import { useRouter } from "next/router";
import { IoIosAnalytics } from "react-icons/io";

const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0px;
    width: 100%;
    height: 53px;
`;



const FooterIcon = styled.div`
  font-size: 24px;
  margin: 0 10px;
  cursor: pointer;
`;

const CenterIcon = styled.div`
  margin: 0 10px;
  cursor: pointer;
  font-size: 24px;
`;

const Footer: React.FC<{ toggleChart: () => void }> = ({ toggleChart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FooterWrapper>
        <FooterIcon onClick={toggleChart}>
          <IoIosAnalytics />
        </FooterIcon>
        <CenterIcon onClick={openModal}>
          <FaPlus />
        </CenterIcon>
        <FooterIcon onClick={handleLogout}>
          <FaSignOutAlt />
        </FooterIcon>
      </FooterWrapper>
      <AddModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Footer;
