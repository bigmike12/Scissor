import Icon from "@/assets/Icons/icon";
import { Button } from "@/components/ui/button";
import { type TableData } from "../../lib/commons";

import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { showToast } from "../ShowToast/showToast";
import { NotificationTypes } from "@/lib/utils";

interface Props {
  data: TableData;
  handleOpenDrawer: () => void;
}

const UrlCard = ({ data, handleOpenDrawer }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCopy = (text: string) => {
    const URLPrefix = "https://scissor-8nse.vercel.app/";
    const fullUrl = `${URLPrefix}${text}`;
    navigator.clipboard.writeText(fullUrl);
    showToast("Copied!", NotificationTypes.SUCCESS);
  };

  return (
    <>
      <div
        className="bg-backgroundVarOne w-full rounded-3xl h-[268px] flex gap-4 p-12"
        key={data.id}
      >
        <div>
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
            <div className="w-[681px] px-3 py-2 bg-ScissorLemonVarOne rounded-xl mb-6">
              <p>{data.longURL}</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-transparent border border-white h-[48px] w-[138px] text-white font-medium gap-3">
                <Icon name="share" />
                Share link
              </Button>
              <Button className="bg-transparent border border-white h-[48px] w-[138px] text-white font-medium gap-3">
                <Icon name="qrcode" />
                QR Code
              </Button>
              <Button
                className="bg-transparent border border-white h-[48px] w-[138px] text-white font-medium gap-3"
                onClick={handleOpenModal}
              >
                <Icon name="edit" />
                Edit
              </Button>
              <Button
                className="h-[48px] w-[138px] text-black font-medium gap-3"
                onClick={() => handleOpenDrawer()}
              >
                <Icon name="stats" />
                View stats
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={modalOpen}
        toggleModal={setModalOpen}
        data={data}
        edit
      />
    </>
  );
};

export default UrlCard;
