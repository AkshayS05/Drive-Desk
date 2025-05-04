import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/car-inages/`;

export const cars = [
  {
    name: "Tesla Model 3",
    maxCapacity: 5,
    regularPrice: 120,
    discount: 10,
    image: imageUrl + "TeslaModel-3.png",
    description:
      "Experience the future of driving with the Tesla Model 3. This all-electric sedan combines sleek design, top-tier technology, and exhilarating performance. Perfect for city drives or weekend getaways, with seating for up to 5 and advanced autopilot features.",
  },
  {
    name: "Mustang GT",
    maxCapacity: 4,
    regularPrice: 150,
    discount: 15,
    image: imageUrl + "Mustang-GT.png",
    description:
      "Turn heads and feel the thrill of the open road with the iconic Mustang GT. This American muscle car offers raw power, a bold design, and a roaring V8 engine. Ideal for two to four passengers seeking a bold driving experience.",
  },
  {
    name: "Audi A5",
    maxCapacity: 5,
    regularPrice: 140,
    discount: 0,
    image: imageUrl + "Audi-A5.png",
    description:
      "Drive in luxury and style with the Audi A5. Featuring a sleek coupe design, premium interiors, and cutting-edge tech, this car is perfect for both business and leisure trips. Comfortable seating for up to 5 passengers.",
  },
  {
    name: "Tesla Model 3 Performance",
    maxCapacity: 5,
    regularPrice: 160,
    discount: 20,
    image: imageUrl + "TeslaModel-3.png",
    description:
      "Enjoy the enhanced version of Tesla's flagship sedan with superior acceleration and handling. The Model 3 Performance offers premium features, dual-motor AWD, and a futuristic driving experience for up to 5 people.",
  },
  {
    name: "BMW X5",
    maxCapacity: 7,
    regularPrice: 180,
    discount: 25,
    image: imageUrl + "BMW-X5.png",
    description:
      "Travel in comfort and style with the luxurious BMW X5 SUV. Ideal for families or group trips, it offers advanced driving technology, a powerful engine, and a spacious interior with seating for up to 7 passengers.",
  },
  {
    name: "Chevrolet Camaro",
    maxCapacity: 4,
    regularPrice: 130,
    discount: 0,
    image: imageUrl + "ChevroletCamaro.png",
    description:
      "Feel the adrenaline in the sporty Chevrolet Camaro. With its aggressive styling and strong performance, this 4-seater coupe is great for weekend rides or making a statement on city streets.",
  },
  {
    name: "Mercedes-Benz C-Class",
    maxCapacity: 5,
    regularPrice: 160,
    discount: 20,
    image: imageUrl + "Mercedes-BENZ-C.png",
    description:
      "Experience refined elegance in the Mercedes-Benz C-Class. This luxury sedan offers high-end comfort, advanced safety features, and smooth performance for business or pleasure travel with up to 5 passengers.",
  },
];
