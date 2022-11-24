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
      <link rel="stylesheet" href="https://api.urcups.com/styles.css" />
      <link rel="icon" href="${data.serverHost}/logo192.png" />
      <title>Urcups Bells</title>
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
      <link rel="stylesheet" href="https://api.urcups.com/styles.css" />
      <title>Urcups Bells</title>
     
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
