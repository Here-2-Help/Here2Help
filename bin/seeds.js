const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const User = require('../models/user');
const Event = require('../models/event');
const Organization = require('../models/organization');
const Review = require('../models/review');

const dbName = 'server';
mongoose.connect(process.env.MONGODB_URI);


const usersArray = [
  {
    firstName: 'Giannini',
    lastName: 'Charles',
    zipCode: '33014',
    email: 'giannini@ironhack.com',
    password: 'gianninicharles',
    profilePicture: 'https://media.licdn.com/dms/image/C5603AQEgBk_NtZI-cA/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=owhW0atmdkgkX6zI4Z6UqrVu-6GOTNZGEgkv-FgmevY',
    phoneNumber: '1234567890',
    bio:                'Passionate Software Development student coding his way through this world’s rapid advance of technology. Lifelong learner. Skilled in operating Windows PC’s using the GUI as well as learning Web Development at Ironhack.'
  },
  {
    firstName: 'Chad',
    lastName: 'Barcelo',
    zipCode: '33129',
    email: 'chad@ironhack.com',
    password: 'chadbarcelo',
    profilePicture: 'https://media.licdn.com/dms/image/C4E03AQHpx8aIx3QQ8g/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=_adTfH1P8cFYHsp_tO-6BgkJO1aHiChAHiqG5f-fL4Y',
    phoneNumber: '1234567890',
    bio:                'An aspiring web developer with a strong interest in creating websites with an enhanced user experience, clean design, and dynamic functionality. Skilled in JavaScript (Express.js, Angular 2 and Node.js), HTML5, CSS3, MongoDB. '
  },
  {
    firstName: 'Evan',
    lastName: 'Londoño',
    zipCode: '33023',
    email: 'evan@ironhack.com',
    password: 'evanlondono',
    profilePicture: 'https://media.licdn.com/dms/image/C4E03AQHhq6XMiGTglQ/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=rF-ciK1F84A3pl-JYYT0ryK9CXFV7f7o77izArxfsNY',
    phoneNumber: '1234567890',
    bio:                `I am a graduate of Ironhack where I was exposed to Full Stack Web Development and developed three projects using the JavaScript MEAN stack (MongoDB, Express.js, Angular 2, and Node.js).
                        Also a current student at Broward College where I am completing my computer science degree.`
  },
  {
    firstName: 'Sandra',
    lastName: 'Boskovic',
    zipCode: '33129',
    email: 'sandra@ironhack.com',
    password: 'sandraboskovic',
    profilePicture: 'https://media.licdn.com/dms/image/C4D03AQGIXXCTW4uCYQ/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=R5BSd9c9SOWK58MSP9urAmoH0vGzpCc3qhd1D7xWMek',
    phoneNumber: '1234567890',
    bio:                `Enthusiastic problem solver currently working as the Lead Teaching Assistant at Ironhack Miami. Dedicated and results driven individual with a high degree of professionalism. Demonstrated strengths include leadership, team-work, open communication and complex problem-solving.`
  },
  {
    firstName: 'Marcos',
    lastName: 'Palacios',
    zipCode: '33015',
    email: 'marcos@ironhack.com',
    password: 'marcospalacios',
    profilePicture: 'https://media.licdn.com/dms/image/C4D03AQH_GonWLjAtyQ/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=41NcEk9yEHOVLqWOiHNyJjBh9c62Jk7IeKYUPwsqXrM',
    phoneNumber: '1234567890',
    bio:                `Since before I left high school, I've been working in the hospitality industry. I have been mainly bartending since I turned 21. Always enjoying modifying games in my free time and enjoying the challenge of making the games feel more than what they were and more in depth.`
  },
  {
    firstName: 'Manuel',
    lastName: 'Cabrera',
    zipCode: '33015',
    email: 'manuel@ironhack.com',
    password: 'manuelcabrera',
    profilePicture: 'https://media.licdn.com/dms/image/C5603AQERjj4VU3RyKw/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=Qs6KgHDLOcydBV45upydOYGPbuT24tcJShaWW63yt9s',
    phoneNumber: '1234567890',
    bio:                `I am a graduate from Iron Hack’s Web development bootcamp in Miami while working as Sous Chef at the Ritz Carlton. I have 3 years of experience in cost control management, but I longed for a change in my life and career. That’s the reason I decided to join IronHack. Learning how to code and creating innovative solutions fascinates me.`
  },
  {
    firstName: 'Nick',
    lastName: 'Toad Eater',
    zipCode: '33123',
    email: 'toadeater@ironhack.com',
    password: 'nicktoadeater',
    profilePicture: 'http://www.abc.net.au/news/image/5218004-3x2-940x627.jpg',
    phoneNumber: '1234567890',
    bio:                `I am he whomst eats toads.`
  },
  {
    firstName: 'Christine',
    lastName: 'Beck',
    zipCode: '33139',
    email: 'christine@ironhack.com',
    password: 'christinebeck',
    profilePicture: 'https://media.licdn.com/dms/image/C4E03AQGNDn5WLN6X6g/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=kr-hWgDxUICzEb8pyeGMyWXeGXv16JSNRAh2BMrRF-g',
    phoneNumber: '1234567890',
    bio:                `I'm currently a student at Ironhack's web development bootcamp in Miami, Florida. Before Ironhack, I was a marine science teacher at a South Florida high school. Before that, I worked as a graduate research assistant and teaching assistant in environmental science. Now, I'm learning to code, changing my career, and becoming a web developer.`
  },
  {
    firstName: 'David',
    lastName: 'Mudd',
    zipCode: '33326',
    email: 'david@ironhack.com',
    password: 'davidmudd',
    profilePicture: 'https://media.licdn.com/dms/image/C4E03AQH0Qwdss3-_ow/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=nrEmBp4GVfjXqNcYS6K5BultimJOWyMCbKiw8WC4TsE',
    phoneNumber: '1234567890',
    bio:                `I have been crafting experiences for people for over 4 years as a sommelier and love the demands of constantly learning and creativity. I have always had a love for tech and decided to immerse myself and join Ironhack. I have 5 years of experience in Sales and Business Development in the US and Europe. Prior to that I served in the United States Air Force.`
  },
  {
    firstName: 'Jose',
    lastName: 'Arjona',
    zipCode: '33142',
    email: 'jose@ironhack.com',
    password: 'josearjona',
    profilePicture: 'https://media.licdn.com/dms/image/C4E03AQHR_GdKOOSKXw/profile-displayphoto-shrink_800_800/0?e=1539216000&v=beta&t=CHTcQW-KcbOXHlgJ-o1s3LUumhAw7-OPUo9udnCxgGE',
    phoneNumber: '1234567890',
    bio:                `I am a recent graduate of Ironhack’s Web Development bootcamp in Miami. Previously, I worked as the Lead IT Engineer at a freight forwarding company where I managed everything tech related for 50+ people. While working there, I was able to implement some JavaScript into the workflow to automate tasks. After implementing a handful of these automations I realized I wanted to become a developer. I wanted to continue to learn and grow, and that is why I joined Ironhack. At Ironhack I was able to further develop myself into a Full Stack (MEAN) Developer. Now, I am currently seeking to break into the booming South Florida tech ecosystem and finally incorporate my past experience with my passion for learning and my coding skillset.`
  }
];

const orgsArray = [
  {
    name: `The Children's Trust`,
    address: '3150 SW 3rd Ave, Miami, FL 33129',
    email: 'mail@thechildrenstrust.com',
    phoneNumber: '3055715700',
    description: `The Children's Trust is a dedicated source of revenue established by voter referendum to improve the lives of children and families in Miami-Dade County.`,
    mainPhoto: 'http://pediatrics.med.miami.edu/images/ChildrensTrust_logo.jpg',
    orgPhotos: [
      'https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-9/38473480_10155366387416432_2504224499189153792_n.jpg?_nc_cat=0&oh=de8d165e8380d6bc3a950be773d3dae6&oe=5BCE46AD',
      'https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-9/38391212_10155366387251432_8081129964134465536_n.jpg?_nc_cat=0&oh=b88f67af8250c9ddf355138b5ff47090&oe=5BF96FED',
      'https://scontent.fmia1-2.fna.fbcdn.net/v/t1.0-9/38003687_10155356486661432_8393385755979808768_n.jpg?_nc_cat=0&oh=4d1f37f4311e438e230f86c90b3ecca4&oe=5C0BAB73'
    ]
  },
  {
    name: 'American Society for the Prevention of Cruelty to Animals (ASPCA)',
    address: `10700 SW 211th St Cutler Bay, FL 33189`,
    email: 'intakereception@humanesocietymiami.org',
    phoneNumber: '3056960800',
    description: 'The Humane Society of Greater Miami has been helping homeless animals in Miami-Dade County since 1936. Today, more than 400 homeless dogs, cats, puppies and kittens each day are cared for at the Soffer and Fine Adoption Center in North Miami Beach. We are able to give these animals a second chance by providing tender loving care, a good meal, shelter and medical care for as long as it takes to find them homes with kind, responsible and committed caregivers.',
    mainPhoto: 'http://www.humanesocietymiami.org/wp-content/uploads/2014/04/HSGM_Logo_2015-260x300.jpg',
    orgPhotos: [
      'https://c7.alamy.com/comp/FJ1549/miami-beach-florida-mobile-adopt-animal-shelter-pet-trailer-adopting-FJ1549.jpg',
      'https://cbsmiami.files.wordpress.com/2014/07/hope-express-2.jpg?w=1000&h=576&crop=1',
      'https://cbsmiami.files.wordpress.com/2012/06/dog-and-kitten-catdl.jpg?w=420&h=315&crop=1'
    ]
  },
  {
    name: 'Habitat for Humanity',
    address: '​3800 NW 22nd Avenue, Miami, FL 33142',
    email: 'email@habitatforhumanitymiami.com',
    phoneNumber: '3056343628',
    description: 'Habitat served over 1.6 million people through home construction, rehabilitation and repairs and by increasing access to improved shelter through products and services. Other efforts like training in construction and financial management and by advocating for policies and systems that increase access to housing solutions, an additional 3 million people now have the potential to improve their living conditions. Over 1 million families have been served as of June 2014 since Habitat was founded in 1976.',
    mainPhoto: 'https://www.miamihabitat.org/uploads/5/4/4/9/54499765/published/1436550730.png?1531922659',
    orgPhotos: [
      'https://www.miamihabitat.org/uploads/5/4/4/9/54499765/7418633.jpg?597',
      'https://www.miamihabitat.org/uploads/5/4/4/9/54499765/6890124.jpg',
      'https://www.miamihabitat.org/uploads/5/4/4/9/54499765/6622157_orig.jpg'
    ]
  },
  {
    name: 'Ronald McDonald House Charities of South Florida',
    address: '1145 NW 14th Ter Miami, FL 33136',
    email: 'email@ronaldmcdonaldhouse.com',
    phoneNumber: '3053245683',
    description: 'The mission of Ronald McDonald House Charities® (RMHC) is to create, find and support programs that directly improve the health and well being of children in South Florida.',
    mainPhoto: 'https://rmhcsouthflorida.org/dev/wp-content/uploads/rmhc-logo.png',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'Camillus House',
    address: '1603 NW 7th Ave Miami, FL 33136',
    email: 'email@camillushouse.com',
    phoneNumber: '3053741065',
    description: 'Camillus House has provided humanitarian services to the indigent and homeless populations of Miami-Dade County, Florida for more than 50 years.',
    mainPhoto: 'http://www.camillus.org/graphics/redesign/logo2.jpg',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'HandsOn Miami',
    address: '2103 Coral Way Miami, FL 33145',
    email: 'email@handsonmiami.org',
    phoneNumber: '3055044510',
    description: 'HandsOn Miami inspires, equips and mobilizes people to take action to effect positive change in our Miami-Dade County community. By leveraging the power of people and socially responsible businesses, we transform local communities through meaningful hands-on projects that make a difference.',
    mainPhoto: 'https://cdn0.handsonconnect.org/9001-f/images/d4feb397-3ec2-47bb-852c-a8e72336de65.png',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'Big Brothers Big Sisters of Greater Miami',
    address: '550 NW 42nd Ave, Miami, FL 33126',
    email: 'email@bbbs.com',
    phoneNumber: '3056440066',
    description: 'Big Brothers Big Sisters of Miami is the premier mentoring organization of South Florida. Every day, we awaken possibilities for thousands of Miami’s kids - one child and afternoon at a time - through professionally supported, one-on-one relationships with caring adult volunteers. BBBS Miami has over 55 years of history and experience in the community, since our founding in 1958. We rank in the top 30 largest BBBS agencies in the country and #1 in Florida.',
    mainPhoto: 'http://www.bbbsmiami.org/assets/img/big-brothers-big-sisters-of-miami-logo-transparent.png',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'Goodwill',
    address: '9760 SW 8th St Miami, FL 33174',
    email: 'email@goodwill.com',
    phoneNumber: '9544722367',
    description: 'Goodwill works to enhance the dignity and quality of life of individuals and families by strengthening communities, eliminating barriers to opportunity, and helping people in need reach their full potential through learning and the power of work.',
    mainPhoto: 'https://botw-pd.s3.amazonaws.com/styles/logo-original-577x577/s3/102011/untitled-1_45.png?itok=lGd3DCV0',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'Jackson Memorial Hospital',
    address: '1005, 1611 NW 12th Ave, Miami, FL 33136',
    email: 'email@jacksonmemorial.com',
    phoneNumber: '3055851111',
    description: 'Jackson Memorial Hospital is a non-profit, tertiary care teaching hospital and the major teaching hospital of the University of Miami Leonard M. Miller School of Medicine in Miami, Florida. It currently has around 1,550 licensed beds.',
    mainPhoto: 'http://www.jacksonhealth.org/images/logo-jackson-memorial.jpg',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  },
  {
    name: 'Miami-Dade Public Library System',
    address: '101 W Flagler St, Miami, FL 33130',
    email: 'library@mdlibraries.com',
    phoneNumber: '3058208564',
    description: 'Delivering quality services reflecting the informational, educational, and recreational needs of our diverse community.',
    mainPhoto: 'https://upload.wikimedia.org/wikipedia/commons/5/52/MDPLS_Wing_Logo.jpg',
    orgPhotos: [
      'https://rmhcsouthflorida.org/dev/wp-content/uploads/2013/05/Front-of-the-House-in-2011-1024x764.jpg',
      'https://www.miamiherald.com/news/local/community/gay-south-florida/yrqgwe/picture4030726/alternates/FREE_768/Charity%20Angels%20at%20Ronald%20McDonald%20DB-1.JPG',
      'https://www.keiseruniversity.edu/wp-content/uploads/2015/06/OTA-Life-Span-June-2015-2.jpg'
    ]
  }
];

User.create(usersArray)
.then((response)=>{
  console.log(`created ${response.length} users`);
})
.catch((err)=>{
  console.log('didnt work', err)
});

Organization.create(orgsArray)
.then((response)=>{
  console.log(`created ${response.length} Orgs`);
})
.catch((err)=>{
  console.log('didnt work', err)
});