

export const storeStudentClasses = (content) => ({
  type: "store/studentClasses",
  payload: content
});

export const storeStudentName = (content) => ({
    type: "store/studentName",
    payload: content
});

export const storeLoadingStatus = (content) => ({
    type: "store/loadingStatus",
    payload: content
});  
