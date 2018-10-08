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
      title: "Star Wars I",
      added: "10/07/2018",
      tags: ["scifi", "nerdy", "action", "nostalgic"],
      watched: true,
      year: "1995"
    },
    {
      title: "Harry Potter 1",
      added: "10/05/2018",
      tags: ["nerdy", "magic", "nostalgic"],
      watched: true,
      year: "1997"
    },
    {
      title: "Moana",
      added: "10/07/2018",
      tags: ["disney", "animated", "musical"],
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
      tags: ["nerdy", "action", "superhero"],
      title: "The Avengers",
      watched: false,
      year: "2008"
    },
    {
      added: "10/08/2018",
      tags: ["nerdy", "action", "superhero"],
      title: "The Avengers",
      watched: false,
      year: "2008"
    },
    {
      added: "10/08/2018",
      tags: ["nerdy", "action", "superhero", "feminism"],
      title: "Wonder Woman",
      watched: true,
      year: "2017"
    }
  ];

  const wishlist = [
    {
      added: "10/08/2018",
      tags: ["nerdy", "magic"],
      title: "Fantastic Beasts 2",
      watched: false,
      year: "2018"
    },
    {
      added: "10/08/2018",
      tags: ["disney", "superhero"],
      title: "Incredibles 2",
      watched: true,
      year: "2018"
    },
    {
      added: "10/08/2018",
      tags: ["romantic", "comedy"],
      title: "Crazy Rich Asians",
      watched: false,
      year: "2018"
    }
  ];

  return { collection, wishlist };
}
