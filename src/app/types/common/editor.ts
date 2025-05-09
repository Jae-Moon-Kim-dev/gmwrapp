export type EditorProps = {
    handleImage: (blob: File, callback: typeof Function) => Promise<void>;
}