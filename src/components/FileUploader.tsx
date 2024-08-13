import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from './ui/input'
import Image from 'next/image'

interface FileUploaderProps {
    files: File[] | undefined | any
    onChange: (files: File[]) => void
}

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onChange(acceptedFiles)
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const convertFileToUrl = (file: File) => URL.createObjectURL(file);

    return (
        <div {...getRootProps()} className='py-8'>
            <Input {...getInputProps()} />
            {
                files && files.length > 0 ? (
                    <Image
                        src={convertFileToUrl(files[0])}
                        alt="Uploaded file"
                        width={200}
                        height={200}
                        className='object-contain mx-auto'
                    />
                ) : (
                    <div className='flex flex-col gap-2 p-8 border border-dashed border-dark-secondary items-center justify-center h-60'>
                        <Image
                            src={'/upload.svg'}
                            alt="Upload"
                            width={40}
                            height={40}
                        />
                        <p className='text-light-secondary text-sm font-normal'>
                            <span>Click to Upload {' '}</span>
                            or drag and drop
                        </p>
                        <p className='text-light-secondary text-sm font-normal'>SVG, PNG, JPG or GIF (max. 1080x1080px)</p>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader