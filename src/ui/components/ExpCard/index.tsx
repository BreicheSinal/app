import { FC, ChangeEvent, useState } from "react";
import { ExperienceContainer } from "./ExperienceContainer";
import { ExperienceHeader } from "./ExperienceHeader";
import { ExperienceItem } from "./ExperienceItem";
import { ExperienceDialog } from "./ExperienceDialog";
import {
  Experience,
  ExperienceFormData,
} from "../../../core/utils/globalUtils";

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
  const [open, setOpen] = useState<boolean>(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [formData, setFormData] = useState<ExperienceFormData>({
    name: "",
    date: "",
    type: "experience",
    description: "",
  });

  const handleOpen = (experience?: Experience) => {
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExperience(null);
    setFormData({
      name: "",
      date: "",
      type: "experience",
      description: "",
    });
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
    handleClose();
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
      <ExperienceHeader onAdd={() => handleOpen()} showEdit={showEdit} />
      {experiences.map((experience, index) => (
        <ExperienceItem
          key={experience.id}
          experience={experience}
          showEdit={showEdit}
          onEdit={handleOpen}
          onDelete={deleteExp}
          isLast={index === experiences.length - 1}
        />
      ))}
      <ExperienceDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isEdit={!!selectedExperience}
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
