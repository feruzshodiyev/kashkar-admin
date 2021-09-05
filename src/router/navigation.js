import Orders from "@/views/orders/Orders";
import BookedTables from "@/views/BookedTables";


const mainNav = [
  //.......orders.....//
  {
    main: true,
    isSubmenu: false,
    title: "Orders",
    icon: "las la-lg la-file-alt",
    name: "Orders",
    path: "orders",
    component: Orders,
  },
  {
    main: true,
    isSubmenu: false,
    title: "Booked Tables",
    icon: "las la-lg la-file-alt",
    name: "BookedTables",
    path: "tables",
    component: BookedTables,
  },
];

export default mainNav;
