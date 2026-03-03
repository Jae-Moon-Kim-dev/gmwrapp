'use client'

import React, { useCallback, useRef, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Badge, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useFormContext } from 'react-hook-form';

const DropzoneFileupload = () => {
    const [files, setFiles] = useState<File[]>([]);
    const { setValue } = useFormContext();
    
    const onDrop = useCallback((fileContent: File[], fileRejections: FileRejection[]) => {

        if ( fileRejections.length > 0 ) {
            let errorMsg = '';
            fileRejections.forEach(({file, errors}) => {
                if ( errors ) {
                    
                    errors.forEach(a => {
                        switch (a.code) {
                            case 'file-too-large':
                                errorMsg += `<strong>${file.name}</strong> 파일은 너무 큽니다. (최대 10MB)<br/>`;
                                break;
                            case 'file-invalid-type':
                                errorMsg += `<strong>${file.name}</strong> 파일은 허용되지 않는 형식입니다.<br/>`;
                                break;
                            // case 'too-many-files':
                            //     console.log(`파일을 너무 많이 선택했습니다. (최대 1개)`);
                            //     break;
                            default:
                                errorMsg += `<strong>${file.name}</strong> 파일 업로드 중 알 수 없는 에러가 발생했습니다: ${a.message}<br/>`;
                                break;
                        }
                    });
                }
            });
            Swal.fire({
                icon: "error",
                html: errorMsg,
            });
            return;
        }

        if ( fileContent.length > 0 ) {
            setFiles(state => {
                return [
                    ...state,
                    ...fileContent,
                ]
            });
            setValue('board_files', [
                ...files,
                ...fileContent,
            ]);
        }

    }, []);
    const { getRootProps, getInputProps, inputRef } = useDropzone({
        onDrop, 
        accept: {
            'application/zip': ['.zip'],
            'application/x-nwc': ['.nwc'], // nwc는 표준 MIME 타입이 아닐 수 있으므로 확인 필요
            'application/pdf': ['.pdf'],
            'application/x-hwp': ['.hwp'], // hwp는 표준 MIME 타입이 아닐 수 있으므로 확인 필요
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'audio/mpeg': ['.mp3'],
            }, 
        maxSize: 10*1024*1024,
        noClick: true,
    });

    const handleFileBtnClick = () => {
        inputRef.current?.click();
    }

    const handleFileDelete = (idx: number) => {
        setFiles(state => {
            const newFiles = state.filter((_,i) => i !== idx);
            return newFiles;
        });

        setValue('board_files', [
            files.filter((_,i) => i !== idx)
        ]);
    }

    return <>
            <Card {...getRootProps()} style={{ minHeight: "177px" }} >
                <input {...getInputProps() }  />
                {
                    // isDragActive ? <p> 파일이 업로드 되었습니다.</p> : <p>파일을 업로드 하세요.</p>
                    (files && files.length) ? files.map((a, i) => {return <p key={`${a.name}_${i}`} className='mb-1' >{a.name} <Button variant='primary' size="sm" onClick={() => {handleFileDelete(i);}} >삭제</Button></p>;}) : ''
                }
            </Card>
        <Button variant="primary" onClick={handleFileBtnClick} className='mt-2'>파일 선택</Button>
    </>;
}

export default DropzoneFileupload;