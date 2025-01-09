import { FC, ReactNode } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import "./style.css";

interface List {
  name: string;
  role: string;
  content?: string;
}

// defining interfaces for content
interface ContentSection {
  type: "text" | "list" | string;
  title?: string | null;
  subtitle?: string | null;
  content?: string | string[] | number | ReactNode | List[] | null;
}

export interface CardData {
  title: string;
  sections: ContentSection[];
}

interface CardDataProps {
  width: number;
  data: CardData;
  showEdit?: boolean;
  onEdit?: (sectionIndex: number) => void;
}

const CustomCard: FC<CardDataProps> = ({
  width,
  data,
  showEdit = false,
  onEdit,
}) => {
  const renderContent = (section: ContentSection, index: number) => {
    switch (section.type) {
      case "text":
        return (
          <Box key={index} sx={{ mb: 1 }}>
            {section.title && (
              <Typography
                variant="subtitle1"
                className="tertiary-color"
                sx={{ mb: 1 }}
              >
                {section.title}
              </Typography>
            )}
            {section.subtitle && (
              <Typography variant="subtitle2" className="tertiary-color">
                {section.subtitle}
              </Typography>
            )}
            <Typography
              variant="body2"
              className="white-color"
              sx={{ lineHeight: 1.6, opacity: 0.9 }}
            >
              {section.content as string}
            </Typography>
          </Box>
        );

      case "list":
        return (
          <Box
            key={index}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {(section.content as List[]).map((member, idx, arr) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  borderBottom:
                    idx === arr.length - 1
                      ? "none"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                  pb: idx === arr.length - 1 ? 0 : 0,
                  mb: idx === arr.length - 1 ? 0 : 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", fontSize: "14px" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#fff",
                      opacity: 0.7,
                      textAlign: "right",
                    }}
                  >
                    {member.role}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#fff",
                    opacity: 0.8,
                    lineHeight: 1.5,
                    mt: 1,
                  }}
                >
                  {member.content}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="Box flex align-start">
      <Card
        className="Card secondary-bg-color"
        sx={{
          width: { xs: "90%", sm: width, md: width },
          minWidth: "300px",
          maxWidth: "600px",
          height: "auto",
          border: "none",
          borderRadius: 2,
        }}
      >
        <CardContent
          sx={{
            p: 1.5,
            "&:last-child": {
              pb: 1.5,
            },
          }}
        >
          <Box className="flex space-between align-center" sx={{ mb: 1 }}>
            <Typography
              variant="h6"
              className="tertiary-color"
              sx={{ fontWeight: "bold", letterSpacing: "0.5px", mb: 1 }}
            >
              {data.title}
            </Typography>
            {showEdit && (
              <IconButton
                onClick={() => onEdit && onEdit(0)}
                size="small"
                sx={{ color: "primary.main", mb: 1 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          {data.sections.map((section, index) => renderContent(section, index))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCard;
