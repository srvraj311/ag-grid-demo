export default interface User {
  picture: string;
  title: string;
  first_name: string;
  second_name: string;
  username: string;
  gender: string;
  email: string;
  phone_number: string;
  rating: string;
  birthdate: string;
  location: {
    city: string;
  };
}
