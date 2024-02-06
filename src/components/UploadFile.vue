<script setup lang="ts">
import type { UploadProps } from "ant-design-vue";
import { ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { FileType } from "ant-design-vue/lib/upload/interface";

interface UploadFileProps {
  onUpload: (val: any, name: string) => void;
  multiple: boolean;
  fileNameAs: "file" | "task_files";
}

function filesToObj(files: FileType[], fileNameAs: "file" | "task_files") {
  let obj: Record<string, any> = {};

  files.forEach((file, index) => {
    obj[`${fileNameAs}[${index}]`] = file;
  });
  return obj;
}

const { onUpload, multiple, fileNameAs } = withDefaults(
  defineProps<UploadFileProps>(),
  {
    multiple: false,
    fileNameAs: "file",
  }
);

const fileList = ref<any>([]);

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  if (multiple) {
    fileList.value = [...fileList.value, file];
    onUpload(filesToObj(fileList.value, "1671949532.pdf"), "files");
  } else {
    onUpload(file, "file");
    fileList.value[0] = file;
  }

  return false;
};

const handleRemove: UploadProps["onRemove"] = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
</script>

<template>
  <a-upload
    :file-list="fileList"
    :before-upload="beforeUpload"
    class="upload"
    @remove="handleRemove"
    type="file"
    accept=".pdf"
  >
    <a-button class="a-upload-btn">
      <i class="mdi mdi-file-upload me-2"></i>
      {{ $t("Dashboard_File_Upload") }}
    </a-button>
  </a-upload>
</template>

<style lang="scss">
.ant-upload.ant-upload-select {
  display: block;
}

.upload .ant-upload {
  width: 100%;
}

.a-upload-btn {
  width: 100%;
  height: 38px;
  border-radius: 0.5rem;
  border: 1px solid #a9b4c2;
}
</style>

<!-- <script setup lang="ts">
import type { UploadProps } from "ant-design-vue";
import { ref } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { FileType } from "ant-design-vue/lib/upload/interface";

interface UploadFileProps {
  onUpload: (val: any, name: string) => void;
  multiple: boolean;
  fileNameAs: "file" | "task_files";
}

function filesToObj(files: FileType[], fileNameAs: "file" | "task_files") {
  let obj: Record<string, any> = {};

  files.forEach((file, index) => {
    obj[`${fileNameAs}[${index}]`] = file;
  });
  return obj;
}

const { onUpload, multiple, fileNameAs } = withDefaults(
  defineProps<UploadFileProps>(),
  {
    multiple: false,
    fileNameAs: "file",
  }
);

const fileList = ref<any>([]);

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  if (multiple) {
    fileList.value = [...fileList.value, file];
    onUpload(filesToObj(fileList.value, fileNameAs), "files");
  } else {
    onUpload(file, "file");
    fileList.value[0] = file;
  }

  return false;
};

const handleRemove: UploadProps["onRemove"] = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};
</script>

<template>
  <a-upload
    :file-list="fileList"
    :before-upload="beforeUpload"
    class="upload"
    @remove="handleRemove"
  >
  <a-button class="a-upload-btn">
      <i class="mdi mdi-file-upload me-2"></i>
      {{ $t("Dashboard_File_Upload") }}
    </a-button>
  </a-upload>
</template>

<style lang="scss">
.ant-upload.ant-upload-select {
  display: block;
}

.upload .ant-upload {
  width: 100%;
}

.a-upload-btn {
  width: 100%;
  height: 38px;
  border-radius: 0.5rem;
  border: 1px solid #a9b4c2;
}
</style> -->
