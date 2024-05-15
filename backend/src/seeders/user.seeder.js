import { faker } from "@faker-js/faker";
import { User } from "../models/user.model.js";

export const createUserByFaker = async (num) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < num; i++) {
      const gender = Math.random() < 0.5 ? "Male" : "Female";
      const fullName = faker.person.fullName(
        gender === "Male" ? "male" : "female"
      );
      let randomNumber = Math.ceil(Math.random() * 50);
      if (gender === "Female") {
        randomNumber += 50;
      }

      const tempUser = User.create({
        fullName,
        mobileNumber: "+91" + faker.string.numeric(10),
        password: "password",
        gender,
        avatar: `https://avatar.iran.liara.run/public/${randomNumber}`,
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);
    console.log(`${num} Users created & added in db`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
