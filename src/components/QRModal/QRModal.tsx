import React from "react";
import QRCode from "react-qr-code";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type TableData } from "@/lib/commons";

interface Props {
  isModalOpen: boolean;
  toggleModal: any;
  data: TableData;
}

const QRModal: React.FC<Props> = ({ isModalOpen, toggleModal, data }) => {
  const URLPrefix = "https://scissor-8nse.vercel.app/";
  const fullUrl = `${URLPrefix}${data.shortURL}`;
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px] w-[508px] h-[496px] p-0 border-0 flex justify-center items-center">
          <QRCode value={fullUrl} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QRModal;
