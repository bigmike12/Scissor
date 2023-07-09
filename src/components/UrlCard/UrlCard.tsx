import Icon from "@/assets/Icons/icon";
import { Button } from "@/components/ui/button";
import { type TableData } from "../../lib/commons";

import React, { useState } from "react";
import { showToast } from "../ShowToast/showToast";
import { NotificationTypes } from "@/lib/utils";
import EditModal from "@/components/Modal/Modal";
import QRModal from "../QRModal/QRModal";

interface Props {
  data: TableData;
  handleOpenDrawer: () => void;
}

const UrlCard = ({ data, handleOpenDrawer }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [qrModalOpen, setQrModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleQROpenModal = () => {
    setQrModalOpen(!qrModalOpen);
  };

  const handleCopy = (text: string) => {
    const URLPrefix = "https://scissor-pi.vercel.app//";
    const fullUrl = `${URLPrefix}${text}`;
    navigator.clipboard.writeText(fullUrl);
    showToast("Copied!", NotificationTypes.SUCCESS);
  };

  return (
    <>
      <div
        className="bg-backgroundVarOne w-full rounded-3xl h-auto lg:h-[268px] flex gap-4 lg:p-12 p-6"
        key={data.id}
      >
        <div className="hidden lg:block">
          <Icon name="check" />
        </div>

        <div>
          <div className="flex gap-5 mb-5">
            <p>{data.shortURL}</p>
            <Icon
              name="copy"
              onClick={() => handleCopy(data.shortURL)}
              className="hover:cursor-pointer"
            />
          </div>
          <div>
            <div className="lg:w-[681px] max-w-[312px] px-3 py-2 bg-ScissorLemonVarOne rounded-xl mb-6">
              <p className="break-all">{data.longURL}</p>
            </div>
            <div className="flex lg:flex flex-col gap-4">
              <Button className="bg-transparent border border-white h-[48px] lg:w-[138px] w-full text-white font-medium gap-3">
                <Icon name="share" />
                Share link
              </Button>
              <Button
                className="bg-transparent border border-white h-[48px] lg:w-[138px] w-full text-white font-medium gap-3"
                onClick={handleQROpenModal}
              >
                <Icon name="qrcode" />
                QR Code
              </Button>
              <Button
                className="bg-transparent border border-white h-[48px] lg:w-[138px] w-full text-white font-medium gap-3"
                onClick={handleOpenModal}
              >
                <Icon name="edit" />
                Edit
              </Button>
              <Button
                className="h-[48px] lg:w-[138px] w-full text-black font-medium gap-3"
                onClick={() => handleOpenDrawer()}
              >
                <Icon name="stats" />
                View stats
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        isModalOpen={modalOpen}
        toggleModal={setModalOpen}
        data={data}
        edit
      />
      <QRModal
        isModalOpen={qrModalOpen}
        toggleModal={setQrModalOpen}
        data={data}
      />
    </>
  );
};

export default UrlCard;
