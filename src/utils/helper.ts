import { useSwal } from "@/composable/useSwal";
import Swal from "sweetalert2";
import i18n from "@/plugins/i18n";
import moment from "moment";
import { ref } from "vue";
const helpers = {
  cutText(text: string, length: number) {
    if (text.split(" ").length > 1) {
      const string = text.substring(0, length);
      const splitText = string.split(" ");
      splitText.pop();
      return splitText.join(" ") + "...";
    } else {
      return text;
    }
  },
  capitalizeFirstLetter(string: string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return "";
    }
  },
  // filter search
  filterOptionSearch(input: string, option: any) {
    return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  // delete function
  async confirmDeletionAction(action: Function, id: number) {
    const t = i18n.global.t;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger me-2",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    try {
      const res = await swalWithBootstrapButtons.fire({
        title: t("Delete_message.Are_you_sure"),
        text: t("Delete_message.Action_irreversible"),
        icon: "warning",
        confirmButtonText: t("Delete_message.Yes_Delete"),
        cancelButtonText: t("Delete_message.Yo_Cancel"),
        showCancelButton: true,
      });

      if (res.isConfirmed) {
        await action(id);
        await swalWithBootstrapButtons.fire(
          t("Delete_message.Removed"),
          t("Delete_message.Record_deleted_successfull"),
          "success"
        );
        return true;
      }
    } catch (error: any) {
      await swalWithBootstrapButtons.fire(
        t("Something_went_wrong"),
        error.response?.data?.errors,
        "error"
      );
    }
  },
  async downloadFile(api: any, params: any) {
    const res = await api(params);
    const url = URL.createObjectURL(
      new Blob([res], {
        type: "application/vnd.ms-excel",
      })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Worksheet_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  },
  truncatedMessage(message: string) {
    if (message) {
      let firstLine = message.split("\n", 1)[0];
      let text = firstLine.replace(/<[^>]*>/g, "");
      return text;
    } else return message;
  },
  filterOptionByName: (input: string, option: any) => {
    return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  filterOptionByTheme: (input: string, option: any) => {
    return option.theme.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  filterOptionByFullName: (input: string, option: any) => {
    return option.fullname.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  },
  paraNumber: 8,
  loaderRefresh: 100,
  pagePer: 10,
};

export default helpers;
