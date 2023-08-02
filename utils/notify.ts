import toast from "react-hot-toast";

export function notify(message: string) {
    toast(message, {
        duration: 5000,
        position: "top-right"
    });
}

export function notifySuccess(message: string) {
    toast.success(message, {
        duration: 3000,
        position: "top-right"
    });
}