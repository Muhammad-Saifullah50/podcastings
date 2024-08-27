import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from './ui/input'
import Image from 'next/image'

interface FileUploaderProps {
    files: File | undefined
    onChange: (files: File) => void
    uploadedImage?: string
    setUploadedImage: (file: any) => void
}

const FileUploader = ({ files, onChange, setUploadedImage, uploadedImage }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            onChange(file);
            const objectUrl = URL.createObjectURL(file);
            setUploadedImage(objectUrl);
        }
    }, [onChange, setUploadedImage]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    useEffect(() => {
        return () => {
            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage);
            }
        };
    }, [uploadedImage]);
    return (
        <div {...getRootProps()} className='py-8'>
            <Input {...getInputProps()} />
            {
                files ? (
                    <Image
                        src={uploadedImage ? uploadedImage : ''}
                        alt="Uploaded file"
                        width={200}
                        height={200}
                        className='object-contain mx-auto'
                    />
                ) : (
                    <div className='flex flex-col gap-2 p-8 border border-dashed border-dark-secondary items-center justify-center h-60 '>
                        <Image
                            src={'/upload.svg'}
                            alt="Upload"
                            width={40}
                            height={40}
                        />
                        <p className='text-light-secondary text-sm font-normal'>
                            <span className='text-orange font-semibold'>Click to Upload {' '}</span>
                            or drag and drop
                        </p>
                        <p className='text-light-secondary text-sm font-normal text-center'>SVG, PNG, JPG or GIF (max. 1080x1080px)</p>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader