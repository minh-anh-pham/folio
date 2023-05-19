const {User, Book, Progress} = require("../models");
const db = require("./db");

async function seed() {
    // drop & create all tables in db
    await db.sync({force: true});

    const books = await Book.bulkCreate([
        {title: "Women, Race & Class", author: "Angela Y. Davis", numOfPages: 256, ISBN: 9780241408407, publisher: "Penguin Classics", yearPublished: 2019, summary: "Ranging from the age of slavery to contemporary injustices, this groundbreaking history of race, gender and class inequality by the radical political activist Angela Davis offers an alternative view of female struggles for liberation. \n \n Tracing the intertwined histories of the abolitionist and women's suffrage movements, Davis examines the racism and class prejudice inherent in so much of white feminism, and in doing so brings to light new pioneering heroines, from field slaves to mill workers, who fought back and refused to accept the lives into which they were born.", cover: "https://cdn.penguin.co.uk/dam-assets/books/9780241408407/9780241408407-jacket-large.jpg"},

        {title: "Caliban and the Witch: Women, the Body and Primitive Accumulation", author: "Silvia Federici", numOfPages: 400, ISBN: 9780241532539, publisher: "Penguin Classics", yearPublished: 2021, summary: "A cult classic since its publication in the early years of this century, Caliban and the Witch is Silvia Federici's history of the body in the transition to capitalism. \n\n Moving from the peasant revolts of the late Middle Ages through the European witch-hunts, the rise of scientific rationalism and the colonisation of the Americas, it gives a panoramic account of the often horrific violence with which the unruly human material of pre-capitalist societies was transformed into a set of predictable and controllable mechanisms. It is a study of indigenous traditions crushed, of the enclosure of women's reproductive powers within the nuclear family, and of how our modern world was forged in blood.", cover: "https://cdn.penguin.co.uk/dam-assets/books/9780241532539/9780241532539-jacket-large.jpg"},

        {title: "The Will to Change: Men, Masculinity, and Love", author: "bell hooks", numOfPages: 208, ISBN: 9780743456081, publisher: "Washington Square Press", yearPublished: 2004, summary: "Everyone needs to love and be loved—even men. But to know love, men must be able to look at the ways that patriarchal culture keeps them from knowing themselves, from being in touch with their feelings, from loving. \n\n In The Will to Change, bell hooks gets to the heart of the matter and shows men how to express the emotions that are a fundamental part of who they are—whatever their age, marital status, ethnicity, or sexual orientation. But toxic masculinity punishes those fundamental emotions, and it’s so deeply ingrained in our society that it’s hard for men to not comply—but hooks wants to help change that. \n\n With trademark candor and fierce intelligence, hooks addresses the most common concerns of men, such as fear of intimacy and loss of their patriarchal place in society, in new and challenging ways. She believes men can find the way to spiritual unity by getting back in touch with the emotionally open part of themselves—and lay claim to the rich and rewarding inner lives that have historically been the exclusive province of women. A brave and astonishing work, The Will to Change is designed to help men reclaim the best part of themselves.", cover: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9780743456081/the-will-to-change-9780743456081_xlg.jpg"},

        {title: "Crying in H Mart", author: "Michelle Zauner", numOfPages: 256, ISBN: 9780525657743, publisher: "Knopf", yearPublished: 2021, summary: "In this exquisite story of family, food, grief, and endurance, Michelle Zauner proves herself far more than a dazzling singer, songwriter, and guitarist. With humor and heart, she tells of growing up one of the few Asian American kids at her school in Eugene, Oregon; of struggling with her mother's particular, high expectations of her; of a painful adolescence; of treasured months spent in her grandmother's tiny apartment in Seoul, where she and her mother would bond, late at night, over heaping plates of food.\n\nAs she grew up, moving to the East Coast for college, finding work in the restaurant industry, and performing gigs with her fledgling band--and meeting the man who would become her husband--her Koreanness began to feel ever more distant, even as she found the life she wanted to live. It was her mother's diagnosis of terminal cancer, when Michelle was twenty-five, that forced a reckoning with her identity and brought her to reclaim the gifts of taste, language, and history her mother had given her.\n\nVivacious and plainspoken, lyrical and honest, Zauner's voice is as radiantly alive on the page as it is onstage. Rich with intimate anecdotes that will resonate widely, and complete with family photos, Crying in H Mart is a book to cherish, share, and reread.", cover: "https://images1.penguinrandomhouse.com/cover/700jpg/9781984898951"},

        {title: "Girl, Woman, Other", author: "Bernardine Evaristo", numOfPages: 464, ISBN: 9780241984994, publisher: "Penguin", yearPublished: 2020, summary: "This is Britain as you've never read it.\n\nThis is Britain as it has never been told.\n\nFrom Newcastle to Cornwall, from the birth of the twentieth century to the teens of the twenty-first, Girl, Woman, Other follows a cast of twelve characters on their personal journeys through this country and the last hundred years. They're each looking for something - a shared past, an unexpected future, a place to call home, somewhere to fit in, a lover, a missed mother, a lost father, even just a touch of hope . . .", cover: "https://m.media-amazon.com/images/I/81BBjotEQHL.jpg"},

        {title: "Sister Outsider", author: "Audre Lorde", numOfPages: 192, ISBN: 9781580911863, publisher: "Ten Speed Press", yearPublished: 2013, summary: "The woman's place of power within each of us is neither white nor surface; it is dark, it is ancient, and it is deep.\n\nThe revolutionary writings of Audre Lorde gave voice to those 'outside the circle of this society's definition of acceptable women'. Uncompromising, angry and yet full of hope, this collection of her essential prose - essays, speeches, letters, interviews - explores race, sexuality, poetry, friendship, the erotic and the need for female solidarity, and includes her landmark piece 'The Master's Tools Will Never Dismantle the Master's House'.", cover: "https://m.media-amazon.com/images/I/81TCU-ew0jL.jpg"},

        {title: "The Second Sex", author: "Simone de Beauvoir", numOfPages: 880, ISBN: 9780099744214, publisher: "Vintage Classics", yearPublished: 1997, summary: "Of all the writing that emerged from the existentialist movement, Simone de Beauvoir's groundbreaking study of women will probably have the most extensive and enduring impact. It is at once a work of anthropology and sociology, of biology and psychoanalysis, from the pen of a writer and novelist of penetrating imaginative power. \n\nThe Second Sex stands, four decades after its first appearance, as the first landmark in the modern feminist upsurge that has transformed perceptions of the social relationship of man and womankind in our time.", cover: "https://m.media-amazon.com/images/I/81lQAfZ20qL.jpg"},

        {title: "Know My Name: A Memoir", author: "Chanel Miller", numOfPages: 357, ISBN: 9780735223707, publisher: "Viking Pr", yearPublished: 2019, summary: "She was known to the world as Emily Doe when she stunned millions with a letter. Brock Turner had been sentenced to just six months in county jail after he was found sexually assaulting her on Stanford's campus. Her victim impact statement was posted on BuzzFeed, where it instantly went viral--viewed by eleven million people within four days, it was translated globally and read on the floor of Congress; it inspired changes in California law and the recall of the judge in the case. Thousands wrote to say that she had given them the courage to share their own experiences of assault for the first time.\n\nNow she reclaims her identity to tell her story of trauma, transcendence, and the power of words. It was the perfect case, in many ways--there were eyewitnesses, Turner ran away, physical evidence was immediately secured. But her struggles with isolation and shame during the aftermath and the trial reveal the oppression victims face in even the best-case scenarios. Her story illuminates a culture biased to protect perpetrators, indicts a criminal justice system designed to fail the most vulnerable, and, ultimately, shines with the courage required to move through suffering and live a full and beautiful life.\n\nKnow My Name will forever transform the way we think about sexual assault, challenging our beliefs about what is acceptable and speaking truth to the tumultuous reality of healing. It also introduces readers to an extraordinary writer, one whose words have already changed our world. Entwining pain, resilience, and humor, this memoir will stand as a modern classic.", cover: "https://m.media-amazon.com/images/I/71KlgUCi6XL.jpg"},

        {title: "Bad Feminist", author: "Roxane Gay", numOfPages: 336, ISBN: 9781472119735, publisher: "Corsair", yearPublished: 2014, summary: "In these funny and insightful essays, Roxane Gay takes us through the journey of her evolution as a woman (Sweet Valley High) of colour (The Help) while also taking readers on a ride through culture of the last few years (Girls, Django in Chains) and commenting on the state of feminism today (abortion, Chris Brown). The portrait that emerges is not only one of an incredibly insightful woman continually growing to understand herself and our society, but also one of our culture.\n\nBad Feminist is a sharp, funny and sincere look at the ways in which the culture we consume becomes who we are, and an inspiring call-to-arms of all the ways we still need to do better.", cover: "https://m.media-amazon.com/images/I/71ftyZ7JqHL.jpg"},

        {title: "This Bridge Called My Back: Writings by Radical Women of Color", author: " Cherríe Moraga & Gloria Anzaldúa", numOfPages: 336, ISBN: 9781438454382, publisher: "State University of New York Press", yearPublished: 2015, summary: "Originally released in 1981, This Bridge Called My Back is a testimony to women of color feminism as it emerged in the last quarter of the twentieth century. Through personal essays, criticism, interviews, testimonials, poetry, and visual art, the collection explores, as coeditor Cherríe Moraga writes, “the complex confluence of identities—race, class, gender, and sexuality—systemic to women of color oppression and liberation.”\n\nReissued here, nearly thirty-five years after its inception, the fourth edition contains an extensive new introduction by Moraga, along with a previously unpublished statement by Gloria Anzaldúa. The new edition also includes visual artists whose work was produced during the same period as Bridge, including Betye Saar, Ana Mendieta, and Yolanda López, as well as current contributor biographies. Bridge continues to reflect an evolving definition of feminism, one that can effectively adapt to, and help inform an understanding of the changing economic and social conditions of women of color in the United States and throughout the world.", cover: "https://m.media-amazon.com/images/I/81Z1hcQUP7L.jpg"},
    ]);

    const users = await User.bulkCreate([
        {email: "Email1", password: "Password1"},
        {email: "Email2", password: "Password2"},
        {email: "Email3", password: "Password3"},
    ]);

    // await users[1].addBook(books[0], {through: {currentPage: 0}}); doesn't work
    await books[1].addUser(users[0], {through: {currentPage: 0}});
    await books[2].addUser(users[2], {through: {currentPage: 0}});
}

seed();