import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "wallet_registered_users";
const SESSION_KEY = "wallet_logged_in_user";

async function getUsers() {
  const storedUsers = await AsyncStorage.getItem(USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [];
}

export async function registerUser(form) {
  const users = await getUsers();

  const username = form.username.trim();
  const email = form.email.trim().toLowerCase();

  const usernameExists = users.some(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );

  if (usernameExists) {
    throw new Error("This username is already taken.");
  }

  const emailExists = users.some((user) => user.email.toLowerCase() === email);

  if (emailExists) {
    throw new Error("This email is already registered.");
  }

  const newUser = {
    id: Date.now().toString(),
    firstname: form.firstname.trim(),
    lastname: form.lastname.trim(),
    username,
    email,
    contactNumber: form.contactNumber.trim(),
    password: form.password,
  };

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

  return newUser;
}

export async function loginUser(username, password) {
  const users = await getUsers();

  const user = users.find(
    (item) =>
      item.username.toLowerCase() === username.trim().toLowerCase() &&
      item.password === password,
  );

  if (!user) {
    return null;
  }

  const { password: unusedPassword, ...safeUser } = user;

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));

  return safeUser;
}

export async function getCurrentUser() {
  const storedUser = await AsyncStorage.getItem(SESSION_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export async function logoutUser() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
