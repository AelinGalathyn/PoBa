export const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$", "gm");
export const apiRegex = new RegExp("^(?=.*?[a-z])(?=.*?[0-9]).{1,40}$", "gm");