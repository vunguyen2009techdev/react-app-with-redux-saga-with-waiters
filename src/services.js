export const fetchUsers = () => {
  return new Promise((resolver, reject) => {
    setTimeout(() => {
      resolver({ name: "vu.nguyen" });
    }, 10000);

    // setTimeout(() => {
    //   reject({ message: "Error get username" });
    // }, 10000);
  });
};
