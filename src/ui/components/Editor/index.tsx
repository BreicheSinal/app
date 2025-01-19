import { FC, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { FileEdit, Send, Loader2, RefreshCw } from "lucide-react";
import { requestApi } from "../../../core/utils/request";
import { editorStyles } from "./style";
import ErrorAlert from "./ErrorAlert";

const Editor: FC = () => {
  const [notes, setNotes] = useState("");
  const [processedNotes, setProcessedNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (error) {
      if (error === "Too many requests from this IP, please try again later") {
        setError(
          "You've reached the maximum number of requests. Please try again in an hour."
        );
      } else {
        setError("An error occurred while processing your notes.");
      }

      setProcessedNotes("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={editorStyles.container}>
      {/* Error Alert Overlay */}
      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {/* Editor Section */}
      <Box sx={editorStyles.editorSection}>
        <Box sx={editorStyles.editorHeader}>
          <FileEdit size={24} color="#60a5fa" />
          <Typography variant="h6" sx={editorStyles.editorTitle}>
            Sports Notes Editor
          </Typography>
        </Box>
        <TextField
          multiline
          fullWidth
          placeholder="Start typing your sports notes here... 
Example:
- Game observations
- Player statistics
- Team strategies"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={editorStyles.textField}
        />
      </Box>

      {/* Processed Notes Section */}
      <Box sx={editorStyles.processedSection}>
        <Box sx={editorStyles.processedHeader}>
          <Box sx={editorStyles.editorHeader}>
            <RefreshCw size={24} color="#4ade80" />
            <Typography variant="h6" sx={editorStyles.editorTitle}>
              Processed Notes
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={isLoading || !notes.trim()}
            onClick={processNotes}
            startIcon={
              isLoading ? <Loader2 className="animate-spin" /> : <Send />
            }
            sx={editorStyles.processButton}
          >
            {isLoading ? "Processing..." : "Process Notes"}
          </Button>
        </Box>

        <Box sx={editorStyles.processedContent}>
          {processedNotes ? (
            <Typography sx={editorStyles.processedText}>
              {processedNotes}
            </Typography>
          ) : (
            <Box sx={editorStyles.emptyState}>
              <Typography sx={{ color: "#71717a", fontSize: "1.1rem" }}>
                Processed notes will appear here...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Editor;
