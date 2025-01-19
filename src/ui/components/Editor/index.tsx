import { FC, useState, SyntheticEvent } from "react";
import { Box, Typography, TextField, Button, Tabs, Tab } from "@mui/material";
import { FileEdit, Send, Loader2, RefreshCw } from "lucide-react";
import { requestApi } from "../../../core/utils/request";
import ErrorAlert from "./ErrorAlert";

import { styles } from "./style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`editor-tabpanel-${index}`}
    aria-labelledby={`editor-tab-${index}`}
    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
  >
    {value === index && children}
  </Box>
);

const Editor: FC = () => {
  const [notes, setNotes] = useState("");
  const [processedNotes, setProcessedNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const processNotes = async () => {
    setIsLoading(true);
    setError(null);

    const systemPrompt = import.meta.env.VITE_SYSTEM_PROMPT;
    try {
      const data = await requestApi("/notes/process", "POST", {
        notes,
        systemPrompt: systemPrompt,
      });

      setProcessedNotes(data.processedNotes);
      setActiveTab(1);
    } catch (error) {
      if (error === "Too many requests. Please try again later") {
        setError(
          "You've reached the maximum number of requests. Please try again in an hour."
        );
      } else {
        setError("An error occurred while processing your notes.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={styles.container}>
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <Box sx={styles.header}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={styles.tabs}>
          <Tab
            icon={<FileEdit size={20} />}
            iconPosition="start"
            label="Editor"
            sx={styles.tab}
          />
          <Tab
            icon={<RefreshCw size={20} />}
            iconPosition="start"
            label="Processed"
            sx={styles.tab}
          />
        </Tabs>
        <Button
          variant="contained"
          disabled={isLoading || !notes.trim()}
          onClick={processNotes}
          startIcon={
            isLoading ? <Loader2 className="animate-spin" /> : <Send />
          }
          sx={styles.processButton}
        >
          {isLoading ? "Processing..." : "Process"}
        </Button>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <TextField
          multiline
          fullWidth
          placeholder="Start typing your sports notes here... 
Example:
- Game observations
- Player statistics
- Team strategies
- Match highlights"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={styles.textField}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Box sx={styles.processedContent}>
          {processedNotes ? (
            <Typography sx={styles.processedText}>{processedNotes}</Typography>
          ) : (
            <Box sx={styles.emptyState}>
              <Typography sx={{ color: "#71717a", fontSize: "1.1rem" }}>
                Processed notes will appear here...
              </Typography>
            </Box>
          )}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Editor;
