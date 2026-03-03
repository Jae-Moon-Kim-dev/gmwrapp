import { Editor } from "@toast-ui/react-editor";

export type HookCallback = (url: string, text?: string) => void;

export type EditorProps = {
    editorRef: React.RefObject<Editor | null> | null;
    value?: string;
    handleImage: (blob: File | Blob, callback: HookCallback) => Promise<void>;
}
export interface MemorizedTuiEditorProps {
  handleImageBlob: (blob: File | Blob, callback: HookCallback) => Promise<void>;
}