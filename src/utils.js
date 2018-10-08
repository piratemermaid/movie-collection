export function formatTodaysDate() {
  const now = new Date();
  let day = now.getDate();
  if (day < 10) {
    day = "0" + String(day);
  }
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + String(month);
  }
  const year = now.getFullYear();

  return `${month}/${day}/${year}`;
}

export function devFillMovies() {
  const collection = [
    {
      title: "Star Wars",
      added: "10/07/2018",
      tags: ["action", "nerdy", "nostalgic", "scifi"],
      watched: true,
      year: "1995"
    },
    {
      title: "Harry Potter",
      added: "10/05/2018",
      tags: ["magic", "nerdy", "nostalgic"],
      watched: true,
      year: "1997"
    },
    {
      title: "Moana",
      added: "10/07/2018",
      tags: ["animated", "disney", "musical"],
      watched: true,
      year: "2016"
    },
    {
      added: "10/08/2018",
      tags: ["animated", "musical"],
      title: "Anastasia",
      watched: true,
      year: "1993"
    },
    {
      added: "10/08/2018",
      tags: ["musical"],
      title: "Hairspray",
      watched: false,
      year: "2003"
    },
    {
      added: "10/08/2018",
      tags: ["action", "nerdy", "superhero"],
      title: "The Avengers",
      watched: false,
      year: "2008"
    },
    {
      added: "10/07/2018",
      tags: ["documentary", "feminism"],
      title: "Miss Representation",
      watched: true,
      year: "2015"
    },
    {
      added: "10/07/2018",
      tags: ["animals", "cats", "documentary"],
      title: "Kedi",
      watched: false,
      year: "2018"
    },
    {
      added: "10/08/2018",
      tags: ["action", "feminism", "nerdy", "superhero"],
      title: "Wonder Woman",
      watched: true,
      year: "2017"
    },
    {
      added: "10/06/2018",
      tags: ["comedy"],
      title: "Airplane",
      watched: true,
      year: "1998",
      releaseDate: "released"
    },
    {
      added: "10/06/2018",
      tags: ["animated", "disney", "family", "feminism", "magic", "musical"],
      title: "Frozen",
      watched: true,
      year: "2016",
      releaseDate: "released"
    },
    {
      added: "10/06/2018",
      tags: ["animals", "animated", "musical"],
      title: "Sing!",
      watched: true,
      year: "2017",
      releaseDate: "released"
    }
  ];

  const wishlist = [
    {
      added: "10/08/2018",
      tags: ["magic", "nerdy"],
      title: "Fantastic Beasts 2",
      watched: false,
      year: "2018",
      releaseDate: "Unknown"
    },
    {
      added: "10/08/2018",
      tags: ["disney", "superhero"],
      title: "Incredibles 2",
      watched: true,
      year: "2018",
      releaseDate: "October"
    },
    {
      added: "10/08/2018",
      tags: ["comedy", "romantic"],
      title: "Crazy Rich Asians",
      watched: false,
      year: "2018",
      releaseDate: "November"
    },
    {
      added: "10/08/2018",
      tags: ["#deep", "comedy"],
      title: "The Truman Show",
      watched: false,
      year: "2000",
      releaseDate: "released"
    }
  ];

  return { collection, wishlist };
}
