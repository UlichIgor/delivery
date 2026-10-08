import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Items from "./components/Items";
import Footer from "./components/Footer";
import Categories from "./components/Categories";

import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

const items = [
  {
    id: 1,
    title: "Сет \"Три Дракони\"",
    img: "grand-networks.webp",
    desc: "Червоний дракон, Золотий дракон, Зелений дракон",
    category: "sets",
    price: "700",
    amount: "1",
  },
  {
    id: 2,
    title: "Каліфорнія з тунцем",
    img: "grand-roles.webp",
    desc: "Тунець, Огірок, Масага, Соус спайс, Авокадо",
    category: "rolls",
    price: "89.99",
    amount: "1",
  },
  {
    id: 3,
    title: "Поке і салати",
    img: "Poke-and-salads.webp",
    desc: "Поке і салати",
    category: "poke",
    price: "73",
    amount: "1",
  },
  {
    id: 4,
    title: "Паста, локшина",
    img: "Pasta-lokshina.webp",
    desc: "Паста, локшина",
    category: "rice",
    price: "57",
    amount: "1",
  },
  {
    id: 5,
    title: "Мідії у вершковому соусі",
    img: "Ribni-stravi.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "720",
    amount: "1",
  },
  {
    id: 6,
    title: "Супи",
    img: "Soup-and.webp",
    desc: "Супи",
    category: "soups",
    price: "49",
    amount: "1",
  },
  {
    id: 7,
    title: "Сік Сандора в асортименті 1л.",
    img: "Napoi.webp",
    desc: "Напої",
    category: "drinks",
    price: "75",
    amount: "1",
  },
  {
    id: 8,
    title: "Grand сет \"Три філадельфії\"",
    img: "grand-set-filadelfii.webp",
    desc: "Філадельфія з лососем, Філадельфія з тунцем, Філадельфія з вугрем",
    category: "sets",
    price: "1290",
    amount: "1",
  },
  {
    id: 9,
    title: "Grand cет \"5 смаків\"",
    img: "5 flavors.webp",
    desc: "Філадельфія з лососем, Філадельфія з тунцем, Каліфорнія з тунцем, Зелений дракон, Унагі рол з криветкою",
    category: "sets",
    price: "1775",
    amount: "1",
  },
  {
    id: 10,
    title: "Каліфорнія з лососем",
    img: "California.webp",
    desc: "Лосось, Огірок, Масага, Соус спайс, Авокадо",
    category: "rolls",
    price: "360",
    amount: "1",
  },
  {
    id: 11,
    title: "Каліфорнія з креветкою",
    img: "California-2.webp",
    desc: "Креветка темпура, Огірок, Масага, Соус спайс, Авокадо",
    category: "rolls",
    price: "370",
    amount: "1",
  },
  {
    id: 12,
    title: "Королівські креветки з пармезаном",
    img: "Ribni-stravi-2.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "720",
    amount: "1",
  },
  {
    id: 13,
    title: "Гранд соте з морепродуктами",
    img: "Ribni-stravi-3.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "1200",
    amount: "1",
  },
  {
    id: 14,
    title: "Гранд Плато Гриль",
    img: "Ribni-stravi-4.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "1250",
    amount: "1",
  },
  {
    id: 15,
    title: "Запечені креветки у вершковому соусі",
    img: "Ribni-stravi-5.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "430",
    amount: "1",
  },
  {
    id: 16,
    title: "Запечені креветки з манго",
    img: "Ribni-stravi-6.webp",
    desc: "Рибні страви",
    category: "fish",
    price: "630",
    amount: "1",
  },
  {
    id: 17,
    title: "Сік Rich",
    img: "Napoi-2.webp",
    desc: "Напої",
    category: "drinks",
    price: "45",
    amount: "1",
  },
  {
    id: 18,
    title: "Coca cola",
    img: "Napoi-3.webp",
    desc: "Напої",
    category: "drinks",
    price: "85",
    amount: "1",
  },
  {
    id: 19,
    title: "Bonaqua",
    img: "Bonaqua.webp",
    desc: "Напої",
    category: "drinks",
    price: "75",
    amount: "1",
  },
  {
    id: 20,
    title: "Мисо Суп С Лососем",
    img: "Soup-and-2.webp",
    desc: "Состав: Мясо бульон, лосось, вакаме, кунжут, зеленый лук",
    category: "soups",
    price: "146",
    amount: "1",
  },
  {
    id: 21,
    title: "Мисо Суп Классический",
    img: "Soup-and-3.webp",
    desc: "Состав: Мисо бульон, вакаме, кунжут, зеленый лук",
    category: "soups",
    price: "43",
    amount: "1",
  },
  {
    id: 22,
    title: "Салат Цезар з куркою",
    img: "Poke-and-salads-2.webp",
    desc: "Салат Айсберг, салат Лолло Біонда, соус Цезар, смажена курка, бекон, помідори чері, перепелині яйця, пармезан,",
    category: "poke",
    price: "189",
    amount: "1",
  },
  {
    id: 23,
    title: "Поке боул з креветками",
    img: "Poke-and-salads-3.webp",
    desc: "Креветки, авокадо, апельсин, салат айсберг, огірок, манговий соус,соєвий соус, рис, ікра, мікрогрін Вага - 380 г",
    category: "poke",
    price: "194",
    amount: "1",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      curentItems: items,
      categories: [
        { key: "all", name: "Усе" },
        { key: "sets", name: "Grand сети" },
        { key: "rolls", name: "Grand роли" },
        { key: "poke", name: "Поке і салати" },
        { key: "rice", name: "Паста, локшина" },
        { key: "fish", name: "Рибні страви" },
        { key: "soups", name: "Супи" },
        { key: "drinks", name: "Напої" },
      ],
      items,
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.changeOrderAmount = this.changeOrderAmount.bind(this);
  }

  render() {
    return (
      <>
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          onIncrease={this.changeOrderAmount}
          onDecrease={this.changeOrderAmount}
        />
        <Router>
          <>
            <Categories
              categories={this.state.categories}
              chooseCategory={this.chooseCategory}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </>
        </Router>

        <Items items={this.state.curentItems} onAdd={this.addToOrder} />
        <Footer />
      </>
    );
  }

  chooseCategory(category) {
    this.setState((prevState) => ({
      curentItems:
        category === "all"
          ? prevState.items
          : prevState.items.filter((el) => el.category === category),
    }));
  }

  deleteOrder(id) {
    this.setState((prevState) => ({
      orders: prevState.orders.filter((el) => el.id !== id),
    }));
  }

  addToOrder(item) {
    this.setState((prevState) => {
      if (prevState.orders.some((el) => el.id === item.id)) {
        return null;
      }

      return { orders: [...prevState.orders, { ...item, amount: Number(item.amount) || 1 }] };
    });
  }

  changeOrderAmount(id, delta) {
    this.setState((prevState) => ({
      orders: prevState.orders.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const nextAmount = Math.max(1, Number(item.amount || 1) + delta);
        return { ...item, amount: nextAmount };
      }),
    }));
  }
}

export default App;
