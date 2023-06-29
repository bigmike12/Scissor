import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import UrlInput from "@/components/UrlInput/UrlInput";
import { type TableData } from "@/lib/commons";

interface Props {
  isModalOpen: boolean;
  toggleModal: any;
  data: TableData;
  edit: boolean;
}

const EditModal: React.FC<Props> = ({
  isModalOpen,
  toggleModal,
  data,
  edit,
}) => {
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px] w-[508px] h-[496px] p-0 border-0">
          <UrlInput data={data} edit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditModal;
