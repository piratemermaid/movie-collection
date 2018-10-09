const date = "10/09/18";

export function fillMyMovies() {
  const collection = [
    {
      added: date,
      tags: ["crime", "drama"],
      title: "American Hustle",
      watched: false,
      year: "2013",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["war", "action"],
      title: "American Sniper",
      watched: false,
      year: "2014",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["musical", "animated"],
      title: "Anastasia",
      watched: true,
      year: "?",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action", "feminism"],
      title: "Atomic Blonde",
      watched: false,
      year: "2017",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["action", "crime", "drama"],
      title: "Baby Driver",
      watched: false,
      year: "2017",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["comedy"],
      title: "Baywatch",
      watched: false,
      year: "?",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["disney", "musical"],
      title: "Beauty and the Beast",
      watched: true,
      year: "2017",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["disney", "animated", "musical"],
      title: "Beauty and the Beast",
      watched: true,
      year: "old one",
      series: "",
      review: 3
    },
    {
      added: date,
      tags: ["disney", "animated", "superhero", "cute"],
      title: "Big Hero 6",
      watched: true,
      year: "2014",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Black Panther",
      watched: true,
      year: "2018",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["disney", "animated", "feminism", "adventure", "action"],
      title: "Brave",
      watched: true,
      year: "2012",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Captain America",
      watched: true,
      year: "?",
      series: "Captain America",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Captain America: Winter Soldier",
      watched: true,
      year: "2014",
      series: "Captain America",
      review: 3
    },
    {
      added: date,
      tags: ["disney", "animated", "musical", "family", "cute"],
      title: "Coco",
      watched: true,
      year: "2017",
      series: "",
      review: 5
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel", "comedy"],
      title: "Deadpool",
      watched: true,
      year: "2016",
      series: "Deadpool",
      review: 4
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel", "comedy"],
      title: "Deadpool 2",
      watched: true,
      year: "2018",
      series: "Deadpool",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "comedy", "cute"],
      title: "Despicable Me",
      watched: true,
      year: "?",
      series: "Despicable Me",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "comedy", "cute"],
      title: "Despicable Me 2",
      watched: true,
      year: "2013",
      series: "Despicable Me",
      review: 3
    },
    {
      added: date,
      tags: ["animated", "comedy", "cute"],
      title: "Despicable Me 3",
      watched: true,
      year: "?",
      series: "Despicable Me",
      review: 3
    },
    {
      added: date,
      tags: ["action", "dystopia", "angsty"],
      title: "Divergent",
      watched: true,
      year: "?",
      series: "Divergent",
      review: 2
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Doctor Strange",
      watched: true,
      year: "2016",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["comedy", "musical"],
      title: "Dr. Horrible's Sing-Along Blog",
      watched: true,
      year: "?",
      series: "",
      review: 5
    },
    {
      added: date,
      tags: ["war", "action"],
      title: "Dunkirk",
      watched: false,
      year: "2017",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["magic", "nerdy"],
      title: "Fantastic Beasts",
      watched: true,
      year: "2016",
      series: "Fantastic Beasts",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "animals", "cute"],
      title: "Finding Dory",
      watched: true,
      year: "2016",
      series: "Finding Nemo",
      review: 3
    },
    {
      added: date,
      tags: ["disney", "animated", "musical", "feminism", "magic", "family"],
      title: "Frozen",
      watched: true,
      year: "2013",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Guardians of the Galaxy",
      watched: true,
      year: "2014",
      series: "Guardians of the Galaxy",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Guardians of the Galaxy: Vol. 2",
      watched: true,
      year: "2017",
      series: "Guardians of the Galaxy",
      review: 2
    },
    {
      added: date,
      tags: ["feminism", "comedy", "spoopy", "action"],
      title: "Ghostbusters (2016)",
      watched: true,
      year: "2016",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["comedy", "musical"],
      title: "Hairspray",
      watched: true,
      year: "?",
      series: "",
      review: 3
    },
    {
      added: date,
      tags: ["nerdy", "nostalgia", "magic"],
      title: "Harry Potter",
      watched: true,
      year: "?",
      series: "Harry Potter",
      review: 5
    },
    {
      added: date,
      tags: ["history", "feminism", "drama"],
      title: "Hidden Figures",
      watched: true,
      year: "?",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["cute", "animated", "animals"],
      title: "How to Train Your Dragon",
      watched: true,
      year: "?",
      series: "How to Train Your Dragon",
      review: 4
    },
    {
      added: date,
      tags: ["cute", "animated", "animals"],
      title: "How to Train Your Dragon 2",
      watched: true,
      year: "2014",
      series: "How to Train Your Dragon",
      review: 3
    },
    {
      added: date,
      tags: ["comedy", "drama"],
      title: "I, Tonya",
      watched: true,
      year: "2017",
      series: "",
      review: 5
    },
    {
      added: date,
      tags: ["animated", "animals"],
      title: "Ice Age",
      watched: true,
      year: "?",
      series: "Ice Age",
      review: 4
    },
    {
      added: date,
      tags: ["disney", "animated", "cute"],
      title: "Inside Out",
      watched: true,
      year: "2015",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action", "dystopia", "angsty"],
      title: "Insurgent",
      watched: true,
      year: "2014",
      series: "Divergent",
      review: 2
    },
    {
      added: date,
      tags: ["action", "adventure", "scifi"],
      title: "Interstellar",
      watched: true,
      year: "2014",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["disney", "musical"],
      title: "Into the Woods",
      watched: true,
      year: "2014",
      series: "",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Iron Man",
      watched: true,
      year: "?",
      series: "Iron Man",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Iron Man 2",
      watched: true,
      year: "?",
      series: "Iron Man",
      review: 2
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Iron Man 3",
      watched: true,
      year: "2013",
      series: "Iron Man",
      review: 2
    },
    {
      added: date,
      tags: ["animals", "animated", "comedy"],
      title: "Isle of Dogs",
      watched: true,
      year: "2018",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["action"],
      title: "Jurassic World",
      watched: true,
      year: "2015",
      series: "Jurassic World",
      review: 3
    },
    {
      added: date,
      tags: ["action"],
      title: "Jurassic World: #2",
      watched: true,
      year: "2018",
      series: "Jurassic World",
      review: 2
    },
    {
      added: date,
      tags: ["animated"],
      title: "Kubo and the Two Strings",
      watched: false,
      year: "2016",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["musical", "romance"],
      title: "La La Land",
      watched: false,
      year: "2017 or 2016?",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["musical", "history", "drama"],
      title: "Les Miserables",
      watched: true,
      year: "2012",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["nerdy", "magic", "adventure"],
      title: "Lord of the Rings: #1",
      watched: true,
      year: "?",
      series: "Lord of the Rings",
      review: 3
    },
    {
      added: date,
      tags: ["nerdy", "magic", "adventure"],
      title: "Lord of the Rings: #2",
      watched: true,
      year: "?",
      series: "Lord of the Rings",
      review: 3
    },
    {
      added: date,
      tags: ["nerdy", "magic", "adventure"],
      title: "Lord of the Rings: #3",
      watched: true,
      year: "?",
      series: "Lord of the Rings",
      review: 3
    },
    {
      added: date,
      tags: ["disney", "animated", "musical"],
      title: "Moana",
      watched: true,
      year: "?",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["musical", "comedy"],
      title: "Pitch Perfect",
      watched: true,
      year: "2012",
      series: "Pitch Perfect",
      review: 4
    },
    {
      added: date,
      tags: ["musical", "comedy"],
      title: "Pitch Perfect 2",
      watched: true,
      year: "2015",
      series: "Pitch Perfect",
      review: 2
    },
    {
      added: date,
      tags: ["musical", "comedy"],
      title: "Pitch Perfect 3",
      watched: true,
      year: "?",
      series: "Pitch Perfect",
      review: 2
    },
    {
      added: date,
      tags: ["nerdy", "action", "adventure", "scifi"],
      title: "Rogue One: A Star Wars Story",
      watched: true,
      year: "2016",
      series: "Star Wars",
      review: 4
    },
    {
      added: date,
      tags: ["superhero", "action"],
      title: "Suicide Squad",
      watched: true,
      year: "2016",
      series: "",
      review: 1
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "The Avengers",
      watched: true,
      year: "2012",
      series: "Avengers",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "The Avengers: Age of Ultron",
      watched: true,
      year: "2015",
      series: "Avengers",
      review: 3
    },
    {
      added: date,
      tags: ["musical", "animated", "animals", "cute"],
      title: "Sing!",
      watched: true,
      year: "?",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["marvel", "superhero", "action"],
      title: "Spiderman: Homecoming",
      watched: true,
      year: "2017",
      series: "Spiderman",
      review: 4
    },
    {
      added: date,
      tags: ["nerdy", "scifi", "action", "adventure"],
      title: "Star Wars",
      watched: true,
      year: "?",
      series: "Star Wars",
      review: 4
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "The Avengers: Infinity War",
      watched: true,
      year: "?",
      series: "Avengers",
      review: 4
    },
    {
      added: date,
      tags: ["comedy", "romance", "drama"],
      title: "The Big Sick",
      watched: false,
      year: "2017",
      series: "",
      review: false
    },
    {
      added: date,
      tags: ["comedy"],
      title: "The Hangover",
      watched: true,
      year: "?",
      series: "The Hangover",
      review: 4
    },
    {
      added: date,
      tags: ["history", "drama"],
      title: "The Help",
      watched: true,
      year: "?",
      series: "",
      review: 2
    },
    {
      added: date,
      tags: ["action", "adventure", "nerdy"],
      title: "The Hobbit",
      watched: true,
      year: "?",
      series: "The Hobbit",
      review: 3
    },
    {
      added: date,
      tags: ["action", "adventure", "nerdy"],
      title: "The Hobbit: The Desolation of Smaug",
      watched: true,
      year: "2013",
      series: "The Hobbit",
      review: 3
    },
    {
      added: date,
      tags: ["action", "adventure", "nerdy"],
      title: "The Hobbit: The Battle of the Five Armies",
      watched: true,
      year: "2014",
      series: "The Hobbit",
      review: 3
    },
    {
      added: date,
      tags: ["action", "angsty", "dystopia"],
      title: "The Hunger Games",
      watched: true,
      year: "2012",
      series: "Hunger Games",
      review: 4
    },
    {
      added: date,
      tags: ["action", "angsty", "dystopia"],
      title: "The Hunger Games: Catching Fire",
      watched: true,
      year: "2013",
      series: "Hunger Games",
      review: 3
    },
    {
      added: date,
      tags: ["action", "angsty", "dystopia"],
      title: "The Hunger Games: Mockingjay Part 1",
      watched: true,
      year: "2014",
      series: "Hunger Games",
      review: 3
    },
    {
      added: date,
      tags: ["action", "angsty", "dystopia"],
      title: "The Hunger Games: Mockingjay Part 2",
      watched: true,
      year: "2015",
      series: "Hunger Games",
      review: 3
    },
    {
      added: date,
      tags: ["drama", "history"],
      title: "The Imitation Game",
      watched: true,
      year: "2014",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "comedy"],
      title: "The Lego Movie",
      watched: true,
      year: "2014",
      series: "Lego Movie",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "comedy"],
      title: "The Lego Batman Movie",
      watched: true,
      year: "?",
      series: "Lego Movie",
      review: 3
    },
    {
      added: date,
      tags: ["animated", "comedy"],
      title: "The Lego Ninjago Movie",
      watched: true,
      year: "?",
      series: "Lego Movie",
      review: false
    },
    {
      added: date,
      tags: ["action", "dystopia"],
      title: "The Maze Runner",
      watched: true,
      year: "2014",
      series: "The Maze Runner",
      review: 2
    },
    {
      added: date,
      tags: ["history", "drama"],
      title: "The Zookeeper's Wife",
      watched: true,
      year: "2017",
      series: "",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Thor",
      watched: true,
      year: "?",
      series: "Thor",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Thor: The Dark World",
      watched: true,
      year: "2013",
      series: "Thor",
      review: 2
    },
    {
      added: date,
      tags: ["action", "superhero", "marvel"],
      title: "Thor: Ragnarok",
      watched: true,
      year: "2017",
      series: "Thor",
      review: 3
    },
    {
      added: date,
      tags: ["action", "superhero", "feminism"],
      title: "Wonder Woman",
      watched: true,
      year: "2017",
      series: "",
      review: 4
    },
    {
      added: date,
      tags: ["animated", "disney", "cute"],
      title: "Wreck-It Ralph",
      watched: true,
      year: "2012",
      series: "Wreck-It Ralph",
      review: 4
    },
    {
      added: date,
      tags: ["disney", "animated", "animals"],
      title: "Zootopia",
      watched: true,
      year: "2016",
      series: "",
      review: 4
    }
  ];
  const wishlist = [
    {
      added: "10/08/18",
      tags: ["comedy", "#deep"],
      title: "The Truman Show",
      watched: true,
      year: "?",
      releaseDate: "released"
    },
    {
      added: "10/01/18",
      tags: ["romance", "comedy"],
      title: "Crazy Rich Asians",
      watched: false,
      year: "2018",
      releaseDate: "?"
    },
    {
      added: "10/07/18",
      tags: ["disney", "animated", "superhero"],
      title: "Incredibles 2",
      watched: true,
      year: "2018",
      releaseDate: "October 23"
    },
    {
      added: "10/01/18",
      tags: ["comedy", "history"],
      title: "KKKlansman",
      watched: false,
      year: "2018",
      releaseDate: "?"
    },
    {
      added: "10/01/18",
      tags: ["disney", "musical", "nostalgia"],
      title: "Mary Poppins Returns",
      watched: false,
      year: "2018",
      releaseDate: "theaters soon?"
    },
    {
      added: "10/01/18",
      tags: ["disney", "animated"],
      title: "Wreck-It Ralph 2",
      watched: false,
      year: "2018",
      releaseDate: "theaters soon?"
    },
    {
      added: "10/01/18",
      tags: ["nerdy", "magic"],
      title: "Fantastic Beasts: The Crimes of Grindelwald",
      watched: false,
      year: "2018",
      releaseDate: "theaters in Nov"
    },
    {
      added: "10/09/18",
      tags: ["action", "superhero", "marvel"],
      title: "Ant-Man",
      watched: true,
      year: "2015",
      series: "Ant-Man",
      releaseDate: "released"
    },
    {
      added: "10/09/18",
      tags: ["superhero", "action", "marvel"],
      title: "Ant-Man and the Wasp",
      watched: false,
      year: "2018",
      series: "Ant-Man",
      releaseDate: "?"
    },
    {
      added: date,
      tags: ["horror", "romance"],
      title: "Warm Bodies",
      watched: true,
      year: "2013",
      series: "",
      releaseDate: "released",
      review: 3
    },
    {
      added: date,
      tags: ["animated", "disney", "cute"],
      title: "Wreck-It Ralph 2",
      watched: true,
      year: "2012",
      releaseDate: "?",
      series: "Wreck-It Ralph"
    }
  ];

  return { collection, wishlist };
}

// {
//     added: date,
//     tags: [],
//     title: "",
//     watched: true,
//     year: "?",
//     series: ""
// }

// {
//     added: "",
//     tags: [],
//     title: "",
//     watched: false,
//     year: "",
//     releaseDate: "",
//     series: ""
//   }
