/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button className="w-full lg:w-auto" size="sm" {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
