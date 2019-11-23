let hourPtr

export const eventArr = [
  {
    title: 'Service Day',
    startTime: new Date(
      `November 22, 2019 ${(hourPtr = faker.random.number({
        min: 8,
        max: 20
      }))}:00:00`
    ),
    endTime: new Date(
      `November 22, 2019 ${hourPtr +
        faker.random.number({min: 1, max: 3})}:00:00`
    ),
    address: '',
    description:
      "We gather to prepare food, clothing and other comfort items to share with our unhoused neighbors in Chicago. We alternate our distribution schedule between downtown and Garfield Park. As a Service Day Afternoon Volunteer- Downtown, you'll be sharing the prepared meals, clothing and comfort items with the community in direct connection. We meet at Clinton and Lake (there is a parking lot and pink and green line stop) and start walking with our wagons full of love and food and clothing and meet people where they are.",
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  },
  {
    title: '',
    startTime: new Date(
      `November 22, 2019 ${(hourPtr = faker.random.number({
        min: 8,
        max: 20
      }))}:00:00`
    ),
    endTime: new Date(
      `November 22, 2019 ${hourPtr +
        faker.random.number({min: 1, max: 3})}:00:00`
    ),
    address: '',
    description: '',
    volunteerTargetNum: faker.random.number({min: 3, max: 25})
  }
]
