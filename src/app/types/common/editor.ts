import { Editor } from "@toast-ui/react-editor";

export type EditorProps = {
    editorRef: React.RefObject<Editor | null> | null;
    value?: string;
    handleImage: (blob: File, callback: typeof Function) => Promise<void>;
}