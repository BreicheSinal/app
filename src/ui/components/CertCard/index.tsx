import { FC, ChangeEvent, useState } from "react";
import { CertContainer } from "./CertContainer";
import { CertificateHeader } from "./CertHeader";
import { CertificateItem } from "./CertItem";
import { CertDialog } from "./CertDialog";
import {
  Certificate,
  CertificateFormData,
} from "../../../core/utils/globalUtils";

import { ConfirmationDialog } from "../TryOutsCard/ConfirmationDialog";

interface CertificateCardProps {
  width?: number;
  certificates: Certificate[];
  addition?: (certificate: Omit<Certificate, "id">) => void;
  edit?: (certificate: Certificate) => void;
  delete?: (id: number) => void;
  showEdit?: boolean;
}

export const CertificateCard: FC<CertificateCardProps> = ({
  width = 600,
  certificates,
  addition,
  edit,
  delete: deleteCert,
  showEdit = true,
}) => {
  const [certificateDialogOpen, setCertificateDialogOpen] =
    useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    date: "",
    type: "certification",
    description: "",
  });

  const handleCertificateOpen = (certificate?: Certificate) => {
    if (certificate) {
      setSelectedCertificate(certificate);
      setFormData({
        name: certificate.name,
        date: certificate.date,
        type: "certification",
        description: certificate.description,
      });
    } else {
      setSelectedCertificate(null);
      setFormData({
        name: "",
        date: "",
        type: "certification",
        description: "",
      });
    }
    setCertificateDialogOpen(true);
  };

  const handleCertificateClose = () => {
    setCertificateDialogOpen(false);
    setSelectedCertificate(null);
    setFormData({
      name: "",
      date: "",
      type: "certification",
      description: "",
    });
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId && deleteCert) {
      setIsDeleting(true);
      try {
        await deleteCert(deleteId);
      } finally {
        setIsDeleting(false);
        setConfirmDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedCertificate && edit) {
      edit({
        id: selectedCertificate.id,
        ...formData,
      });
    } else if (addition) {
      addition(formData);
    }
    handleCertificateClose();
  };

  const handleChange =
    (field: keyof CertificateFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
        type: "certification",
      });
    };

  return (
    <CertContainer width={width}>
      <CertificateHeader
        onAdd={() => handleCertificateOpen()}
        showEdit={showEdit}
      />
      {certificates.map((certificate, index) => (
        <CertificateItem
          key={certificate.id}
          certificate={certificate}
          showEdit={showEdit}
          onEdit={handleCertificateOpen}
          onDelete={handleDeleteClick}
          isLast={index === certificates.length - 1}
        />
      ))}
      <CertDialog
        open={certificateDialogOpen}
        onClose={handleCertificateClose}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isEdit={!!selectedCertificate}
      />
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </CertContainer>
  );
};

interface CertificateCardViewProps {
  width?: number;
  certificates: Certificate[];
}

export const CertificateCardView: FC<CertificateCardViewProps> = ({
  width = 600,
  certificates,
}) => (
  <CertContainer width={width}>
    <CertificateHeader />
    {certificates.map((certificate, index) => (
      <CertificateItem
        key={certificate.id}
        certificate={certificate}
        isLast={index === certificates.length - 1}
      />
    ))}
  </CertContainer>
);
