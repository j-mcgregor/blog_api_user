import faker from "faker";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config";
import User from "../src/models/User";

mongoose.Promise = require("bluebird");

mongoose.connect(config.db, { useNewUrlParser: true });

User.collection.drop();

async function seedUser() {
  const users = [];
  for (let i = 0; i < 10; i++) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("password", salt);
    const skNumber = Math.floor(Math.random() * 15);
    const eduNumber = Math.floor(Math.random() * 5);
    const expNumber = Math.floor(Math.random() * 5);

    let skills = [];
    let education = [];
    let experience = [];

    for (let i = 0; i < eduNumber; i++) {
      education.push({
        degree: faker.lorem.word(),
        school: faker.lorem.word(),
        description: faker.lorem.sentences(3),
        grade: faker.address.city(),
        from: faker.date.past(10, "2010-01-01"),
        to: faker.date.past(7)
      });
    }

    for (let i = 0; i < expNumber; i++) {
      experience.push({
        title: faker.lorem.word(),
        description: faker.lorem.sentences(3),
        city: faker.address.city(),
        from: faker.date.past(10, "2010-01-01"),
        to: faker.date.past(1)
      });
    }

    for (let i = 0; i < skNumber; i++) {
      skills.push({
        skill: faker.lorem.word(),
        level: Math.floor(Math.random() * 100)
      });
    }

    const random = Math.random();
    const gender =
      random > 0.66 ? "Prefer not to say" : random < 0.33 ? "male" : "female";

    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      dob: faker.date.between("1990-01-01", "2010-01-05"),
      email: `test${i + 1}@test.com`,
      password: hash,
      about: faker.lorem.paragraphs(),
      tagline: faker.lorem.sentence(),
      mobile: faker.phone.phoneNumber(),
      phone: faker.phone.phoneNumber(),
      website: faker.internet.url(),
      socialLinkedIn: faker.lorem.word(),
      socialTwitter: faker.lorem.word(),
      socialFacebook: faker.lorem.word(),
      gender,
      profilePic: faker.image.avatar(),
      bio: faker.lorem.sentences(5),
      notifyOnAnswersThread: Math.random() > 0.5 ? true : false,
      notifyOnFollows: Math.random() > 0.5 ? true : false,
      notifyOnNewsAnnouncements: Math.random() > 0.5 ? true : false,
      notifyOnProductUpdates: Math.random() > 0.5 ? true : false,
      notifyOnWeeklyBlog: Math.random() > 0.5 ? true : false,
      experience,
      education,
      skills
    };
    users.push(newUser);
  }

  await User.create(users)
    .then(users => console.log(`${users.length} users created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
}

async function init() {
  console.log("Seeding users...");
  await seedUser();
}

init();
