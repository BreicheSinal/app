import { FC, ChangeEvent, useState } from "react";
import { ExperienceContainer } from "./ExperienceContainer";
import { ExperienceHeader } from "./ExperienceHeader";
import { ExperienceItem } from "./ExperienceItem";
import { ExperienceDialog } from "./ExperienceDialog";
import {
  Experience,
  ExperienceFormData,
} from "../../../core/utils/globalUtils";

import { ConfirmationDialog } from "../TryOutsCard/ConfirmationDialog";

interface ExperienceCardProps {
  width?: number;
  experiences: Experience[];
  addition?: (experience: Omit<Experience, "id">) => void;
  edit?: (experience: Experience) => void;
  delete?: (id: number) => void;
  showEdit?: boolean;
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
  width = 600,
  experiences,
  addition,
  edit,
  delete: deleteExp,
  showEdit = true,
}) => {
  console.log(experiences);
  const [experienceDialogOpen, setExperienceDialogOpen] =
    useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExperienceFormData>({
    name: "",
    date: "",
    type: "experience",
    description: "",
  });

  const handleExperienceOpen = (experience?: Experience) => {
    if (experience) {
      setSelectedExperience(experience);
      setFormData({
        name: experience.name,
        date: experience.date,
        type: "experience",
        description: experience.description,
      });
    } else {
      setSelectedExperience(null);
      setFormData({
        name: "",
        date: "",
        type: "experience",
        description: "",
      });
    }
    setExperienceDialogOpen(true);
  };

  const handleExperienceClose = () => {
    setExperienceDialogOpen(false);
    setSelectedExperience(null);
    setFormData({
      name: "",
      date: "",
      type: "experience",
      description: "",
    });
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteId && deleteExp) {
      setIsDeleting(true);
      try {
        await deleteExp(deleteId);
      } finally {
        setIsDeleting(false);
        setConfirmDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedExperience && edit) {
      edit({
        id: selectedExperience.id,
        ...formData,
      });
    } else if (addition) {
      addition(formData);
    }
    handleExperienceClose();
  };

  const handleChange =
    (field: keyof ExperienceFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
        type: "experience",
      });
    };

  return (
    <ExperienceContainer width={width}>
      <ExperienceHeader
        onAdd={() => handleExperienceOpen()}
        showEdit={showEdit}
      />
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          showEdit={showEdit}
          onEdit={handleExperienceOpen}
          onDelete={handleDeleteClick}
          isLast={index === experiences.length - 1}
        />
      ))}
      <ExperienceDialog
        open={experienceDialogOpen}
        onClose={handleExperienceClose}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isEdit={!!selectedExperience}
      />
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </ExperienceContainer>
  );
};

interface ExperienceCardViewProps {
  width?: number;
  experiences: Experience[];
}

export const ExperienceCardView: FC<ExperienceCardViewProps> = ({
  width = 600,
  experiences,
}) => (
  <ExperienceContainer width={width}>
    <ExperienceHeader />
    {experiences.map((experience, index) => (
      <ExperienceItem
        key={experience.id}
        experience={experience}
        isLast={index === experiences.length - 1}
      />
    ))}
  </ExperienceContainer>
);
