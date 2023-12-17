const config = {
    port: process.env.PORT || 3001,
    // databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://taw_project:kmwtwkmwtw@cluster0.wyb81xx.mongodb.net/?retryWrites=true&w=majority',
    databaseUrl: process.env.MONGODB_URI || 'mongodb+srv://vf81ahi8ad:CoTDHRDzc5qbQxA5@tijo.sccxqal.mongodb.net/?retryWrites=true&w=majority',
    JwtSecret: process.env.JWT_SECRET || 'secret',
  };
  
  export default config;

  // mail wykorzystany przy tworzeniu clustra w MongoDB Atlas: vf81ahi8ad@greencafe24.com
  // hasło: Janina123!

  // na mongodb atlas
  // login: vf81ahi8ad
  // password: CoTDHRDzc5qbQxA5
