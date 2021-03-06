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

let timeoutID;

export const settingNotification = (message, duration) => {
  return async (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    dispatch({
      type: "SETTING",
      notification: {
        message,
        display: "block",
      },
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: "REMOVING",
        notification: {
          message: "",
          display: "none",
        },
      });
    }, duration * 1000);
    console.log(timeoutID);
  };
};

export default notificationReducer;
