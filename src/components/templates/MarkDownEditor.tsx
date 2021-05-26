import { useMemo } from 'react'
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

interface ReadmeEditorProps {
  value: string,
  onChange: (value: string) => void,
}

export function MarkDownEditor({ value, onChange }: ReadmeEditorProps) {

  return (
    <SimpleMDE
      value={value}
      onChange={onChange} />
  );

}