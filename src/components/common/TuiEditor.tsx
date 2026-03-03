'use client'

import React, { useEffect } from 'react';
import '@toast-ui/editor/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import chart from '@toast-ui/editor-plugin-chart';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@/styles/tui-color-picker.css';
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import { EditorProps } from '@/app/types/common/editor';
import { HookCallback } from '@toast-ui/editor/types/editor';
import Swal from 'sweetalert2';

const TuiEditor = ({ 
    handleImage,
    value,
    editorRef,
}: EditorProps) => {

    useEffect(()=>{
        if ( editorRef && editorRef.current && value ) {
            editorRef.current.getInstance().setHTML(value);
        }
    },[value, editorRef]);

    const handleImageBlob = (blob: File | Blob, callback: HookCallback) => {
        const allowTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if ( !allowTypes.includes(blob.type) ) {
            Swal.fire({
                icon: "error",
                text: "이미지만 허용합니다.",
            });
            return;
        }

        handleImage(blob, callback);
    };

    return <>
        <Editor
            ref={editorRef}
            initialEditType="wysiwyg"
            usageStatistics={false}
            height="570px"
            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
            hooks={{ addImageBlobHook: handleImageBlob }}
            language="ko-KR"
        />
    </>;
}

export default TuiEditor;