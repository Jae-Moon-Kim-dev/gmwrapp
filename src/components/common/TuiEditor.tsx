'use client'

import React, { useEffect } from 'react';
import '@toast-ui/editor/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
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

const TuiEditor = ({ 
    handleImage,
    value,
    editorRef,
}: EditorProps) => {

    useEffect(()=>{
        console.log(value);
        if ( editorRef && editorRef.current && value ) {
            editorRef.current.getInstance().setHTML(value);
        }
    },[value, editorRef]);

    return <>
        <Editor
            ref={editorRef}
            initialEditType="wysiwyg"
            usageStatistics={false}
            height="570px"
            plugins={[chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]}
            hooks={{ addImageBlobHook: handleImage }}
        />
    </>;
}

export default TuiEditor;