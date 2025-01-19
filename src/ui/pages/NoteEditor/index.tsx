import Editor from "../../components/Editor";
import FeedLayout from "../../Layout/FeedLayout";

const NoteEditor  = () => {
  return (
    <div className="feed-container">
      <FeedLayout>
        <Editor />
      </FeedLayout>
    </div>
  );
};

export default NoteEditor ;
