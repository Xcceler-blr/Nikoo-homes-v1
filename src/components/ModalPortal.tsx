import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalPortalProps = {
  children: ReactNode;
};

export const ModalPortal = ({ children }: ModalPortalProps) => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {
    return () => {
      if (modalRoot && modalRoot.childNodes.length === 0) {
        modalRoot.remove();
      }
    };
  }, [modalRoot]);

  return createPortal(children, modalRoot);
}; 