const notification = {
  message: "",
  display: "none",
};

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case "SETTING":
      return action.notification;
    case "REMOVING":
      return action.notification;
    default:
      return state;
  }
};

export const settingNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch({
      type: "SETTING",
      notification: {
        message,
        display: "block",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "REMOVING",
        notification: {
          message: "",
          display: "none",
        },
      });
    }, duration * 1000);
  };
};

export default notificationReducer;
