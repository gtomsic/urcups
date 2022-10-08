import React from "react";
import gabriel from "../assets/gabriel.jpg";
import logo from "../assets/urcups256.png";

const Footer = () => {
   const price = [
      { price: 20, label: "3 Months" },
      { price: 30, label: "6 Months" },
      { price: 50, label: "1 year" },
   ];
   return (
      <footer className="bg-gradient-to-t from-primary min-h-[100px] text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-9 md:gap-9 lg:gap-5 px-5 md:px-8 pt-11 pb-[150px] mt-[150px]">
         <div className="flex flex-col gap-9">
            <h3>Support the site</h3>
            <div>
               <h3>Free accounts</h3>
               <ul>
                  <li>All free account can enjoy unlimited chat.</li>
                  <li>You can views unlimited user profile.</li>
                  <li>Limited to 2 private messages a day.</li>
                  <li>Not allowed to view public photos.</li>
                  <li>Not allowed to interact and view readers activity.</li>
                  <li>Not allowed to block any users.</li>
               </ul>
            </div>
            <div>
               <h3>Values for supporters</h3>
               <ul>
                  <li>Supported member can have unlimited private messages.</li>
                  <li>Supported member can view public photos.</li>
                  <li>Supported member can bookmark user profile.</li>
                  <li>
                     Supported member can view likes and comment to reader's
                     activity.
                  </li>
               </ul>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
               {price.map((support) => (
                  <div
                     key={support.price}
                     className="flex flex-col gap-1 p-5 justify-center items-center cursor-pointer rounded-lg bg-gradient-to-bl from-primary bg-secondary hover:bg-danger duration-300"
                  >
                     <h3>${support.price} USD</h3>
                     <p>{support.label}</p>
                  </div>
               ))}
            </div>
         </div>
         <div>
            <h3 className="mb-8">Message from the creator</h3>
            <div
               className="float-left max-w-[200px] relative overflow-hidden rounded-br-3xl"
               style={{ margin: "0 10px 10px 0" }}
            >
               <img src={gabriel} alt="CEO" className="w-full " />
               <div className="absolute bottom-0 w-full h-[250px] bg-gradient-to-t from-primary shadow-lg shadow-primary hover:from-secondary hover:shadow-warning duration-300 "></div>
            </div>
            <p className="text-justify">
               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
               Delectus, cum? Quas vero maxime dolore adipisci a. Omnis voluptas
               necessitatibus id rem repudiandae, odio distinctio? Minus modi
               suscipit tempora culpa consequatur?Lorem ipsum dolor, sit amet
               consectetur adipisicing elit. Et neque ut culpa iure, vero
               laborum ipsum, sint earum ea ipsam, magni dolorem vel minima
               quasi nesciunt fugiat voluptas! Laudantium rem, voluptates amet
               provident tempore doloremque est a reprehenderit. Cum rerum
               veniam enim ratione consectetur doloribus, voluptatum nulla sint
               impedit suscipit soluta eveniet assumenda quo totam minus
               consequatur atque ad. Eius similique nemo nihil minima! Rerum
               obcaecati distinctio laudantium cumque fuga repellat voluptatibus
               vel exercitationem deserunt cupiditate! Optio libero eligendi
               quidem iste voluptas ab quis aut corporis nihil sint voluptate,
               rerum vitae, ex quisquam perspiciatis velit consequuntur veniam
               est nulla vero animi magnam atque laboriosam quo? Obcaecati
               quisquam sed, voluptas, ut placeat fugit quam molestiae
               distinctio totam hic, praesentium aspernatur possimus!
            </p>
            <br />
            <p>Happy Hunting</p>
            <br></br>
            <p>Gabriel Tomsic</p>
            <p>Urcups President</p>
         </div>
         <div>
            <h3>Success Stories</h3>
            <ul>
               <li>Paul and Vinia</li>
               <li>Maricel and Spike</li>
               <li>Jen and Tim</li>
               <li>Gabriel and Larry</li>
            </ul>
            <div className="mt-11">
               <div className="bg-dark bg-opacity-40 p-3">
                  <img src={logo} alt="urcups logo" className="w-[130px]" />
                  <p>Copy Rights &copy; www.urcups.com </p>
                  <p>Developed by: Gabriel Tomsic</p>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
