import type { NotificationInstance } from "antd/es/notification/interface";

export const notifySuccess = (
    notifInstance: NotificationInstance,
    message: string,
    description?: string,
    placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "bottomRight"
) => {
    notifInstance.success({
        message,
        description,
        placement,
    });
};

export const notifyError = (
    notifInstance: NotificationInstance,
    message: string,
    description?: string,
    placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "bottomRight"
) => {
    notifInstance.error({
        message,
        description,
        placement,
    });
};
