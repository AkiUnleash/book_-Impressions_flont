import { useMemo } from 'react'
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

// Next.jsでは通常のImportでは動かないため、DynamicImportを使用する。
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