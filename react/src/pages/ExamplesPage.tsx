import InputFile from "@components/ui/inputs/InputFile";
import useForm from "@hooks/useForm";
import { endpoints } from "@lib/config/global-variable";
import { TFileType } from "@types";

const ExamplesPage = () => {
  const { form, handleOnChange } = useForm({
    initialForm: {
      "file-input": {
        value: null,
        multiple: true,
        errorMessage: "",
        listUploadedFile: [],
      },
    },
  });

  return (
    <div className="h-full">
      <InputFile
        onChange={handleOnChange}
        {...form["file-input"]}
        totalSizeMax={10}
        listAcceptedFile={[TFileType.JPG, TFileType.XLSX]}
        isDirectUpload={true}
        endpoint={endpoints.uploadFile}
        additionalPayload={{
          upload_preset: "my-uploads",
        }}
        listUploadedFile={form?.["file-input"]?.listUploadedFile || []}
      />
      <InputFile
        onChange={handleOnChange}
        {...form["file-input"]}
        totalSizeMax={10}
        listAcceptedFile={[TFileType.JPG, TFileType.XLSX]}
        isDirectUpload={true}
        endpoint={endpoints.uploadFile}
        additionalPayload={{
          upload_preset: "my-uploads",
        }}
        listUploadedFile={form?.["file-input"]?.listUploadedFile || []}
        capture={true}
      />

      <input capture={"user"} type="file" accept="image/*" />
    </div>
  );
};

export default ExamplesPage;
