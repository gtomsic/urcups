module.exports.viewedProfile = (data) => {
   return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
         href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
         rel="stylesheet"
      />
      <link rel="icon" href="${data.serverHost}/logo192.png" />
      <title>Urcups Bells</title>
      <style>
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box; }
    
      a,
      a:active,
      a:visited {
         color: inherit;
         text-decoration: none; }
      
      body {
         padding: 0;
         margin: 0;
         font-family: Roboto, 'Courier New', Courier, monospace; }
      
      .btn {
         display: inline-block;
         padding: 15px 0;
         background: linear-gradient(to top right, #06b6d4, #6d28d9);
         border: 2px solid #ffffff;
         border-radius: 0.5rem;
         text-align: center;
         gap: 1rem;
         transition: all 0.5s ease-in-out; }
         .btn:hover {
         background: linear-gradient(to top right, #dc2626, #6d28d9); }
      
      .header {
         height: 100px;
         width: 100%;
         background: linear-gradient(to top right, #6d28d9, #111111);
         margin: 0;
         display: flex;
         justify-content: center;
         align-items: center;
         z-index: 0; }
         .header img {
         width: 120px;
         z-index: 10; }
      
      main {
         display: flex;
         flex-direction: column;
         align-items: center;
         padding: 50px 20px;
         width: 100%; }
         main .box {
         max-width: 400px;
         width: 100%;
         background: linear-gradient(to top right, #6d28d9, #222222);
         border-radius: 1rem;
         overflow: hidden;
         color: #ffffff; }
         main .box-header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 120px;
            background: linear-gradient(to top right, #6d28d9, #06b6d4); }
            main .box-header img {
               width: 70px;
               height: 70px;
               border-radius: 50%;
               border: 2px solid #ffffff; }
         main .box-content {
            min-height: 250px;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px; }
            main .box-content__body {
               min-height: 150px;
               height: 100%;
               display: flex;
               flex-direction: column;
               align-items: start;
               padding: 20px; }
               main .box-content__body h3 {
               margin-bottom: 10px;
               letter-spacing: 3px; }
               main .box-content__body h5 {
               letter-spacing: 1px; }
      
      .footer {
         display: block;
         max-width: 400px;
         margin: 50px 20px;
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         color: #666666; }
    
      </style>
   </head>
   <body>
      <div class="header">
         <a href="${data.webHost}">
            <img src="${data.serverHost}/urcups256.png" alt="Urcups Logo" />
         </a>
      </div>
      <main>
         <div class="box">
            <div class="box-header">
               <img src="${data.avatar}" alt="Logo Icon" />
            </div>
            <div class="box-content">
               <div class="box-content__body">
                  <h3>${data.title}</h3>
                  <h5>${data.body}</h5>
               </div>
               <a href="${data.link}" class="btn btn-primary"
                  ><h3>${data.button}</h3></a
               >
            </div>
         </div>
         <div class="footer">
         <p>&copy; Copy Rights www.urcups.com</p>
      </div>
      </main>
   </body>
</html>
`;
};

module.exports.verifyEmail = (data) => {
   return `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
         href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
         rel="stylesheet"
      />
      <link rel="icon" href="${process.env.SERVER_HOST}/logo192.png" />
      <title>Urcups Bells</title>
     <style>
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box; }
   
      a,
      a:active,
      a:visited {
      color: inherit;
      text-decoration: none; }
      
      body {
      padding: 0;
      margin: 0;
      font-family: Roboto, 'Courier New', Courier, monospace; }
      
      .btn {
      display: inline-block;
      padding: 15px 0;
      background: linear-gradient(to top right, #06b6d4, #6d28d9);
      border: 2px solid #ffffff;
      border-radius: 0.5rem;
      text-align: center;
      gap: 1rem;
      transition: all 0.5s ease-in-out; }
      .btn:hover {
         background: linear-gradient(to top right, #dc2626, #6d28d9); }
      
      .header {
      height: 100px;
      width: 100%;
      background: linear-gradient(to top right, #6d28d9, #111111);
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 0; }
      .header img {
         width: 120px;
         z-index: 10; }
      
      main {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50px 20px;
      width: 100%; }
      main .box {
         max-width: 400px;
         width: 100%;
         background: linear-gradient(to top right, #6d28d9, #222222);
         border-radius: 1rem;
         overflow: hidden;
         color: #ffffff; }
         main .box-header {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 120px;
            background: linear-gradient(to top right, #6d28d9, #06b6d4); }
            main .box-header img {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid #ffffff; }
         main .box-content {
            min-height: 250px;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px; }
            main .box-content__body {
            min-height: 150px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: start;
            padding: 20px; }
            main .box-content__body h3 {
               margin-bottom: 10px;
               letter-spacing: 3px; }
            main .box-content__body h5 {
               letter-spacing: 1px; }
      
      ul {
      width: 400px;
      padding: 0 20px;
      margin-top: 50px;
      color: gray;
      display: flex;
      list-style: none;
      justify-content: space-between; }
      
      .footer {
      display: block;
      max-width: 400px;
      margin: 50px 20px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #666666; }
   
     </style>
   </head>
   <body>
      <div class="header">
         <a href="${process.env.WEB_HOST}">
            <img src="${process.env.SERVER_HOST}/urcups256.png" alt="Urcups Logo" />
         </a>
      </div>
      <main>
         <div class="box">
            <div class="box-header">
               <img src="${process.env.SERVER_HOST}/logo192.png" alt="Logo Icon" />
            </div>
            <div class="box-content">
               <div class="box-content__body">
                  <h2>Hi ${data.username} welcome!</h2>
                  <h3>Please verify your email to start.</h3>
               </div>
               <a href="${data.link}" class="btn btn-primary"
                  ><h3>Verify Here</h3></a
               >
            </div>
         </div>
         <div class="footer">
         <p>&copy; Copy Rights www.urcups.com</p>
         </div>
      </main>
   </body>
</html>
`;
};
