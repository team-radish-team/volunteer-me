let datePtr
let hourNum
const faker = require('faker')

const titleArr = [
  "Professional Linebacker Nick Kwiatkosi's Care for Real Toy Drive at the Shops at North Bridge",
  'Chicago Youth Symphony Orchestras\' 2020 Gala; "An American in Paris"',
  'Drink & Dance for Charity',
  'An Evening of Holiday Music - 6th Annual Dinner and Concert Gala',
  'Eosenopoly',
  'OCA-East Bay AAPI Leadership Lunch & Learns',
  'Warm Hearts with Donation',
  'Hillsdale Shopping Center Giving Tree Program',
  'Peninsula Humane Society - SPCA Pop Up Store',
  'The Fight For Air Climb',
  'Cat and Kitten Adoption Fair',
  'Ink for Paws 2',
  'Curl with Confidence',
  '15th Annual UNICEF Snowflake Ball',
  'Emergency Food Network Empty Bowls',
  'Winter Food Drive',
  'World AIDS Day RED RUN 2019',
  'Open Studio by Studio Upstairs',
  'Santa Dash 2019',
  'CASA Youth Advocates, Inc. 20th Annual Gala',
  'Pooch Kaboose Dog Adoption Event',
  "14th Annual Alex's Lemonade Stand Foundation Lemon Ball"
]

const descriptionArr = [
  'NFL linebacker Nick Kwiatkoski announced his third annual holiday toy drive in partnership with local Chicago charity Care for Real, alongside Shake Shack, the Shops at North Bridge, and Target. Kwiatkoski will be onsite at the center on Tuesday, December 10th from 12pm - 1pm for a meet and greet with fans who are participating in the drive. ',
  'Chicago Youth Symphony Orchestras\' 2020 gala celebrates the enduring Gershwin classic, "An American in Paris" and music of the legendary city of lights.Enjoy an evening of music and glamour to support world - class music education for young musicians from across the Chicago region.',
  'Join us for FREE dance lessons from The Lockport Swing Thing, music, and a good time. AND when you support people with developmental disabilities by donating $10 or more to Trinity Services',
  'From its beginnings in 1950 as a small school for children with disabilities, Trinity Services has grown to serve more than 3,500 children and adults with developmental disabilities and mental illness in DuPage, Cook, Will, Peoria, Grundy, Jackson, and St. Clair Counties.',
  "The unique and much anticipated event of the winter raises funds for the foundation's two - pronged mission: to fund gastrointestinal(GI) cancer research and to advance real estate education in an unforgettable, energy - filled evening.",
  'OCA-East Bay (ocaeastbay.org) is offering a FREE and exciting series of Leadership Lunch & Learns anchored by three incredible Asian Women Leaders. Please take a look at the descriptions and RSVP to ocaeastbay@gmail.com',
  'Hillsdale Shopping Center, in conjunction with the Ecumenical Hunger Program of East Palo Alto,  is warming up the holidays for needy Peninsula residents by participating in the One Warm Coat campaign.',
  'Together with Samaritan House of San Mateo County, Hillsdale Shopping Center is providing an opportunity for the San Mateo community to give back during the holiday season with the Giving Tree gift program. ',
  'The PHS/SPCA Holiday Pop Up Store and Adoption Center will offer pet related themed gifts and gifts for animal lovers. All proceeds from the sale of merchandise will benefit PHS/SPCA shelter animals.',
  "When you participate in a Fight For Air Climb event, you are stepping up to make a positive impact for those affected by lung disease. You will raise funds to support the American Lung Association's mission while climbing the stairs of a skyscraper.",
  "Want Kitties? We always have lots of kitties that are in need of good, loving homes. Please feel free to stop by, even if it's just for a cuddle!",
  "Join us for our 2nd Annual Ink for Paws! Last year was so much fun; you'll just have to drop in ! We are raising funds for One Love Dog Rescue, Inc. 501c3., so that we can continue our compassionate and fierce mission",
  'The TLC Foundation for BFRB (Body-focused Repetitive Behavior) is a general term for a group of related disorders that includes hair pulling, skin picking, and nail-biting. These behaviors are not habits or tics; rather, they are complex disorders that cause people to repeatedly touch their hair and body in ways that result in physical damage.',
  "UNICEF works in more than 190 countries and territories, helping save more children's lives than any other humanitarian organization. Since the inaugural UNICEF Snowflake Ball in 2005, the annual event has raised over $38 million for UNICEF's lifesaving programs.",
  'This event takes place during the Big Give Christmas Campaign and is a perfect way to learn more about what we do. Any donations made during the course of the week will be matched, doubling your impact!',
  'This Emergency Food Network event is an annual ritual enjoyed by more than 500 people each year.  During Empty Bowls, attendees can choose from more than 1,500 bowls to purchase for the home and for holiday gifts.',
  "Join us in helping to support our neighbors this holiday season. Peddler will be collecting non-perishable food items for the Ballard Food Bank and we'd love your help!",
  'Take Action. Lace Up!  The World AIDS Day RED RUN returns to Victoria Park on Sunday 30th November 2019 to raise awareness and funds for vital HIV services',
  'The dash starts at 11am, with entertainment between 10am - 2pm. Please note: whilst we welcome all ages to dash with us, from grandparents to babies, the 10k route is only available to anyone over 16 years old.',
  "In 1999, CASA was housed in a basement office that flooded frequently. The organization's 21 volunteers advocated for 83 Delaware County children on 42 cases, supported by a budget of $101, 000.There was no major fundraising event supporting the organization's work at the time.",
  'Come check out the adorable dogs looking for their FOREVER HOME!!! Event will be held at the Clubhouse next to the Leasing Office at The Towers At Wyncote.',
  "Complete with lemon yellow ties, heartwarming speeches by kids fighting cancer and fond remembrance of Alex Scott's lasting legacy, this annual event has inspired attendees since 2006."
]

// const eventArr = [
//   {
//     startTime: new Date(
//       `November 22, 2019 ${(datePtr = faker.random.number({
//         min: 8,
//         max: 20
//       }))}:00:00`
//     ),
//     endTime: new Date(
//       `November 22, 2019 ${datePtr +
//         faker.random.number({min: 1, max: 3})}:00:00`
//     ),
//     address: 'wee',
//     volunteerTargetNum: faker.random.number({min: 3, max: 25})
//   },
//   {
//     startTime: (datePtr = faker.date
//       .future(0.02, this.createdAt)
//       .setHours((hourNum = faker.random.number({min: 8, max: 20})), 0, 0, 0)),
//     endTime: new Date(datePtr).setHours(
//       hourNum + faker.random.number({min: 1, max: 3}),
//       0,
//       0,
//       0
//     ),
//     address: 'bleh',
//     volunteerTargetNum: faker.random.number({min: 3, max: 25})
//   }
// ]

module.exports = {descriptionArr, titleArr}
